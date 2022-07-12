import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { useLPContext } from "../context/lifepoint";

dayjs.extend(duration);

export default function ActionBar() {
  const [time, setTime] = useState(0);
  const [timeState, setTimeState] = useState(false);
  const { handleUndo, handleReset } = useLPContext();

  useEffect(() => {
    let interval: NodeJS.Timer | undefined;

    if (timeState) {
      interval = setInterval(() => {
        setTime((prev) => (prev += 1));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeState]);

  const formattedTime = dayjs
    .duration({
      seconds: Math.floor(time % 60),
      minutes: Math.floor((time / 60) % 60),
      hours: Math.floor((time / 60 / 60) % 24),
    })
    .format("HH:mm:ss");

  return (
    <View style={styles.container}>
      <View style={styles.startWrapper}>
        <Pressable onPress={handleUndo}>
          <Fontisto name="undo" size={16} color="white" style={styles.icon} />
        </Pressable>
        {/* <Pressable onPress={() => console.log("onPress history")}>
          <Entypo name="list" size={16} color="white" style={styles.icon} />
        </Pressable> */}
        <Pressable onPress={handleReset}>
          <MaterialIcons
            name="reset-tv"
            size={16}
            color="white"
            style={styles.icon}
          />
        </Pressable>
      </View>
      <View style={styles.endWrapper}>
        <Pressable
          onPress={() => {
            setTimeState((prev) => !prev);
          }}
          onLongPress={() => {
            setTimeState(false);
            setTime(0);
          }}
        >
          <Text style={styles.timer}>{formattedTime}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 10,
  },
  startWrapper: {
    flexDirection: "row",
  },
  endWrapper: {},
  timer: {
    // fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "400",
    color: "white",
    fontSize: 12,
  },
  icon: {
    marginRight: 20,
  },
});
