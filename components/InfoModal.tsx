import * as Application from 'expo-application';
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";

type InfoModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

export default function InfoModal({ isOpen, onCancel }: InfoModalProps) {
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
            <Text style={styles.title}>Submit Feedback</Text>
            <Text style={styles.text}>jeu.tristanboulanger@gmail.com</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Version</Text>
            <Text style={styles.text}>{Application.nativeApplicationVersion}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Legal</Text>
            <Text style={styles.text}>
              This app is unofficial Fan Content permitted under the Fan Content
              Policy.
            </Text>
            <Text style={styles.text}>
              Not approved/endorsed by Jasco Games.
            </Text>
            <Text style={styles.text}>
              Portions of the
              materials used are property of Jasco Games. ©JASCO GAMES LLC.
            </Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
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
  text: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    textAlign: "left",
    color: "#ffffff",
  },
  button: {
    borderRadius: 14,
    padding: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
