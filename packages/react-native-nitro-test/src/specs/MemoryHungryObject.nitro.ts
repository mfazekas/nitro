import type { HybridObject } from 'react-native-nitro-modules'

export interface MemoryHungryObject
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  readonly sizeInBytes: number
  readonly label: string
}

export interface MemoryHungryObjectFactory
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  create(sizeInBytes: number, label: string): MemoryHungryObject
}
