import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View } from "react-native";

import { HitProvider } from "./context/hit";
import { LPProvider } from "./context/lifepoint";

import Home from "./views/Home";

export default function App() {
  return (
    <View style={styles.safeArea}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <LPProvider>
          <HitProvider>
            <View style={styles.container}>
              <Home />
            </View>
          </HitProvider>
        </LPProvider>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#212121",
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
