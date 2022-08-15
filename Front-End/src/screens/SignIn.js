import { View, Text, TouchableOpacity } from "react-native";
import Aggrement from "../components/signin/Aggrement";
import styles from "../../app.module.css";

export default function SignIn({ navigation }) {
  return (
    <View>
      <Aggrement navigation={navigation} />
      <TouchableOpacity
        style={[styles.button, { margin: 10 }]}
        onPress={() => navigation.navigate("TabNav")}
      >
        <Text>Main</Text>
      </TouchableOpacity>
    </View>
  );
}
