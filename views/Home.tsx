import { useKeepAwake } from "expo-keep-awake";
import { StyleSheet, View } from "react-native";

import ActionBar from "../components/ActionBar";
import Card from "../components/Card";
import { PLAYERS } from "../context/lifepoint";

export default function Home() {
  useKeepAwake();

  return (
    <View style={styles.container}>
      <Card
        player={PLAYERS.player1}
        style={{ backgroundColor: '#36b3a6', transform: [{ rotateY: "0deg" }, { rotateZ: "180deg" }] }}
      />
      <ActionBar />
      <Card
        player={PLAYERS.player2}
        style={{ backgroundColor: '#d75238' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
