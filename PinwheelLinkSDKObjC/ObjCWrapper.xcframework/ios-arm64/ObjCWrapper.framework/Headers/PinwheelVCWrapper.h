#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@protocol PinwheelVCWrapperDelegate <NSObject>
- (void)onEventWithName:(NSString *)name event:(NSDictionary *)event;
@end

@interface PinwheelVCWrapper : UIViewController

- (instancetype)initWithToken:(NSString *)token delegate:(id<PinwheelVCWrapperDelegate>)delegate;
- (instancetype)initWithToken:(NSString *)token delegate:(id<PinwheelVCWrapperDelegate>)delegate sdk:(NSString *)sdk version:(NSString *)version;

@end

