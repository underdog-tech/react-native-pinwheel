#ifdef RCT_NEW_ARCH_ENABLED

#import "RTNPinwheelView.h"

#import <react/renderer/components/RTNPinwheelSpec/ComponentDescriptors.h>
#import <react/renderer/components/RTNPinwheelSpec/EventEmitters.h>
#import <react/renderer/components/RTNPinwheelSpec/Props.h>
#import <react/renderer/components/RTNPinwheelSpec/RCTComponentViewHelpers.h>

#import "RTNPinwheelEvents.h"
#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RTNPinwheelView () <RCTRTNPinwheelViewProtocol>
@end

@implementation RTNPinwheelView

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
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

- (void)initPinwheelWrapperVC {
    if (self.pinwheelWrapperVC != nil) {
        [self.pinwheelWrapperVC.view removeFromSuperview];
        self.pinwheelWrapperVC = nil;
    }

    if (self.token != nil) {
        self.pinwheelWrapperVC = [[PinwheelWrapperVC alloc] initWithToken:self.token delegate:self sdk:@"react native" version:@"3.4.0" useDarkMode:self.useDarkMode useAppBoundDomains:NO useAppBoundDomainsForNativeLink:NO];
        [self addSubview:self.pinwheelWrapperVC.view];
    }
}

- (void)setToken:(NSString *)newToken {
    if (![_token isEqualToString:newToken]) {
        _token = newToken;
    }
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RTNPinwheelProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RTNPinwheelProps const>(props);

    if (oldViewProps.token != newViewProps.token) {
        NSString* convertedToken = [NSString stringWithUTF8String:newViewProps.token.c_str()];
        [self setToken:convertedToken];
    }

    if (oldViewProps.useDarkMode != newViewProps.useDarkMode) {
        self.useDarkMode = newViewProps.useDarkMode;
    }

    // Ensures that the view is always re-initialized whenever the props change, or the React Native component is
    // re-mounted. On the new architecture, there are optimizations which causes the view to be re-used in these
    // scenarios, whereas the ideal functionality here is to have the Link modal reset to the starting state.
    [self initPinwheelWrapperVC];

    [super updateProps:props oldProps:oldProps];
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    if (self.pinwheelWrapperVC != nil) {
        self.pinwheelWrapperVC.view.frame = self.bounds;
    }
}

- (void)onEventWithName:(NSString *)name event:(NSDictionary<NSString *, id> *)event {
    NSLog(@"%@", name);
    NSDictionary *dataToSend = @{@"name": name, @"payload": event};
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

Class<RCTComponentViewProtocol> RTNPinwheelCls(void)
{
  return RTNPinwheelView.class;
}

#else

#import "RTNPinwheelView.h"
#import "RTNPinwheelEvents.h"

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

- (void)initPinwheelWrapperVC {
    if (self.pinwheelWrapperVC != nil) {
        [self.pinwheelWrapperVC.view removeFromSuperview];
        self.pinwheelWrapperVC = nil;
    }

    if (self.token != nil) {
        self.pinwheelWrapperVC = [[PinwheelWrapperVC alloc] initWithToken:self.token delegate:self sdk:@"react native" version:@"3.4.0" useDarkMode:self.useDarkMode useAppBoundDomains:NO useAppBoundDomainsForNativeLink:NO];
        [self addSubview:self.pinwheelWrapperVC.view];
    }
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

- (void)layoutSubviews
{
  [super layoutSubviews];
  self.pinwheelWrapperVC.view.frame = self.bounds;
}

- (void)onEventWithName:(NSString *)name event:(NSDictionary<NSString *, id> *)event {
    NSLog(@"%@", name);
    NSDictionary *dataToSend = @{@"name": name, @"payload": event};
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
