#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNTPinwheelEvents : RCTEventEmitter <RCTBridgeModule>

+ (instancetype)sharedInstance;
- (void)handlePinwheelEvent:(NSDictionary<NSString *, id> *)payload;

@end
