import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Start({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem("User", (err, result) => {
      if (result) {
        navigation.navigate("TabNav");
        // 로컬의 사용자정보를 받아서 Redux에 저장하는 dispatch 필요
        // dispatch()
      } else {
        navigation.navigate("SignIn");
      }
    });
  }, []);
  return <Image source={require("../../../assets/splash.png")} />;
}

export default Start;
