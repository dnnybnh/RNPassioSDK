# PassioSDK React Native Bridge Challenge

The objective is to build a very simple logo recognition React Native app using Passio's logo SDK. 

Couple files were created and modified during the challenge.

Files Created and Modified:
* App.js
* PassioScanner.js
* CameraView.swift
* PassioView.swift
* PassioController.m
* PassioRN-Bridging-Header.h

# TODO:
* UI Update: I want to be able to click a back arrow or a cancel button to go back to the previous page or pause the scanning process
* UI Update: A better UI in general would also be better in order to display the full capability of this App

# How to install and run the React Native App

1. Clone the following repository
2. Perform `npm install --save` in the terminal with the path of the repository. This is to install the required library for the project
3. Perform `cd ios` in the terminal to navigate to the ios file
4. Perform `pod install` in the terminal in order to install the the Cocopod files for iOS
5. Once everything is installed, open the PassioRN.xcworkspace
6. Select the PassioRN xcode project and make sure all the app signing is correct
7. Once completed, plug in an iOS device and select to run the project on that device.
8. Make sure that the hosting device and the iOS device is connected with the same WiFi point
9. Once the app is launched, click a button in the center with the label "Test SDK"
10. Once the screen is changed to the camera view, simply hover it over a logo and the label will change from "No Logo Found" to it detect value

# Documentation on the Code

## App.js

The App.js file was simply modified to connect with the NativeModule in order to configure PassioSDK with a given KEY. A simple UI was also implemented into this file to let user navigate to the scanning screen.

## PassioScanner.js

The PassioScanner.js file is a native UI Component that was created to connect with the NativeModule in order to start the detection process and listen the logoName value that is given by customDetectionResult method in Swift.

## CameraView.swift

This file is where the preview layer is being set up. By using the method of bridging a RCTViewManager, the camera preview screen was able to be exposed to Javascript and used as a Native UI Component.

## PassioView.swift

This file is the main swift file that is used to execute the minimum required APIS for scanning and detecting a logo. There is one function that is being exposed to Javascript and that is ConfigureSDK(key:NSString). When the ConfigureSDK is called with a KEY passed in as parameter, the PassioSDK would configure then immediately start the detection process.

## PassioView.m

This file is used to export the modules, methods and events to Javascript.

## PassioRN-Bridging-Header.h

This header file is generated by Xcode as a required header file in order to bridge Objective-C package with Swift package
