#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>
#import "RTNPinwheelView.h"

@interface RTNPinwheelManager : RCTViewManager
@end

@implementation RTNPinwheelManager

#ifdef RCT_NEW_ARCH_ENABLED
RCT_EXPORT_MODULE(RTNPinwheelView)
#else
RCT_EXPORT_MODULE(RTNPinwheel)
#endif

- (UIView *)view
{
    return [[RTNPinwheelView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(token, NSString);
RCT_EXPORT_VIEW_PROPERTY(useDarkMode, BOOL);

@end
