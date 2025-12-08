import type {
  HybridView,
  HybridViewMethods,
  HybridViewProps,
} from 'react-native-nitro-modules'
import type { Base } from './Base.nitro'

export type ColorScheme = 'light' | 'dark'

export interface TestViewProps extends HybridViewProps {
  isBlue: boolean
  hasBeenCalled: boolean
  colorScheme: ColorScheme
  someCallback: () => void
  hybridData?: Base
}
export interface TestViewMethods extends HybridViewMethods {
  someMethod(): void
}

export type TestView = HybridView<TestViewProps, TestViewMethods>
