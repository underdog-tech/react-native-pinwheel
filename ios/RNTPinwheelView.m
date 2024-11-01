#import "RNTPinwheelView.h"

@implementation RNTPinwheelView

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
        self.pinwheelWrapperVC = [[PinwheelWrapperVC alloc] initWithToken:self.token delegate:self sdk:@"react native" version: @"3.1.0"];
        [self addSubview:self.pinwheelWrapperVC.view];
    }
}

- (void)setToken:(NSString *)newToken {
    if (![_token isEqualToString:newToken]) {
        _token = newToken;
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
    [RNTPinwheelEvents.sharedInstance handlePinwheelEvent:dataToSend];
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
