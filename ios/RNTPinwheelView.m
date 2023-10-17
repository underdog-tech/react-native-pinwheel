#import "RNTPinwheelView.h"

@implementation RNTPinwheelView

- (instancetype)initWithFrame:(CGRect)frame {
//    return [self initWithFrame:frame token:nil];
    if ((self = [super initWithFrame:frame])) {
        if (self.token != nil) {
            self.pinwheelWrapperVC = [[PinwheelWrapperVC alloc] initWithToken:self.token delegate:self];
            [self addSubview:self.pinwheelWrapperVC.view];
        }
    }
    return self;
}

- (instancetype)initWithFrame:(CGRect)frame token:(NSString *)token {
    if ((self = [super initWithFrame:frame])) {
        _token = token;
        
        self.pinwheelWrapperVC = [[PinwheelWrapperVC alloc] initWithToken:self.token delegate:self];
        [self addSubview:self.pinwheelWrapperVC.view];
    }
    return self;
}

- (void)setToken:(NSString *)newToken {
    if (![_token isEqualToString:newToken]) {
        _token = newToken;
        
        if (newToken != nil) {
            self.pinwheelWrapperVC = [[PinwheelWrapperVC alloc] initWithToken:self.token delegate:self];
            [self addSubview:self.pinwheelWrapperVC.view];
        }
    }
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  self.pinwheelWrapperVC.view.frame = self.bounds;
}

- (void)onEventWithName:(NSString *)name event:(NSDictionary<NSString *, id> *)event {
    NSLog(@"%@", name);
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
