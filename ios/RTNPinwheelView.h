#if RCT_NEW_ARCH_ENABLED

#import <React/RCTViewComponentView.h>

# endif

#import <ObjCWrapper/PinwheelVCWrapper.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

#ifdef RCT_NEW_ARCH_ENABLED

@interface RTNPinwheelView : RCTViewComponentView <PinwheelVCWrapperDelegate>

#else 

@interface RTNPinwheelView : UIView <PinwheelVCWrapperDelegate>

#endif

@property (nonatomic, strong) PinwheelVCWrapper *pinwheelWrapperVC;
@property (nonatomic, assign) NSString *token;

- (instancetype)initWithFrame:(CGRect)frame token:(NSString *)token;

@end

NS_ASSUME_NONNULL_END
