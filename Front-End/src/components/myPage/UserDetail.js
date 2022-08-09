import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../../app.module.css";
import { TextInput } from "react-native-gesture-handler";

export default function UserDetail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.Setting[0];
  });
  const [userBtn, setUserBtn] = useState(false);
  const [userInput, setUserInput] = useState({});

  return (
    <View style={[styles.border, { height: 200, backgroundColor: "#E5F3F6" }]}>
      <Text>UserDetail.js</Text>
      <View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>유저명: </Text>
          {!userBtn && <Text>{user.name} 유저이름 </Text>}
          {userBtn && (
            <TextInput
              placeholder="이름을 입력하세요"
              onChangeText={(text) => {
                setUserInput({ ...userInput, ...{ name: text } });
              }}
            />
          )}
        </View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>기수: </Text>
          {!userBtn && <Text>{user.No} 유저기수 </Text>}
          {userBtn && (
            <TextInput
              placeholder="기수를 입력하세요"
              onChangeText={(text) => {
                setUserInput({ ...userInput, ...{ No: text } });
              }}
            />
          )}
        </View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>소속 캠퍼스: </Text>
          {!userBtn && <Text>{user.campus} 소속 캠퍼스 </Text>}
          {userBtn && (
            <TextInput
              placeholder="캠퍼스를 입력하세요"
              onChangeText={(text) => {
                setUserInput({ ...userInput, ...{ campus: text } });
              }}
            />
          )}
        </View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>소속 트랙: </Text>
          {!userBtn && <Text>{user.track} 소속 트랙 </Text>}
          {userBtn && (
            <TextInput
              placeholder="트랙을 입력하세요"
              onChangeText={(text) => {
                setUserInput({ ...userInput, ...{ track: text } });
              }}
            />
          )}
        </View>
      </View>
      {!userBtn && (
        <TouchableOpacity
          style={{ marginLeft: 300 }}
          onPress={() => {
            setUserBtn(!userBtn);
          }}
        >
          <FontAwesome name="pencil-square-o" size={24} color="black" />
        </TouchableOpacity>
      )}
      {userBtn && (
        <View style={{ marginLeft: 300, flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.button, { margin: 3 }]}
            onPress={() => {
              setUserBtn(!userBtn);
            }}
          >
            <Text>뒤로</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { margin: 3 }]}
            onPress={() => {
              setUserBtn(!userBtn);
            }}
          >
            <Text>뒤로</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
