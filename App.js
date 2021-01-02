import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

import PassioScanner from './src/RNPassioSDK/PassioScanner';

const KEY = 'ppGdJa8R0gizAGbhbvrVTtHIB44XH6SWSiuPfhgmlo';

const App = () => {
  //Setting the SDK as a ref to be used for function call
  const passioSDK = useRef();

  //This action method is used to display PassioSDK Scanner
  const onTest = () => {
    //Passing in KEY to configure the SDK and start the scanner
    passioSDK.current.configureSDK(KEY);
  }

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
      <PassioScanner ref={passioSDK}/>
    </View>
  );
};

export default App;