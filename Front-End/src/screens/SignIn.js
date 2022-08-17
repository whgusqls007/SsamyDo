import { View, Text, TouchableOpacity } from "react-native";
import Agreement from "../components/signin/Agreement";
import styles from "../../app.module.css";

export default function SignIn({ navigation }) {
  return (
    <View>
      <Agreement navigation={navigation} />
      <TouchableOpacity
        style={[styles.button, { margin: 10 }]}
        onPress={() => navigation.navigate("TabNav")}
      >
        <Text>Main</Text>
      </TouchableOpacity>
    </View>
  );
}
