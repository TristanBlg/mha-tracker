import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { useLPContext } from "../context/lifepoint";

import ResetModal from "./ResetModal";
import InfoModal from "./InfoModal";
import HistoryModal from "./HistoryModal";

dayjs.extend(duration);

export default function ActionBar() {
  const [time, setTime] = useState(0);
  const [timeState, setTimeState] = useState(false);
  const { handleUndo, handleReset } = useLPContext();
  const [historyModalVisible, setHistoryVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

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

  const formattedTime = useMemo(
    () =>
      dayjs
        .duration({
          seconds: Math.floor(time % 60),
          minutes: Math.floor((time / 60) % 60),
          hours: Math.floor((time / 60 / 60) % 24),
        })
        .format("HH:mm:ss"),
    [time]
  );

  const handleSubmitReset = () => {
    setTimeState(false);
    setTime(0);
    handleReset();
    setResetModalVisible(!resetModalVisible);
  };
  const handleCancelReset = () => {
    setResetModalVisible(!resetModalVisible);
  };

  const handleCancelInfo = () => {
    setInfoModalVisible(!infoModalVisible);
  };
  const handleHistoryVisible = () => {
    setHistoryVisible(!historyModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.startWrapper}>
        <Pressable onPress={handleUndo}>
          <Fontisto name="undo" size={16} color="#ffffff" style={styles.icon} />
        </Pressable>
        <Pressable
          onPress={() => {
            setResetModalVisible(!resetModalVisible);
          }}
        >
          <MaterialIcons
            name="reset-tv"
            size={16}
            color="#ffffff"
            style={styles.icon}
          />
        </Pressable>
        <Pressable onPress={() => setHistoryVisible(true)}>
          <Entypo name="list" size={16} color="#ffffff" style={styles.icon} />
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
        <Pressable onPress={() => setInfoModalVisible(true)}>
          <MaterialIcons
            style={styles.icon}
            name="info-outline"
            size={16}
            color="#ffffff"
          />
        </Pressable>
      </View>
      <HistoryModal
        isOpen={historyModalVisible}
        onCancel={handleHistoryVisible}
      />
      <ResetModal
        isOpen={resetModalVisible}
        onSubmit={handleSubmitReset}
        onCancel={handleCancelReset}
      />
      <InfoModal isOpen={infoModalVisible} onCancel={handleCancelInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  startWrapper: {
    flexDirection: "row",
  },
  endWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timer: {
    // fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "400",
    color: "#ffffff",
    fontSize: 12,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
});
