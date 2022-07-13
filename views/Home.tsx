import { StyleSheet, View } from "react-native";

import player1bg from "../assets/player-background/player-1.jpg";
import player2bg from "../assets/player-background/player-2.jpg";

import ActionBar from "../components/ActionBar";
import Card from "../components/Card";
import { PLAYERS } from "../context/lifepoint";

export default function Home() {
  return (
    <View style={styles.container}>
      <Card
        player={PLAYERS.player1}
        image={player1bg}
        style={{ transform: [{ rotateY: "0deg" }, { rotateZ: "180deg" }] }}
      />
      <ActionBar />
      <Card player={PLAYERS.player2} image={player2bg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
