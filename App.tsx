import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";

import { HitProvider } from "./context/hit";
import { LPProvider } from "./context/lifepoint";

import Home from "./views/Home";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <LPProvider>
          <HitProvider>
            <View style={styles.container}>
              <Home />
            </View>
          </HitProvider>
        </LPProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#111111",
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
