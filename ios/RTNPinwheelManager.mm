#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>
#import "RTNPinwheelView.h"

@interface RTNPinwheelManager : RCTViewManager
@end

@implementation RTNPinwheelManager

RCT_EXPORT_MODULE(RTNPinwheelView)

- (UIView *)view
{   
    RTNPinwheelView *pv = [[RTNPinwheelView alloc] init];
    return pv;
}

RCT_EXPORT_VIEW_PROPERTY(token, NSString);

@end