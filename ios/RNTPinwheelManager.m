#import <React/RCTViewManager.h>
#import "RNTPinwheelView.h"

@interface RNTPinwheelManager : RCTViewManager

@end

@implementation RNTPinwheelManager : RCTViewManager

RCT_EXPORT_MODULE(RNTPinwheelManager);

- (UIView *)view
{   
    RNTPinwheelView *pv = [[RNTPinwheelView alloc] init];
    return pv;
}

RCT_EXPORT_VIEW_PROPERTY(token, NSString);

@end

