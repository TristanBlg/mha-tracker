import { useState, useEffect } from "react";
import {
  StyleSheet,
  Pressable,
  ImageBackground,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { useLPContext, PlayersUnion } from "../context/lifepoint";
import HitArea from "./HitArea";

interface CardProps {
  player: PlayersUnion;
  image: { uri: string };
  style?: ViewStyle;
}
export default function Card({ image, style, player }: CardProps) {
  const { history, setHistory } = useLPContext();

  const lastHistoryItem = history[history.length - 1];
  const lp = lastHistoryItem[player];

  const handleLp = (newLp: number) => {
    setHistory((prev) => {
      const lastItem = prev[prev.length - 1];
      return [...prev, { ...lastItem, [player]: newLp }];
    });
  };
  
  return (
    <View style={[styles.container, style]}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        imageStyle={styles.image}
        style={styles.imageBackground}
      >
        <Pressable
          onPress={() => {
            handleLp(lp - 1);
          }}
          onLongPress={() => {
            handleLp(lp - 5);
          }}
          style={({ pressed }) => [
            styles.clickableZone,
            {
              right: "50%",
              backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
            },
          ]}
        />
        <Pressable
          onPress={() => {
            handleLp(lp + 1);
          }}
          onLongPress={() => {
            handleLp(lp + 5);
          }}
          style={({ pressed }) => [
            styles.clickableZone,
            {
              left: "50%",
              backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
            },
          ]}
        />

        <View />
        <Text style={styles.textCount}>{lp}</Text>
        <HitArea player={player} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    positon: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 10,
  },
  image: {
    opacity: 0.7,
  },
  textCount: {
    // fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 120,
    color: "#FFFFFF",
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  clickableZone: {
    flex: 1,
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
