#ifdef RCT_NEW_ARCH_ENABLED

#import "RTNPinwheelView.h"

#import <react/renderer/components/RTNPinwheelSpec/ComponentDescriptors.h>
#import <react/renderer/components/RTNPinwheelSpec/EventEmitters.h>
#import <react/renderer/components/RTNPinwheelSpec/Props.h>
#import <react/renderer/components/RTNPinwheelSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "RTNPinwheelEvents.h"
#if __has_include(<RNPinwheelSDK/RNPinwheelSDK-Swift.h>)
#import <RNPinwheelSDK/RNPinwheelSDK-Swift.h>
#else
#import "RNPinwheelSDK-Swift.h"
#endif

using namespace facebook::react;

@interface RTNPinwheelView () <RCTRTNPinwheelViewProtocol>
@end

// Only tear down controllers that Link (or something Link embeds) presented.
// Controllers from Apple frameworks, e.g. a UIAlertController the app showed
// from the same host, belong to the app and are left alone.
static BOOL PWIsPinwheelPresentedController(UIViewController *controller) {
  NSString *bundleID = [NSBundle bundleForClass:[controller class]].bundleIdentifier;
  return ![bundleID hasPrefix:@"com.apple."];
}

@implementation RTNPinwheelView

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<RTNPinwheelComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if ((self = [super initWithFrame:frame])) {
    [self initPinwheelWrapperVC];
  }
  return self;
}

- (instancetype)initWithFrame:(CGRect)frame token:(NSString *)token {
  if ((self = [super initWithFrame:frame])) {
    _token = token;
  }
  return self;
}

// Helper to find parent VC from a UIView
- (UIViewController *)getParentViewController {
  UIResponder *responder = self.nextResponder;
  while (responder) {
    if ([responder isKindOfClass:[UIViewController class]]) {
      return (UIViewController *)responder;
    }
    responder = responder.nextResponder;
  }
  return nil;
}

- (void)cleanUpPinwheelWrapperVC {
  if (self.pinwheelWrapperVC != nil) {
    // Link may present a full-screen controller (e.g. the Bill Switch screen)
    // from inside the wrapper. UIKit forwards that presentation to the nearest
    // presenting ancestor, which inside a React Native <Modal> is RN's modal
    // host controller. On the new architecture RN dismisses that host by
    // calling dismiss on the host itself, and UIKit routes the call to whatever
    // the host is presenting, so RN would dismiss Link's controller and leave
    // an empty host on screen. Dismissing our controller first (from its
    // presenting controller, so anything stacked on top goes too) lets RN's
    // dismissal reach the host.
    UIViewController *presented = self.pinwheelWrapperVC.presentedViewController;
    if (presented != nil && !presented.isBeingDismissed &&
        PWIsPinwheelPresentedController(presented)) {
      UIViewController *presenting =
          presented.presentingViewController ?: self.pinwheelWrapperVC;
      [presenting dismissViewControllerAnimated:NO completion:nil];
    }
    [self.pinwheelWrapperVC willMoveToParentViewController:nil];
    [self.pinwheelWrapperVC.view removeFromSuperview];
    [self.pinwheelWrapperVC removeFromParentViewController];
    self.pinwheelWrapperVC = nil;
  }
}

- (void)initPinwheelWrapperVC {
  [self cleanUpPinwheelWrapperVC];

  if (self.token == nil) {
    return;
  }

  UIViewController *parentVC = [self getParentViewController];
  if (!parentVC) {
    // Not yet attached to the hierarchy, skip for now and `didMoveToWindow`
    // will retry later.
    return;
  }

  self.pinwheelWrapperVC =
      [[PWPinwheelWrapperVC alloc] initWithToken:self.token
                                        delegate:self
                                             sdk:@"react native"
                                         version:@"4.0.2"
                                  useSecureOrigin:self.useSecureOrigin
                                      useDarkMode:self.useDarkMode
                               useAppBoundDomains:NO
                  useAppBoundDomainsForNativeLink:NO];

  // Guard against double-attachment (shouldn’t happen after cleanup, but safe).
  if (self.pinwheelWrapperVC.parentViewController == parentVC) {
    self.pinwheelWrapperVC.view.frame = self.bounds;
    return;
  }

  [parentVC addChildViewController:self.pinwheelWrapperVC];
  [self addSubview:self.pinwheelWrapperVC.view];
  self.pinwheelWrapperVC.view.frame = self.bounds;
  [self.pinwheelWrapperVC didMoveToParentViewController:parentVC];
}

// Fabric's `unmountChildComponentView` and the legacy `removeReactSubview` both
// detach the view from its superview on unmount, so this fires reliably for an
// unmount regardless of whether the view is later recycled or deallocated.
// (A fullScreen presentation over Link removes the *window*, not the superview,
// so this does not fire while Bill Switch is open.)
- (void)didMoveToSuperview {
  [super didMoveToSuperview];
  if (self.superview == nil) {
    [self cleanUpPinwheelWrapperVC];
  }
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  if (self.window) {
    if (!self.pinwheelWrapperVC) {
      [self initPinwheelWrapperVC];
    }
  }
}

