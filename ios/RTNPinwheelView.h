#if RCT_NEW_ARCH_ENABLED

#import <React/RCTViewComponentView.h>

# endif

#import <WebKit/WebKit.h>
#import <PinwheelSDK/PinwheelSDK-Swift.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

#ifdef RCT_NEW_ARCH_ENABLED

@interface RTNPinwheelView : RCTViewComponentView <PinwheelWrapperDelegate>

#else

@interface RTNPinwheelView : UIView <PinwheelWrapperDelegate>

#endif


@property (nonatomic, strong, nullable) PinwheelWrapperVC *pinwheelWrapperVC;
@property (nonatomic, strong) NSString *token;
@property (nonatomic, assign) BOOL useDarkMode;

- (instancetype)initWithFrame:(CGRect)frame token:(NSString *)token;

@end

NS_ASSUME_NONNULL_END
