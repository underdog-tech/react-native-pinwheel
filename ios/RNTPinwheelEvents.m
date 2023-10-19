#import "RNTPinwheelEvents.h"

@implementation RNTPinwheelEvents
{
  bool hasListeners; // This is an instance variable declaration.
}

RCT_EXPORT_MODULE();
+ (BOOL)requiresMainQueueSetup {
  return NO; // change this to NO if you don't need the main thread
}

+ (instancetype)sharedInstance {
    static RNTPinwheelEvents *sharedInstance = nil;
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

- (void)handleMyEvent:(NSString *)eventName
{
  if (hasListeners) {// Only send events if anyone is listening
    [self sendEventWithName:@"MyEvent" body:@{@"name": eventName}];
  }
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"MyEvent"]; // Add more event names here.
}

@end
