import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Foundation } from "@expo/vector-icons";
// import styles from "../../../app.module.css";
import { useState } from "react";
import drf from "../../api/drf";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import CustomCalendar from "../calendar/CustomCalendar";

// import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

export default function Setting({ navigation }) {

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
    <View style={styles.settingContainer}>
      <View style={styles.settingheader}>
        <View style={styles.settingbox}>
          <Text style={styles.settingtext}>✏️   트랙 변경 </Text>
        </View>
        
        {/* 변경버튼과 완료버튼 */}
        {showTrackBtn ? (
          <View style={styles.changeButtonbox}>
            <TouchableOpacity
              style={styles.changebutton}
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
              <Text style={styles.changebuttontext}>변경</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowTrackBtn(!showTrackBtn);
                setTrack(user.track);
              }}
              style={styles.changebuttoncancel}
            >
              <Text style={styles.changebuttontext}>취소</Text>
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
            color="#5ba8ff"
          />
        )}
      </View>

      {/* <View style={styles.cs}>
        <Entypo name="email" size={20} color="#A8D1FF" />
        <Text>{"  "}기타 문의: ssafy@ssafy.com </Text>
      </View> */}
      {/* 트랙 변경 버튼들 */}
      {showTrackBtn && (
        <View style={styles.updateContainer}>
          {trackName.map((tra, idx) => {
            return (
              <TouchableOpacity
                key={`track-${idx}`}
                style={[styles.trackButton,
                  idx === track ? { backgroundColor: "#A8D1FF" } : {},
                ]}
                // style={[
                //   SettingStyle.buttonTrack,
                //   idx === track ? { backgroundColor: "#A8D1FF" } : {},
                // ]}
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
        <View style={styles.cs}>
          <Entypo name="email" size={20} color="#A8D1FF" />
          <Text>{"  "}기타 문의: ssafy@ssafy.com </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    marginTop: "3%",
    width: "95%",
    height: "25%",
    // borderWidth: 1,
    // marginBottom: "5%",
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    marginBottom: "5%",
  },
  settingheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#A8D1FF",
    margin: "2%",
    height: "30%",
  },
  settingtext : {
    fontSize: 15,
    marginLeft: "10%"
  },
  settingbox: {

  },
  changeButtonbox : {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },

  changebutton : {
    backgroundColor: "#A8D1FF",
    padding: "2%",
    marginLeft: "3%",
    marginBottom: "3%",
    borderRadius: 15,
    width: "27%",
    // height: "40%",
    alignItems: "center",
    justifyContent: "center"

  },

  changebuttoncancel: {
    backgroundColor: "#ffffff",
    padding: "2%",
    marginLeft: "3%",
    marginBottom: "3%",
    borderRadius: 15,
    width: "27%",
    // height: "40%",
    alignItems: "center",
    justifyContent: "center"

  },

  changebuttontext :{
    textAlign : "center",
    fontSize: 14,
  },

  updateContainer: {
    marginTop: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"

  },
  trackButton : {
    backgroundColor: "#ffffff",
    padding: "2%",
    margin: "1%",
    borderRadius: 10,
    
  },
  cs : {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  }



  // buttonContainer: { flexDirection: "row", justifyContent: "flex-end" },

  // button: {
  //   alignItems: "center",
  //   backgroundColor: "#EDEDED",
  //   padding: "5%",
  //   margin: "1%",
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: "#A8D1FF",
  //   justifyContent: "center",
  // },
  // buttonTrack: {
  //   alignItems: "center",
  //   backgroundColor: "#EDEDED",
  //   padding: "1%",
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: "#A8D1FF",
  //   justifyContent: "center",
  // },

  // input: {
  //   alignItems: "center",
  //   backgroundColor: "#EDEDED",
  //   padding: "2%",
  //   margin: "2%",
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: "#A8D1FF",
  //   justifyContent: "center",
  // },

  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22,
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 25,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
});
