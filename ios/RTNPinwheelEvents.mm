#import "RTNPinwheelEvents.h"

@implementation RTNPinwheelEvents
{
  bool hasListeners; // This is an instance variable declaration.
}

RCT_EXPORT_MODULE();
+ (BOOL)requiresMainQueueSetup {
  return NO; // change this to NO if you don't need the main thread
}

+ (instancetype)sharedInstance {
    static RTNPinwheelEvents *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[super allocWithZone:NULL] init];
    });
    return sharedInstance;
}

+ (id)allocWithZone:(struct _NSZone *)zone {
    return [self sharedInstance];
}

- (id)copyWithZone:(NSZone *)zone {
    return self;
}
// Overriding the default init to make sure it's not used directly
- (instancetype)init {
    if (self = [super init]) {
        // Custom initialization if needed
    }
    return self;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    NSLog(@"startObserving called");
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    NSLog(@"stopObserving called");
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (void)handlePinwheelEvent:(NSDictionary<NSString *, id> *)payload
{
  if (hasListeners) {// Only send events if anyone is listening
    [self sendEventWithName:@"PINWHEEL_EVENT" body:payload];
  }
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"PINWHEEL_EVENT"]; // Add more event names here.
}

#if RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativePinwheelEventsSpecJSI>(params);
}
#endif

RCT_EXPORT_METHOD(removeListener) { 
    [self stopObserving];
}

RCT_EXPORT_METHOD(setListener) { 
    [self startObserving];
}



@end
