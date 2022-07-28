import { View, Text } from "react-native";
import MMLogin from "./MMLogin";
import EduLogin from "./EduLogin";
import styles from "../../../app.module.css";

export default function Verification() {
  return (
    <View>
      <Text>Verification.js </Text>
      <MMLogin />
      <EduLogin />
    </View>
  );
}
