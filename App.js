import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

import Camera from './src/camera_component/Camera';

//Using the NativeModules component of React Native, Javascript is capable of connecting to iOS Native Modules.
const PassioSDK = NativeModules.PassioController;
const KEY = 'ppGdJa8R0gizAGbhbvrVTtHIB44XH6SWSiuPfhgmlo';

const App = () => {

  //Using useState hook to display the Camera on button Click.
  const [status, setStatus] = useState(false);

  useEffect(() => {
    //Using the useEffect hook to configure the SDK with a passed in KEY value
    PassioSDK.ConfigureSDK(KEY);
  }, []);

  //This action method is used to display the button
  const onTest = () => {
    setStatus(!status);
  }

  //This is a functional component that will only display the Camera Component when the status value is true
  const CameraContent = status ? (
    <Camera />
  ) : null;

  return (
    <View>
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>
            Welcome to Passio SDK for React Native!
          </Text>
          <TouchableOpacity
            onPress={onTest}
          >
            <View 
              style={{
                height: 50,
                width: 100,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                marginTop: 20,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { x: 0, y: 0 }
              }}
            >
              <Text>Test SDK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {CameraContent}
    </View>
  );
};

export default App;