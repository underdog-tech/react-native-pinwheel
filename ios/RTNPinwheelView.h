#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>
#import <ObjCWrapper/PinwheelVCWrapper.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNPinwheelView : RCTViewComponentView <PinwheelVCWrapperDelegate>

@property (nonatomic, strong) PinwheelVCWrapper *pinwheelWrapperVC;
@property (nonatomic, assign) NSString *token;

- (instancetype)initWithFrame:(CGRect)frame token:(NSString *)token;

@end

NS_ASSUME_NONNULL_END

