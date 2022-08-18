import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Start({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem("Account", (err, result) => {
      if (result) {
        // 로컬의 계정 정보(id, pw, tokken)를 받아서 Redux에 저장
        dispatch({
          type: "Account/import",
          payload: JSON.parse(result),
        });
        dispatch({ type: "Account/mode", mode: "재인증" });
        AsyncStorage.getItem("Setting", (err, result) => {
          // 타입변경으로 저장된것이 있는 경우
          if (result) {
            dispatch({
              type: "Account/importType",
              payload: { typeName: JSON.parse(result).typeName },
            });
          }
        });
        // 메인화면으로 이동
        navigation.navigate("TabNav");
      } else {
        navigation.navigate("SignIn");
      }
    });
  }, []);
  return <Image source={require("../../../assets/splash.png")} />;
}

export default Start;
