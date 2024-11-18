#ifdef RCT_NEW_ARCH_ENABLED

#import <RTNPinwheelSpec/RTNPinwheelSpec.h>

#else 

#import <React/RCTBridgeModule.h>

#endif 


#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNPinwheelEvents : RCTEventEmitter 

#ifdef RCT_NEW_ARCH_ENABLED
    <NativePinwheelEventsSpec>
#else 
    <RCTBridgeModule>
#endif

+ (instancetype)sharedInstance;
- (void)handlePinwheelEvent:(NSDictionary<NSString *, id> *)payload;

@end

NS_ASSUME_NONNULL_END
