import { View, Text, Button } from "react-native";
import styles from "../../../app.module.css";

function Start({ navigation }) {
  return (
    <View style={styles.back}>
      <Text style={styles.ssamydo}>SSAMY DO!</Text>
      <Button title="Main" onPress={() => navigation.navigate("TabNav")} />
      <Text style={styles.container}></Text>
    </View>
  );
}

export default Start;
