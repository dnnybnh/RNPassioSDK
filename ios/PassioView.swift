//
//  PassioView.swift
//  PassioRN
//
//  Created by Danny Banh on 1/2/21.
//

import Foundation
import UIKit

#if canImport(PassioSDK)
import PassioSDK
#endif

//This is the Manager of the Native Component CameraView.swift
@objc(PassioView)
class PassioView: RCTViewManager {
  var cameraView: CameraView!
  var logoLabel: UILabel?
  
  let passioSDK = PassioSDK.shared
  
  let passioIDToName = ["LOG0002": "Coca Cola"]//"LOG0001": "Starbuck" ]
  
  override func view() -> UIView! {
    //Getting the screen's width and height
    let screenRect = UIScreen.main.bounds
    let screenWidth = screenRect.size.width
    let screenHeight = screenRect.size.height
    
    //Setting the frame of the CameraView
    cameraView = CameraView(frame: CGRect(x: 0, y: 0, width: screenWidth, height: screenHeight))
    
    //Creating the Label to house the logo result
    logoLabel = UILabel(frame: CGRect(x: 0, y: 600, width: screenWidth, height: 50))
    logoLabel?.backgroundColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.5)
    logoLabel?.textColor = .white
    logoLabel?.textAlignment = NSTextAlignment.center
    logoLabel?.text = "No logo found"
    
    //Adding the Label to the CameraView
    cameraView.addSubview(logoLabel!)
    
    //Returning the CameraView to be displayed
    return cameraView
  }
  
  //This is a method that is being exposed to React Native to be call to configure the SDK
  @objc
  public func ConfigureSDK(_ node:NSNumber, key:NSString) -> Void {
    passioSDK.configure(key: key as String) { (isReady) in
      print("Passio isReady = \(isReady)")
      
      //Once the SDK is configured, the detection process is started on it's own
      self.startDetection()
    }
  }
  
  func startDetection() {
    passioSDK.startCustomObjectDetection(modelName: "passio_developerlogodemo_SSD", customDetectionDelegate: self) { (ready) in
        print("Detection Ready = \(ready)")
    }
  }
  
  override class func requiresMainQueueSetup() -> Bool {
    return true;
  }
}

extension PassioView: CustomDetectionDelegate { 

    func customDetectionResult(odCandidates: [CustomObjectDetectionCandidate]?, hnnCandidates: [CustomClassificationCandidate]?, classCandidates: [CustomClassificationCandidate]?, image: UIImage?) {
      var logoName = "No logo found"
      if let candidate = odCandidates?.first {
          logoName = passioIDToName[candidate.label] ?? candidate.passioID
      }

      //Used to constantly update the logoLabel to display the result of the detection
      DispatchQueue.main.async {
        self.logoLabel?.text = logoName
      }
    }
}
