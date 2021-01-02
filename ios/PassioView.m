#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTViewManager.h>

//This is the Objective-C file that is used to expose the NativeModule and its' methods to Javscript
@interface RCT_EXTERN_MODULE(PassioView, RCTViewManager)

RCT_EXTERN_METHOD(ConfigureSDK:(nonnull NSNumber *)node key:(NSString *)key)

@end