- (void)prepareForRecycle {
  [super prepareForRecycle];
  [self cleanUpPinwheelWrapperVC];
  // Reset local prop state so a recycled view starts clean; `updateProps`
  // re-applies everything from the incoming props on the next mount.
  _token = nil;
  _useDarkMode = NO;
  _useSecureOrigin = NO;
}

- (void)dealloc {
  [self cleanUpPinwheelWrapperVC];
}

- (void)setToken:(NSString *)newToken {
  if (![_token isEqualToString:newToken]) {
    _token = newToken;
  }
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps {
  const auto &newViewProps =
      *std::static_pointer_cast<RTNPinwheelProps const>(props);

  // Apply props unconditionally instead of diffing against `_props`. Fabric
  // recycles views and `RCTViewComponentView` does not reset `_props` in
  // `prepareForRecycle`, so a recycled view re-mounted with the same token
  // would otherwise see "no change" and keep the state cleared on recycle.
  [self setToken:newViewProps.token.empty()
                     ? nil
                     : [NSString stringWithUTF8String:newViewProps.token.c_str()]];
  self.useDarkMode = newViewProps.useDarkMode;
  self.useSecureOrigin = newViewProps.useSecureOrigin;

  // Ensures that the view is always re-initialized whenever the props change,
  // or the React Native component is re-mounted. On the new architecture, there
  // are optimizations which causes the view to be re-used in these scenarios,
  // whereas the ideal functionality here is to have the Link modal reset to the
  // starting state.
  [self initPinwheelWrapperVC];

  [super updateProps:props oldProps:oldProps];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  if (self.pinwheelWrapperVC != nil) {
    self.pinwheelWrapperVC.view.frame = self.bounds;
  }
}

- (void)onEventWithName:(NSString *)name
                  event:(NSDictionary<NSString *, id> *)event {
  NSLog(@"%@", name);
  NSDictionary *dataToSend = @{@"name" : name, @"payload" : event};
  [RTNPinwheelEvents.sharedInstance handlePinwheelEvent:dataToSend];
}

- (void)onExit:(NSDictionary<NSString *, id> *)error {
  NSLog(@"%@", error);
}

- (void)onSuccess:(NSDictionary<NSString *, id> *)result {
  NSLog(@"%@", result);
}

- (void)onLogin:(NSDictionary<NSString *, id> *)result {
  NSLog(@"%@", result);
}

- (void)onLoginAttempt:(NSDictionary<NSString *, id> *)result {
  NSLog(@"%@", result);
}

- (void)onError:(NSDictionary<NSString *, id> *)error {
  NSLog(@"%@", error);
}

@end

// NOTE: React Native codegen extracts this class name with a greedy regex over
// the whole file. Do not use the `Foo.class` property syntax anywhere below
// this point (use `[foo class]`), or the generated component provider breaks.
Class<RCTComponentViewProtocol> RTNPinwheelCls(void) {
  return RTNPinwheelView.class;
}

#else

#import "RTNPinwheelEvents.h"
#import "RTNPinwheelView.h"
#if __has_include(<RNPinwheelSDK/RNPinwheelSDK-Swift.h>)
#import <RNPinwheelSDK/RNPinwheelSDK-Swift.h>
#else
#import "RNPinwheelSDK-Swift.h"
#endif

// Only tear down controllers that Link (or something Link embeds) presented.
// Controllers from Apple frameworks, e.g. a UIAlertController the app showed
// from the same host, belong to the app and are left alone.
static BOOL PWIsPinwheelPresentedController(UIViewController *controller) {
  NSString *bundleID = [NSBundle bundleForClass:[controller class]].bundleIdentifier;
  return ![bundleID hasPrefix:@"com.apple."];
}

@implementation RTNPinwheelView

- (instancetype)initWithFrame:(CGRect)frame {
  if ((self = [super initWithFrame:frame])) {
    [self initPinwheelWrapperVC];
  }
  return self;
}

- (instancetype)initWithFrame:(CGRect)frame token:(NSString *)token {
  if ((self = [super initWithFrame:frame])) {
    _token = token;
  }
  return self;
}

// Helper to find parent VC from a UIView
- (UIViewController *)getParentViewController {
  UIResponder *responder = self.nextResponder;
  while (responder) {
    if ([responder isKindOfClass:[UIViewController class]]) {
      return (UIViewController *)responder;
    }
    responder = responder.nextResponder;
  }
  return nil;
}

- (void)cleanUpPinwheelWrapperVC {
  if (self.pinwheelWrapperVC != nil) {
    // Link may present a full-screen controller (e.g. the Bill Switch screen)
    // from inside the wrapper. UIKit forwards that presentation to the nearest
    // presenting ancestor, which inside a React Native <Modal> is RN's modal
    // host controller. On the new architecture RN dismisses that host by
    // calling dismiss on the host itself, and UIKit routes the call to whatever
    // the host is presenting, so RN would dismiss Link's controller and leave
    // an empty host on screen. Dismissing our controller first (from its
    // presenting controller, so anything stacked on top goes too) lets RN's
    // dismissal reach the host.
    UIViewController *presented = self.pinwheelWrapperVC.presentedViewController;
    if (presented != nil && !presented.isBeingDismissed &&
        PWIsPinwheelPresentedController(presented)) {
      UIViewController *presenting =
          presented.presentingViewController ?: self.pinwheelWrapperVC;
      [presenting dismissViewControllerAnimated:NO completion:nil];
    }
    [self.pinwheelWrapperVC willMoveToParentViewController:nil];
    [self.pinwheelWrapperVC.view removeFromSuperview];
    [self.pinwheelWrapperVC removeFromParentViewController];
    self.pinwheelWrapperVC = nil;
  }
}

- (void)initPinwheelWrapperVC {
  [self cleanUpPinwheelWrapperVC];

  if (self.token == nil) {
    return;
  }

  UIViewController *parentVC = [self getParentViewController];
  if (!parentVC) {
    // Not yet attached to the hierarchy, skip for now and `didMoveToWindow`
    // will retry later.
    return;
  }

  self.pinwheelWrapperVC =
      [[PWPinwheelWrapperVC alloc] initWithToken:self.token
                                        delegate:self
                                             sdk:@"react native"
                                         version:@"4.0.2"
                                  useSecureOrigin:self.useSecureOrigin
                                      useDarkMode:self.useDarkMode
                               useAppBoundDomains:NO
                  useAppBoundDomainsForNativeLink:NO];

  // Guard against double-attachment (shouldn’t happen after cleanup, but safe).
  if (self.pinwheelWrapperVC.parentViewController == parentVC) {
    self.pinwheelWrapperVC.view.frame = self.bounds;
    return;
  }

  [parentVC addChildViewController:self.pinwheelWrapperVC];
  [self addSubview:self.pinwheelWrapperVC.view];
  self.pinwheelWrapperVC.view.frame = self.bounds;
  [self.pinwheelWrapperVC didMoveToParentViewController:parentVC];
}

// Fabric's `unmountChildComponentView` and the legacy `removeReactSubview` both
// detach the view from its superview on unmount, so this fires reliably for an
// unmount regardless of whether the view is later recycled or deallocated.
// (A fullScreen presentation over Link removes the *window*, not the superview,
// so this does not fire while Bill Switch is open.)
- (void)didMoveToSuperview {
  [super didMoveToSuperview];
  if (self.superview == nil) {
    [self cleanUpPinwheelWrapperVC];
  }
}

- (void)didMoveToWindow {
  [super didMoveToWindow];
  if (self.window) {
    if (!self.pinwheelWrapperVC) {
      [self initPinwheelWrapperVC];
    }
  }
}

- (void)dealloc {
  [self cleanUpPinwheelWrapperVC];
}

- (void)setToken:(NSString *)newToken {
  if (![_token isEqualToString:newToken]) {
    _token = newToken;
    [self initPinwheelWrapperVC];
  }
}

- (void)setUseDarkMode:(BOOL)newUseDarkMode {
  if (_useDarkMode != newUseDarkMode) {
    _useDarkMode = newUseDarkMode;
    [self initPinwheelWrapperVC];
  }
}

- (void)setUseSecureOrigin:(BOOL)newUseSecureOrigin {
  if (_useSecureOrigin != newUseSecureOrigin) {
    _useSecureOrigin = newUseSecureOrigin;
    [self initPinwheelWrapperVC];
  }
}

- (void)layoutSubviews {
  [super layoutSubviews];
  self.pinwheelWrapperVC.view.frame = self.bounds;
}

- (void)onEventWithName:(NSString *)name
                  event:(NSDictionary<NSString *, id> *)event {
  NSLog(@"%@", name);
  NSDictionary *dataToSend = @{@"name" : name, @"payload" : event};
  [RTNPinwheelEvents.sharedInstance handlePinwheelEvent:dataToSend];
}

- (void)onExit:(NSDictionary<NSString *, id> *)error {
  NSLog(@"%@", error);
}

- (void)onSuccess:(NSDictionary<NSString *, id> *)result {
  NSLog(@"%@", result);
}

- (void)onLogin:(NSDictionary<NSString *, id> *)result {
  NSLog(@"%@", result);
}

- (void)onLoginAttempt:(NSDictionary<NSString *, id> *)result {
  NSLog(@"%@", result);
}

- (void)onError:(NSDictionary<NSString *, id> *)error {
  NSLog(@"%@", error);
}

@end

#endif
