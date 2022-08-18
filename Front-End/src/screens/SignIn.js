import { View, Text, TouchableOpacity, BackHandler, Alert } from "react-native";
import Agreement from "../components/signin/Agreement";
import styles from "../../app.module.css";
import { useEffect } from "react";

export default function SignIn({ navigation }) {

  useEffect(() => {
    const backAction = () => {
      Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
          style: "cancel"
        },
        { text: "확인", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
