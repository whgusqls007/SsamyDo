import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import NoticeList from "../components/notice/NoticeList";
import styles from "../../app.module.css";
// import { useState, useEffect } from "react";
// import { useDispatch, useState } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import SearchBar from "react-native-platform-searchbar";

export default function Notice({ navigation }) {
  const [showNotice, setShowNotice] = useState("All");
  const [value, setValue] = useState("");

  // console.log(value)

  // console.log(showNotice)

  return (
    
    <View>
      <Text>새미가 알려주는 공지</Text>
      <KeyboardAvoidingView>
        <View>
          <SearchBar
            placeholder={"공지를 검색하세요."}
            value={value}
            onChangeText={setValue}
            onSubmitEditing={()=>navigation.navigate("NoticeSearch", { value: value })}
          />
        </View>
      </KeyboardAvoidingView>
      <View>
        <View style={[{ flexDirection: "row", margin: 5 }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowNotice("All")}
          >
            <Text>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowNotice("MM")}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="ellipse-sharp" size={10} color="blue" />
              <Text>mm</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowNotice("Edu")}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="ellipse-sharp" size={10} color="red" />
              <Text>edu</Text>
            </View>
          </TouchableOpacity>
        </View>
        <NoticeList navigation={navigation} select={showNotice} />
      </View>
    </View>
  );
}
