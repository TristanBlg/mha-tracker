import { StyleSheet, View, Text, Pressable, Modal } from "react-native";

type ResetModalProps = {
  isOpen: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function ResetModal({
  isOpen,
  onSubmit,
  onCancel,
}: ResetModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.section}>
            <Text style={styles.title}>
              Current state of the game will be reset
            </Text>
          </View>
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.buttonReset]}
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    margin: 20,
    backgroundColor: "#111111",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  section: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 20,
    textAlign: "left",
    color: "#ffffff",
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    borderRadius: 14,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  buttonReset: {
    backgroundColor: "#C44A45",
    borderWidth: 2,
    borderColor: "#C44A45",
    marginRight: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
