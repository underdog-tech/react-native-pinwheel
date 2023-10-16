#import <React/RCTViewManager.h>
#import "RNTPinwheelView.h"

@interface RNTPinwheelManager : RCTViewManager

@property (nonatomic, strong) NSString *token;

@end

@implementation RNTPinwheelManager : RCTViewManager

RCT_EXPORT_MODULE(RNTPinwheelManager);
RCT_EXPORT_VIEW_PROPERTY(token, NSString);

- (UIView *)view
{   

    RNTPinwheelView *pv = [[RNTPinwheelView alloc] init];
    pv.token = [self token];
    return pv;
}

@end

