import NitroModules
import UIKit

class HybridMemoryHungryView: HybridMemoryHungryViewSpec {
  var object: any HybridMemoryHungryObjectSpec {
    didSet {
      updateLabel()
    }
  }

  private let _label = UILabel()

  override init() {
    object = HybridMemoryHungryObject(sizeInBytes: 0, label: "empty")
    super.init()

    _label.textColor = .white
    _label.textAlignment = .center
    _label.numberOfLines = 0
    _label.font = .monospacedSystemFont(ofSize: 14, weight: .regular)
  }

  var view: UIView {
    updateLabel()
    return _label
  }

  private func updateLabel() {
    let bytes = Int(object.sizeInBytes)
    _label.text = "\(object.label)\n\(bytes / 1024)KB allocated"
  }
}
