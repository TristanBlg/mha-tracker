import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

import upPath from "../assets/hit-area/up.png";
import middlePath from "../assets/hit-area/mid.png";
import bottomPath from "../assets/hit-area/down.png";
import damagePath from "../assets/hit-area/damage.png";

import { useHitContext, PlayersUnion, Area, HitItem } from "../context/hit";

interface CardProps {
  player: PlayersUnion;
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HitArea({ player }: CardProps) {
  const { hit, handleSubmitPlayerHit, handleResetHit, handleUpdatePlayerHit } =
    useHitContext();

  const playerHit = hit[player];

  const handleFullDamage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handleSubmitPlayerHit(player, playerHit.damage);
  };
  const handleHalfDanage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handleSubmitPlayerHit(player, Math.ceil(playerHit.damage / 2));
  };
  const handleResetPlayerHit = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handleResetHit(player);
  };
  const handlePlayerHit = (hit: Partial<HitItem>) => {
    handleUpdatePlayerHit(player, hit);
  };

  const getAreaPath = (area: Area): { uri: string } => {
    switch (area) {
      case "up":
        return upPath;

      case "middle":
        return middlePath;

      case "bottom":
        return bottomPath;
    }
  };

  return (
    <View style={styles.container}>
      {playerHit.area ? (
        <View style={styles.damage}>
          <View style={styles.damageAmount}>
            <View style={styles.speedAndDamage}>
              <ImageBackground
                source={getAreaPath(playerHit.area)}
                resizeMode="contain"
                style={styles.imageBackground}
              >
                <Text
                  style={[
                    { transform: [{ translateX: -7}, {translateY: -1 }] },
                    styles.textDamage,
                  ]}
                >
                  {playerHit.speed}
                </Text>
              </ImageBackground>
              <Pressable
                onPress={() => handlePlayerHit({ speed: playerHit.speed - 1 })}
                style={({ pressed }) => [
                  styles.clickableZone,
                  {
                    right: "50%",
                    backgroundColor: pressed
                      ? "rgba(0, 0, 0, 0.1)"
                      : "transparent",
                  },
                ]}
              />
              <Pressable
                onPress={() => handlePlayerHit({ speed: playerHit.speed + 1 })}
                style={({ pressed }) => [
                  styles.clickableZone,
                  {
                    left: "50%",
                    backgroundColor: pressed
                      ? "rgba(0, 0, 0, 0.1)"
                      : "transparent",
                  },
                ]}
              />
            </View>
            <View
              style={{ height: "60%", width: 1, backgroundColor: "#ffffff" }}
            />
            <View style={styles.speedAndDamage}>
              <ImageBackground
                source={damagePath}
                resizeMode="contain"
                style={styles.imageBackground}
              >
                <Text
                  style={[
                    { transform: [{ translateY: -6 }, { translateX: -1 }] },
                    styles.textDamage,
                  ]}
                >
                  {playerHit.damage}
                </Text>
              </ImageBackground>
              <Pressable
                onPress={() =>
                  handlePlayerHit({ damage: playerHit.damage - 1 })
                }
                style={({ pressed }) => [
                  styles.clickableZone,
                  {
                    right: "50%",
                    backgroundColor: pressed
                      ? "rgba(0, 0, 0, 0.1)"
                      : "transparent",
                  },
                ]}
              />
              <Pressable
                onPress={() =>
                  handlePlayerHit({ damage: playerHit.damage + 1 })
                }
                style={({ pressed }) => [
                  styles.clickableZone,
                  {
                    left: "50%",
                    backgroundColor: pressed
                      ? "rgba(0, 0, 0, 0.1)"
                      : "transparent",
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.damageActions}>
            <Pressable style={styles.pressable} onPress={handleFullDamage}>
              <Text style={styles.textFullHit}>FULL</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={handleHalfDanage}>
              <Text style={styles.textHalfHit}>HALF</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={handleResetPlayerHit}>
              <Text style={styles.textResetHit}>BLOCKED</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.area}>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              handlePlayerHit({ area: "up" });
            }}
          >
            <Image source={upPath} style={styles.areaImage} />
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              handlePlayerHit({ area: "middle" });
            }}
          >
            <Image source={middlePath} style={styles.areaImage} />
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              handlePlayerHit({ area: "bottom" });
            }}
          >
            <Image source={bottomPath} style={styles.areaImage} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
    zIndex: 10,
    backgroundColor: "rgba(17, 17, 17, 0.8)",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  area: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  damage: {},
  damageAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  speedAndDamage: {
    position: "relative",
    height: "100%",
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    height: 54,
    width: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  damageActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  areaImage: {
    width: 54,
    height: 54,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
  textFullHit: {
    // fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 20,
    color: "#FFE400",
    textShadowColor: '#C44A45',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  textHalfHit: {
    // fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 20,
    color: "#ffffff",
    textShadowColor: '#C44A45',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  textResetHit: {
    // fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 20,
    color: "#ffffff",
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  textDamage: {
    // fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 24,
    color: "#ffffff",
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
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
