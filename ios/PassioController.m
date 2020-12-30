//
//  PassioController.m
//  PassioRN
//
//  Created by Danny Banh on 12/28/20.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

//This is the Objective-C file that is used to expose the NativeModule and its' methods to Javscript
@interface RCT_EXTERN_MODULE(PassioController, RCTEventEmitter)

RCT_EXTERN_METHOD(ConfigureSDK:(NSString *)key)
RCT_EXTERN_METHOD(startDetection)

@end
