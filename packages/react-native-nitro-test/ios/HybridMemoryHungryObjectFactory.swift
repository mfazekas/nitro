import NitroModules

class HybridMemoryHungryObjectFactory: HybridMemoryHungryObjectFactorySpec {
  func create(sizeInBytes: Double, label: String) throws -> any HybridMemoryHungryObjectSpec {
    return HybridMemoryHungryObject(sizeInBytes: Int(sizeInBytes), label: label)
  }
}
