#if RCT_NEW_ARCH_ENABLED

#import <React/RCTViewComponentView.h>

# endif

#import <WebKit/WebKit.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

#ifdef __cplusplus
extern "C" {
#endif
@protocol PWPinwheelWrapperDelegate;
#ifdef __cplusplus
}
#endif

@class PWPinwheelWrapperVC;

#ifdef RCT_NEW_ARCH_ENABLED

@interface RTNPinwheelView : RCTViewComponentView <PWPinwheelWrapperDelegate>

#else

@interface RTNPinwheelView : UIView <PWPinwheelWrapperDelegate>

#endif


@property (nonatomic, strong, nullable) PWPinwheelWrapperVC *pinwheelWrapperVC;
@property (nonatomic, strong) NSString *token;
@property (nonatomic, assign) BOOL useDarkMode;
@property (nonatomic, assign) BOOL useSecureOrigin;

- (instancetype)initWithFrame:(CGRect)frame token:(NSString *)token;

@end

NS_ASSUME_NONNULL_END
