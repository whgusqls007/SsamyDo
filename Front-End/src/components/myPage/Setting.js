import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import drf from "../../api/drf";
import axios from "axios";
import { Entypo, Feather } from "@expo/vector-icons";

export default function Setting({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.Account[2];
  });
  const user = useSelector((state) => {
    return state.Account[0];
  });

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
    <View style={settingStyles.settingContainer}>
      <View style={settingStyles.settingheader}>
        <View style={settingStyles.settingbox}>
          <Text style={settingStyles.settingtext}>✏️ 트랙 변경 </Text>
        </View>
        {/* 변경버튼과 완료버튼 */}
        {showTrackBtn ? (
          <View style={settingStyles.changeButtonbox}>
            <TouchableOpacity
              style={settingStyles.changebutton}
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
                    navigation.navigate("Verification");
                  });
              }}
            >
              <Text style={settingStyles.changebuttontext}>변경</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowTrackBtn(!showTrackBtn);
                setTrack(user.track);
              }}
              style={settingStyles.changebuttoncancel}
            >
              <Text style={settingStyles.changebuttontext}>취소</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Feather
            name="edit"
            onPress={() => {
              setShowTrackBtn(!showTrackBtn);
            }}
            size={20}
            color="#111111"
          />
        )}
      </View>
      {/* 트랙 변경 버튼들 */}
      {showTrackBtn && (
        <View style={settingStyles.updateContainer}>
          {trackName.map((tra, idx) => {
            return (
              <TouchableOpacity
                key={`track-${idx}`}
                style={[
                  settingStyles.trackButton,
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
      {!showTrackBtn && (
        <View style={settingStyles.contact}>
          <Entypo name="email" size={15} color="#888888" />
          <Text>{"  "}오류관련 문의 soshot33@gmail.com</Text>
        </View>
      )}
    </View>
  );
}

const settingStyles = StyleSheet.create({
  settingContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    marginBottom: "7%",
  },
  settingheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#888888",
    margin: "2%",
    paddingVertical: "2%",
    paddingRight: "2%",
    height: "34%",
  },
  settingtext: {
    fontSize: 15,
    marginLeft: "10%",
  },
  settingbox: {},
  changeButtonbox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  changebutton: {
    backgroundColor: "#A8D1FF",
    padding: "2%",
    marginLeft: "3%",
    marginBottom: "3%",
    borderRadius: 10,
    width: "27%",
    alignItems: "center",
    justifyContent: "center",
  },
  changebuttoncancel: {
    backgroundColor: "#ffffff",
    padding: "2%",
    marginLeft: "3%",
    marginBottom: "3%",
    borderRadius: 10,
    width: "27%",
    alignItems: "center",
    justifyContent: "center",
  },
  changebuttontext: {
    textAlign: "center",
    fontSize: 14,
  },
  updateContainer: {
    marginTop: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  trackButton: {
    backgroundColor: "#ffffff",
    padding: "1.5%",
    margin: "1%",
    borderRadius: 10,
  },
  contact: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
});
