import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    NativeModules,
    NativeEventEmitter,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

/* TODO: Potential bug
    * By using the RNCamera library, I'm able to replicate the camera view from a native app.
    * The bug that I ran into is when the detection start, the camera would freeze but the app 
    * is still working and the label would still be updated with the correct logo detected.
*/

//Using the NativeModules component of React Native, Javascript is capable of connecting to iOS Native Modules.
const PassioSDK = NativeModules.PassioController;
//Using the NativeEventEmitter component of React Native, Javascript is capable of listening to custom events from iOS
const PassioEvent = new NativeEventEmitter(NativeModules.PassioController);

const Camera = () => {

    //Using the useState hook to keep track of the logo from the logoListener 
    //event and checking if th camera is ready in order to start the native detection method
    const [logo, setLogo] = useState('No Logo Found');
    const [cameraReady, isCameraReady] = useState(false);

    useEffect(() => {
        //Setting up a listener for the logoListener event in order to 
        //keep track of the logo that is detected from the CustomDetectionResult method in Swift
        PassioEvent.addListener('logoListener', res => {
            console.log(res);
            setLogo(res.logo);
        });
    }, []);

    useEffect(() => {
        //Using the useEffect hook to listen to the cameraReady state in order to start detection properly
        if (cameraReady) {
            //Calling the NativeModule's Method startDectection to start the detection process
            PassioSDK.startDetection();
        }
    }, [cameraReady])

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                height: '100%',
                width: '100%',
            }}
        >
            <RNCamera 
                ref={cameraRef}
                style={{
                    height: '100%',
                    width: '100%',
                }}
                onCameraReady={() => {isCameraReady(true)}}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                captureAudio={false}
            />
            <View
                style={{
                    height: 50,
                    width: '100%',
                    position: 'absolute',
                    bottom: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: '#fff',
                    }}
                >{logo}</Text>
            </View>
        </View>
    );
};

export default Camera;