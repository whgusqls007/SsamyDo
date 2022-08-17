import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import UserDetail from "../components/myPage/UserDetail";
import Setting from "../components/myPage/Setting";
import styles from "../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import drf from "../api/drf";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={MyPageStyles.mypage}>MyPage</Text>
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

const MyPageStyles = StyleSheet.create({
  mypage: {
    marginTop: "5%",
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: "2%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
