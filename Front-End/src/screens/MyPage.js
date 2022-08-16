import { View, Text, TouchableOpacity } from "react-native";
import UserDetail from "../components/myPage/UserDetail";
import Setting from "../components/myPage/Setting";
import styles from "../../app.module.css";
import { useDispatch } from "react-redux";

export default function MyPage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View>
      <UserDetail />
      <Setting />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch({ type: "Account/mode", mode: "탈퇴" });
          navigation.navigate("Verification");
        }}
      >
        <Text>탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
}
