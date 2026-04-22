import NitroModules

class HybridMemoryHungryObject: HybridMemoryHungryObjectSpec {
  private let _buffer: Data
  private let _label: String

  init(sizeInBytes: Int, label: String) {
    _buffer = Data(repeating: 0xAB, count: sizeInBytes)
    _label = label
    NSLog("[MemoryHungry] allocated \(sizeInBytes) bytes for '\(label)'")
  }

  var sizeInBytes: Double { Double(_buffer.count) }
  var label: String { _label }

  deinit {
    NSLog("[MemoryHungry] deallocated \(_buffer.count) bytes for '\(_label)'")
  }
}
