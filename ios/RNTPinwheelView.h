#import <UIKit/UIKit.h>
#import <PinwheelSDK/PinwheelSDK-Swift.h>

@interface RNTPinwheelView : UIView <PinwheelWrapperDelegate>

@property (nonatomic, strong) PinwheelWrapperVC *pinwheelWrapperVC;
@property (nonatomic, assign) NSString *token;

- (instancetype)initWithFrame:(CGRect)frame token:(NSString *)token;

@end
