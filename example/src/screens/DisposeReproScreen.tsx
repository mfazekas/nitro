import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import {
  HybridMemoryHungryObjectFactory,
  MemoryHungryView,
  type MemoryHungryObject,
} from 'react-native-nitro-test'

function createObj(size: number, label: string): MemoryHungryObject {
  return HybridMemoryHungryObjectFactory.create(size, label)
}

function useMemoryHungryObject(
  sizeInBytes: number,
  label: string
): MemoryHungryObject | undefined {
  const [obj, setObj] = useState<MemoryHungryObject | undefined>()

  useEffect(() => {
    const created = createObj(sizeInBytes, label)
    setObj(created)
    return () => {
      console.log('[dispose]', label)
      try {
        created.dispose()
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error ?? '')
        if (
          !message.includes('failed to define internal native state property')
        ) {
          throw error
        }
      }
    }
  }, [sizeInBytes, label])

  return obj
}

const OBJECTS = [
  { label: 'Object-A', size: 10 * 1024 * 1024 },
  { label: 'Object-B', size: 20 * 1024 * 1024 },
  { label: 'Object-C', size: 5 * 1024 * 1024 },
] as const

function HungryBox({ size, label }: { size: number; label: string }) {
  const obj = useMemoryHungryObject(size, label)

  return (
    <View style={styles.box}>
      {obj && <WrappedMemoryHungryView object={obj} style={{ flex: 1 }} />}
    </View>
  )
}

// Wrapping in a function component is required to trigger the crash.
// React's logComponentRender (DEV profiling) diffs old vs new props only on
// function/class components, not host components. The deep diff traverses
// the HybridObject's properties (via for...in), accessing .label on the
// disposed object whose NativeState has been nulled.
function WrappedMemoryHungryView(
  props: React.ComponentProps<typeof MemoryHungryView>
) {
  return <MemoryHungryView {...props} />
}

export function DisposeReproScreen() {
  const [idx, setIdx] = useState(0)
  const current = OBJECTS[idx % OBJECTS.length]!

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('[DisposeRepro] auto-triggering rapid 3x')
      setIdx((i) => i + 1)
      setTimeout(() => setIdx((i) => i + 1), 500)
      setTimeout(() => setIdx((i) => i + 1), 1000)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nitro Dispose Crash Repro</Text>
      <Text style={styles.subtitle}>
        Current: {current.label} ({current.size / 1024 / 1024}MB)
      </Text>

      <HungryBox size={current.size} label={current.label} />

      <Pressable
        style={styles.button}
        onPress={() => setIdx((i) => i + 1)}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: '#e03030', marginTop: 12 }]}
        onPress={() => {
          setIdx((i) => i + 1)
          setTimeout(() => setIdx((i) => i + 1), 50)
          setTimeout(() => setIdx((i) => i + 1), 100)
        }}
      >
        <Text style={styles.buttonText}>Rapid 3x (crash)</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 80 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  box: { height: 200, borderWidth: 1, borderColor: 'red', marginBottom: 20 },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
