//
//  CameraView.swift
//  PassioRN
//
//  Created by Danny Banh on 1/2/21.
//

import Foundation
import AVFoundation
import UIKit

#if canImport(PassioSDK)
import PassioSDK
#endif

//Creating a custom CameraView for React Native
class CameraView: UIView {
  var previewLayer: AVCaptureVideoPreviewLayer?
  
  let passioSDK = PassioSDK.shared
  
  override init(frame:CGRect) {
    super.init(frame: frame)
    setupPreviewLayer()
    self.addSubview(UIView())
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  //Setting up the PreviewLayer
  func setupPreviewLayer() {
    guard previewLayer == nil else { return }
    if let previewLayer = passioSDK.getPreviewLayer() {
        self.previewLayer = previewLayer
        previewLayer.videoGravity = AVLayerVideoGravity.resizeAspectFill
        previewLayer.frame = self.frame
        self.layer.insertSublayer(previewLayer, at: 0)
    }
  }
}
