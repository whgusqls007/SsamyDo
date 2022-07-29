import { View, Text, Button } from "react-native";
import Aggrement from "./Aggrement";
import Verification from "./Verification";
import styles from "../../../app.module.css";

export default function SignIn({ navigation }) {
  return (
    <View>
      <Text>SignIn.js</Text>
      <Aggrement />
      <Verification />
    </View>
  );
}
