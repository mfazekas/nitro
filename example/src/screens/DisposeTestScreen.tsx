import * as React from 'react'
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native'
import { HybridBase, TestView, type Base } from 'react-native-nitro-test'
import { callback } from 'react-native-nitro-modules'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '../useColors'

function ChildWithHybridView({
  hybridData,
  onLog,
  onDispose,
}: {
  hybridData: Base
  onLog: (msg: string) => void
  onDispose: () => void
}) {
  const dataName = React.useRef(hybridData.name)

  React.useEffect(() => {
    onLog(`MOUNT - HybridView with hybridData: ${dataName.current}`)
    return () => {
      onLog('DISPOSE - calling hybridData.dispose()...')
      try {
        hybridData.dispose()
        onDispose()
        onLog('DISPOSE - success!')
      } catch (e) {
        onLog(`DISPOSE - ERROR: ${e}`)
      }
    }
  }, [hybridData, onLog, onDispose])

  return (
    <View style={styles.childContainer}>
      <Text>HybridView with hybridData prop:</Text>
      <TestView
        style={styles.testView}
        isBlue={true}
        hasBeenCalled={false}
        colorScheme="light"
        someCallback={callback(() => { })}
        hybridData={hybridData}
      />
    </View>
  )
}

export function DisposeTestScreen() {
  const safeArea = useSafeAreaInsets()
  const colors = useColors()
  const [hybridData, setHybridData] = React.useState<Base | null>(null)
  const [showChild, setShowChild] = React.useState(true)
  const [log, setLog] = React.useState<string[]>([])
  const [isDisposed, setIsDisposed] = React.useState(false)

  const addLog = React.useCallback((msg: string) => {
    setLog((prev) => [
      ...prev,
      `${new Date().toISOString().slice(11, 19)}: ${msg}`,
    ])
  }, [])

  const createObject = () => {
    addLog(`Created HybridBase: ${HybridBase.name}`)
    setHybridData(HybridBase)
    setIsDisposed(false)
  }

  const handleDispose = React.useCallback(() => {
    setIsDisposed(true)
  }, [])

  const toggleChild = () => {
    addLog(`Toggling child: ${showChild ? 'hide' : 'show'}`)
    setShowChild((s) => !s)
  }

  return (
    <View style={[styles.container, { paddingTop: safeArea.top }]}>
      <Text style={styles.header}>Dispose Test</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Test dispose() on HybridObject passed to HybridView
      </Text>

      <View style={styles.buttons}>
        <Button title="Create Object" onPress={createObject} />
        <Button
          title={showChild ? 'Hide Child' : 'Show Child'}
          onPress={toggleChild}
        />
        <Button title="Clear Log" onPress={() => setLog([])} />
      </View>

      <View style={styles.status}>
        <Text>
          Object: {hybridData ? (isDisposed ? '(disposed)' : hybridData.name) : 'null'}
        </Text>
        <Text>Show Child: {showChild ? 'yes' : 'no'}</Text>
      </View>

      {showChild && hybridData && !isDisposed && (
        <ChildWithHybridView
          hybridData={hybridData}
          onLog={addLog}
          onDispose={handleDispose}
        />
      )}

      <View style={styles.logContainer}>
        <Text style={styles.logHeader}>Log:</Text>
        <ScrollView>
          {log.map((entry, i) => (
            <Text key={i} style={styles.logEntry}>
              {entry}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  description: {
    fontSize: 14,
    paddingBottom: 15,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  status: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 15,
  },
  childContainer: {
    padding: 15,
    backgroundColor: '#e0f0e0',
    borderRadius: 8,
    marginBottom: 15,
  },
  testView: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  logContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  logHeader: {
    color: '#888',
    marginBottom: 5,
  },
  logEntry: {
    color: '#0f0',
    fontFamily: 'monospace',
    fontSize: 12,
  },
})
