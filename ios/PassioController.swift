//
//  PassioController.swift
//  PassioRN
//
//  Created by Danny Banh on 12/27/20.
//

import Foundation
import AVFoundation

import UIKit

#if canImport(PassioSDK)
import PassioSDK
#endif

@objc(PassioController)

class PassioController: RCTEventEmitter{
  
  //This is a required method in order to expose th ModuleName of PassioController to Javscript to pick up
  override static func moduleName() -> String! {
    return "PassioControler";
  }

  //This is a required method in order to create a bridge from Swift to Objective-C to Javascript
  override static func requiresMainQueueSetup() -> Bool {
    return true;
  }
  
  let passioSDK = PassioSDK.shared
  
  let passioIDToName = ["LOG0002": "Coca Cola", "LOG0001": "Starbuck" ]
  
  //This is one of the function that is bridged over to React Native to handle configuring the SDK with a KEY value that is input from React Native side.
  @objc
  func ConfigureSDK(_ key:NSString) -> Void {
    passioSDK.configure(key: key as String) { (isReady) in
      print("Passio isReady = \(isReady)")
    }
  }

  //This is one of the function that is bridged over to React Native to handle the detection process.
  @objc
  func startDetection() {
    
    //Using DispatchQueue to have the detection run asynchronously
    DispatchQueue.main.async {
      self.passioSDK.startCustomObjectDetection(modelName: "passio_developerlogodemo_SSD", customDetectionDelegate: self) { (ready) in
          print("Detection Ready = \(ready)")
      }
    }
  }
  
  //This is the method that tells iOS what custom event to send back to React Native
  override func supportedEvents() -> [String]! {
    return ["logoListener"]
  }

}

extension PassioController: CustomDetectionDelegate {

    func customDetectionResult(odCandidates: [CustomObjectDetectionCandidate]?, hnnCandidates: [CustomClassificationCandidate]?, classCandidates: [CustomClassificationCandidate]?, image: UIImage?) {
      var logoName = "No logo found"
      if let candidate = odCandidates?.first {
          logoName = passioIDToName[candidate.label] ?? candidate.passioID
      }

      //This is an event emitter to let React Native listen to the LogoName property when it is detected.
      sendEvent(withName: "logoListener", body: ["logo": logoName])
    }
}
