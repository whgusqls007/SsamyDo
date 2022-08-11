import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


function Start({ navigation }) {
  const dispatch = useDispatch();
  useEffect(()=>{ 
  }
  )
  
  return (
    

    <View style={styles.back}>
      <Text style={styles.ssamydo}>SSAMY DO!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TabNav")}
      >
        <Text>Main</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          AsyncStorage.removeItem("TodoStatus");
        }}
      >
        <Text>로컬 삭제</Text>
      </TouchableOpacity>
      <Text style={styles.container}></Text>
    </View>
  );
}

export default Start;
