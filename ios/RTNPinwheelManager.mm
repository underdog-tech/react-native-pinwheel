#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>
#import "RTNPinwheelView.h"

@interface RTNPinwheelManager : RCTViewManager
@end

@implementation RTNPinwheelManager

RCT_EXPORT_MODULE(RTNPinwheel)

- (UIView *)view
{
    return [[RTNPinwheelView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(token, NSString);
RCT_EXPORT_VIEW_PROPERTY(useDarkMode, BOOL);

@end

@interface RTNPinwheelViewManager : RCTViewManager
@end

@implementation RTNPinwheelViewManager

RCT_EXPORT_MODULE(RTNPinwheelView)

- (UIView *)view
{
    return [[RTNPinwheelView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(token, NSString);
RCT_EXPORT_VIEW_PROPERTY(useDarkMode, BOOL);

@end
