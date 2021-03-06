import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

import { HistoryItem, useLPContext } from "../context/lifepoint";

type ResetModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

export default function HistoryModal({ isOpen, onCancel }: ResetModalProps) {
  const { history } = useLPContext();

  const renderItem = ({
    item: { player1, player2 },
    index,
  }: {
    item: HistoryItem;
    index: number;
  }) => {
    const renderFirstPlayerItem = () => {
      if (index > 0 && history[index - 1].player1 === player1) {
        return (
          <View
            style={[{ marginRight: 10 }, styles.item, styles.disabledItem]}
          />
        );
      } else {
        return (
          <View
            style={[{ backgroundColor: '#36b3a6', marginRight: 10 }, styles.item]}
          >
            <Text style={styles.text}>{player1}</Text>
          </View>
        );
      }
    };
    const renderSecondPlayerItem = () => {
      if (index > 0 && history[index - 1].player2 === player2) {
        return <View style={[styles.item, styles.disabledItem]} />;
      } else {
        return (
          <View
            style={[{ backgroundColor: '#d75238' }, styles.item]}
          >
            <Text style={styles.text}>{player2}</Text>
          </View>
        );
      }
    };
    return (
      <View style={styles.itemContainer}>
        {renderFirstPlayerItem()}
        {renderSecondPlayerItem()}
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      presentationStyle="fullScreen"
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onCancel}>
            <Fontisto name="close" size={24} color="#ffffff" />
          </Pressable>
        </View>
        <FlatList data={history} renderItem={renderItem} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    padding: 10,
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexDirection: "row",
    flex: 1,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 80,
    marginBottom: 10,
    borderRadius: 14,
    overflow: "hidden",
  },
  disabledItem: {
    backgroundColor: "rgba(65, 65, 65, 0.7)",
  },
  text: {
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 54,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
