#import "RNTPinwheelView.h"

@implementation RNTPinwheelView

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {

      self.pinwheelWrapperVC = [[PinwheelWrapperVC alloc] initWithToken:[self token] delegate:self];
      [self addSubview:self.pinwheelWrapperVC.view];
  }
  return self;
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
