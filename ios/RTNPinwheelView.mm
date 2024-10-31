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
    if (self.token != nil && self.pinwheelWrapperVC == nil) {    
        self.pinwheelWrapperVC = [[PinwheelVCWrapper alloc] initWithToken:self.token delegate:self sdk:@"react native" version: @"3.0.5"];
        [self addSubview:self.pinwheelWrapperVC.view];
    }
}

- (void)setToken:(NSString *)newToken {
    if (![_token isEqualToString:newToken]) {
        _token = newToken;
        [self initPinwheelWrapperVC];
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

    [super updateProps:props oldProps:oldProps];
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

Class<RCTComponentViewProtocol> RTNPinwheelCls(void)
{
  return RTNPinwheelView.class;
}

