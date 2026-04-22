import { getHostComponent, type HybridRef } from 'react-native-nitro-modules'
import MemoryHungryViewConfig from '../../nitrogen/generated/shared/json/MemoryHungryViewConfig.json'
import {
  type MemoryHungryViewMethods,
  type MemoryHungryViewProps,
} from '../specs/MemoryHungryView.nitro'

export const MemoryHungryView = getHostComponent<
  MemoryHungryViewProps,
  MemoryHungryViewMethods
>('MemoryHungryView', () => MemoryHungryViewConfig)

export type MemoryHungryViewRef = HybridRef<
  MemoryHungryViewProps,
  MemoryHungryViewMethods
>
