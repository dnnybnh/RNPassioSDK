import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react';
import {
    View,
    UIManager, 
    createRef,
    findNodeHandle,
    requireNativeComponent,
} from 'react-native';

//Using Native Modules to bridge iOS Native Components to React Native
const PassioView = requireNativeComponent('PassioView');

//UIManager is used to get the methods that is needed to be exposed from Swift to React Native
const nativeCommands = UIManager.getViewManagerConfig('PassioView').Commands;

//Creating a reference to the PassioSDK itself
const passioRef = React.createRef();

const PassioScanner = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [key, setKey] = useState('');

    const passioRef = useRef();

   //Using useEffect to configure the SDK after it is made visible 
    useEffect(() => {
        if (visible) {
            const passioNodeHandle = findNodeHandle(passioRef.current);
            UIManager.dispatchViewManagerCommand(passioNodeHandle, nativeCommands.ConfigureSDK, [key]);
        }
    }, [visible])

    //Exposing a configureSDK method to the parent so it can be called to both display the component and configure the SDK
    useImperativeHandle(ref, () => ({
        configureSDK(key) {
            setVisible(true);
            setKey(key);
        }
    }));
    
    if (!visible) return null;

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                height: '100%',
                width: '100%',
            }}
        >
            <PassioView 
                ref={passioRef}
            />
        </View>
    );
});

PassioScanner.propTypes = {};

export default PassioScanner;