#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNTPinwheelEvents : RCTEventEmitter <RCTBridgeModule>

+ (instancetype)sharedInstance;
- (void)handleMyEvent:(NSString *)eventName;

@end
