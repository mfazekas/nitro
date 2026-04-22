import type {
  HybridView,
  HybridViewProps,
  HybridViewMethods,
} from 'react-native-nitro-modules'
import type { MemoryHungryObject } from './MemoryHungryObject.nitro'

export interface MemoryHungryViewProps extends HybridViewProps {
  object: MemoryHungryObject
}

export interface MemoryHungryViewMethods extends HybridViewMethods {}

export type MemoryHungryView = HybridView<
  MemoryHungryViewProps,
  MemoryHungryViewMethods
>
