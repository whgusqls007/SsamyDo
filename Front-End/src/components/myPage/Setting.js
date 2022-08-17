import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Foundation } from "@expo/vector-icons";
import styles from "../../../app.module.css";
import { useState } from "react";
import drf from "../../api/drf";
import axios from "axios";

export default function Alarm() {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.Account[2];
  });
  const user = useSelector((state) => {
    return state.Account[0];
  });
  const typeList = useSelector((state) => {
    return state.Account[3];
  });
  const [showBtn, setShowBtn] = useState(false);
  const [typeOne, setTypeOne] = useState(typeList[1]);
  const [typeTwo, setTypeTwo] = useState(typeList[2]);
  // 표시할 트랙명들
  const trackName = [
    "파이썬",
    "자바(비전공)",
    "자바(전공)",
    "임베디드",
    "모바일",
  ];
  // axios로 보낼 트랙명들
  const inputTrackName = ["Python", "Javab", "Java", "Embedded", "Mobile"];
  // 트랙 변경 변수들
  const [track, setTrack] = useState(user.track);
  const [showTrackBtn, setShowTrackBtn] = useState(false);

  return (
    <View style={SettingStyle.back}>
      <View style={SettingStyle.lineContainer}>
        <Text>트랙변경</Text>
        {/* 변경버튼과 완료버튼 */}
        {showTrackBtn ? (
          <View style={SettingStyle.buttonContainer}>
            <TouchableOpacity
              style={SettingStyle.button}
              onPress={() => {
                axios({
                  method: "POST",
                  url: drf.user.track(),
                  data: { name: inputTrackName[track] },
                  headers: token,
                })
                  .then(() => {
                    dispatch({ type: "Account/update", track: track });
                    setShowTrackBtn(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Text>변경</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowTrackBtn(!showTrackBtn);
                setTrack(user.track);
              }}
              style={SettingStyle.button}
            >
              <Text>취소</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Foundation
            name="clipboard-pencil"
            onPress={() => {
              setShowTrackBtn(!showTrackBtn);
              setShowBtn(false);
            }}
            size={24}
            color="#A8D1FF"
          />
        )}
      </View>
      {/* 트랙 변경 버튼들 */}
      {showTrackBtn && (
        <View style={[SettingStyle.lineContainer, { borderBottomWidth: 0 }]}>
          {trackName.map((tra, idx) => {
            return (
              <TouchableOpacity
                key={`track-${idx}`}
                style={[
                  SettingStyle.button,
                  idx === track ? { backgroundColor: "#A8D1FF" } : {},
                ]}
                onPress={() => {
                  setTrack(idx);
                }}
              >
                <Text>{tra}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <View style={SettingStyle.lineContainer}>
        <Text>
          스케쥴 타입명: {typeList[0]} / {typeList[1]} / {typeList[2]}{" "}
        </Text>
        {/* 변경버튼과 완료버튼 */}
        {showBtn ? (
          <View style={SettingStyle.buttonContainer}>
            <TouchableOpacity style={SettingStyle.button}>
              <Text>변경</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowBtn(!showBtn);
                setTypeOne(typeList[1]);
                setTypeTwo(typeList[2]);
              }}
              style={SettingStyle.button}
            >
              <Text>취소</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Foundation
            name="clipboard-pencil"
            onPress={() => {
              setShowBtn(!showBtn);
              setShowTrackBtn(false);
            }}
            size={24}
            color="#A8D1FF"
          />
        )}
      </View>
      {showBtn && (
        <View
          style={[SettingStyle.lineContainer, { justifyContent: "flex-start" }]}
        >
          <Text style={[SettingStyle.input, { borderWidth: 0 }]}>
            {typeList[0]}
          </Text>
          <TextInput
            maxLength={8}
            autoCapitalize="none"
            value={typeOne}
            onChangeText={(text) => {
              setTypeOne(text);
            }}
            style={SettingStyle.input}
          />
          <TextInput
            maxLength={8}
            autoCapitalize="none"
            value={typeTwo}
            onChangeText={(text) => {
              setTypeTwo(text);
            }}
            style={SettingStyle.input}
          />
        </View>
      )}
    </View>
  );
}

const SettingStyle = StyleSheet.create({
  back: {
    width: "95%",
    height: "30%",
    borderWidth: 1,
    marginBottom: "5%",
    backgroundColor: "#EDEDED",
    borderRadius: 5,
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#A8D1FF",
    margin: "2%",
    height: "25%",
  },
  buttonContainer: { flexDirection: "row", justifyContent: "flex-end" },

  button: {
    alignItems: "center",
    backgroundColor: "#EDEDED",
    padding: "1%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A8D1FF",
    justifyContent: "center",
  },

  input: {
    alignItems: "center",
    backgroundColor: "#EDEDED",
    padding: "2%",
    margin: "2%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A8D1FF",
    justifyContent: "center",
  },
});
