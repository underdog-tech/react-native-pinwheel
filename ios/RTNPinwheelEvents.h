#import <RTNPinwheelSpec/RTNPinwheelSpec.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNPinwheelEvents : RCTEventEmitter <NativePinwheelEventsSpec>

+ (instancetype)sharedInstance;
- (void)handlePinwheelEvent:(NSDictionary<NSString *, id> *)payload;

@end

NS_ASSUME_NONNULL_END