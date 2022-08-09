import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../../app.module.css";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";

export default function UserDetail() {
  const dispatch = useDispatch();
  //기본 정보
  const user = useSelector((state) => {
    return state.Setting[0];
  });
  const [userBtn, setUserBtn] = useState(false);
  // 캠퍼스 종류 및 트랙 종류(드랍다운 피커를 위한 설정)
  const [openCampus, setOpenCampus] = useState(false);
  const [campus, setCampus] = useState(user.campus);
  const [campusItems, setCampusItems] = useState([
    { label: "부울경", value: "부울경" },
    { label: "서울", value: "서울" },
    { label: "대전", value: "대전" },
    { label: "구미", value: "구미" },
    { label: "광주", value: "광주" },
  ]);
  const [openTrack, setOpenTrack] = useState(false);
  const [track, setTrack] = useState(user.track);
  const [trackitems, setTrackItems] = useState([
    { label: "파이썬", value: "파이썬" },
    { label: "자바(비전공)", value: "자바(비전공)" },
    { label: "자바(전공)", value: "자바(전공)" },
    { label: "임베디드", value: "임베디드" },
    { label: "모바일", value: "모바일" },
  ]);

  // input에 넣어질 값들
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number);

  return (
    <View>
      <Text>{user.name}님의 페이지</Text>
      <View
        style={[styles.border, { height: 250, backgroundColor: "#E5F3F6" }]}
      >
        <View>
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>유저명: </Text>
            {!userBtn && <Text>{user.name}</Text>}
            {userBtn && (
              <TextInput
                placeholder="이름을 입력하세요"
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            )}
          </View>
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>기수: </Text>
            {!userBtn && <Text>{user.No} </Text>}
            {userBtn && (
              <TextInput
                style={{ width: 10 }}
                placeholder="기수를 입력하세요"
                onChangeText={(text) => {
                  setNumber(text);
                }}
              />
            )}
          </View>
          {/* 캠퍼스 선택 */}
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>소속 캠퍼스: </Text>
            {!userBtn && <Text>{user.campus} </Text>}
            {userBtn && (
              <View
                style={{
                  backgroundColor: "#171717",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 15,
                }}
              >
                <DropDownPicker
                  theme="DARK"
                  mode="BADGE"
                  badgeDotColors={[
                    "#e76f51",
                    "#00b4d8",
                    "#e9c46a",
                    "#e76f51",
                    "#8ac926",
                    "#00b4d8",
                    "#e9c46a",
                  ]}
                  open={openCampus}
                  value={campus}
                  items={campusItems}
                  setOpen={setOpenCampus}
                  setValue={setCampus}
                  setItems={setCampusItems}
                />
              </View>
            )}
          </View>
          {/* 트랙 선택 */}
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Text>소속 트랙: </Text>
            {!userBtn && <Text>{user.track} </Text>}
            {userBtn && (
              <DropDownPicker
                open={openTrack}
                value={track}
                items={trackitems}
                setOpen={setOpenTrack}
                setValue={setTrack}
                setItems={setTrackItems}
              />
            )}
          </View>
        </View>
        {/* 수정 활성화 버튼 */}
        {!userBtn && (
          <TouchableOpacity
            style={{ marginLeft: 300 }}
            onPress={() => {
              setUserBtn(!userBtn);
            }}
          >
            <FontAwesome name="pencil-square-o" size={24} color="black" />
            <Text>수정</Text>
          </TouchableOpacity>
        )}
        {/* 수정 버튼 */}
        {userBtn && (
          <View style={{ marginLeft: 300, flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.button, { margin: 3 }]}
              onPress={() => {
                dispatch({
                  type: "Setting/update",
                  payload: {
                    name: name,
                    number: number,
                    campus: campus,
                    track: track,
                  },
                });
                setUserBtn(!userBtn);
              }}
            >
              <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { margin: 3 }]}
              onPress={() => {
                setUserBtn(!userBtn);
              }}
            >
              <Text>취소</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
