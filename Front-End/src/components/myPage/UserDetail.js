import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import {
  FontAwesome,
  Fontisto,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";

export default function UserDetail() {
  //기본 정보
  const user = useSelector((state) => {
    return state.Account[0];
  });

  // 기수, 캠퍼스, 트랙 명 변수
  const campusName = ["광주", "구미", "대전", "서울", "부울경"];
  const trackName = [
    "파이썬",
    "자바(비전공)",
    "자바(전공)",
    "임베디드",
    "모바일",
  ];

  return (
    <View style={styles.userContainer}>
      <View style={styles.studentcard}>
        {/* 이름 */}
        <View style={styles.nameContainer}>
          <Text style={styles.nametext}>Student Card</Text>
        </View>
        {/* 인적사항 */}
        <View style={styles.detailContainer}>
          <View style={styles.detailimg}>
            {/* 이미지파일 */}
            <Image
              style={styles.img}
              source={require("../../images/ssamy.png")}
            />
          </View>

          {/* 인적사항 */}
          <View style={styles.detail}>
            {/* 이름 */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.detailTextName}>{user.name} </Text>
            </View>
            {/* 학번 */}
            <View style={styles.detailBox}>
              <Ionicons style={styles.detailText} name="school" size={16} />
              <Text style={styles.detailText}>{user.studentNo}</Text>
            </View>
            {/* 이메일 */}

            <View style={styles.detailBox}>
              <Fontisto style={styles.detailText} name="email" size={16} />
              <Text style={styles.detailText}>{user.email}</Text>
            </View>
            {/* 기수 */}

            <View style={styles.detailBox}>
              <FontAwesome style={styles.detailText} name="flag" size={16} />
              <Text style={styles.detailText}>
                {`SSAFY ${user.studentNo[1]}기`}
              </Text>
            </View>
            {/* 캠퍼스*/}
            <View style={styles.detailBox}>
              <FontAwesome5
                style={styles.detailText}
                name="building"
                size={16}
              />
              <Text style={styles.detailText}>
                {campusName[Number(user.studentNo[2]) - 1]} 캠퍼스 소속
              </Text>
            </View>
            {/* 트랙 선택 */}

            <View style={styles.detailBox}>
              <FontAwesome5 style={styles.detailText} name="road" size={16} />
              <Text style={styles.detailText}>{trackName[user.track]}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  studentcard: {
    height: "90%",
    width: "90%",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  nameContainer: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: "3%",
    backgroundColor: "#a8d1ff",
    alignItems: "center",
  },
  nametext: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#111111",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  detailimg: {
    width: "40%",
    height: "60%",
  },
  img: {
    position: "relative",
    width: "100%",
    height: "100%",
    marginLeft: "2%",
    overflow: "visible",
    alignItems: "center",
  },
  detail: {
    marginLeft: "5%",
    flexDirection: "column",
  },
  detailBox: {
    flexDirection: "row",
    paddingLeft: "2%",
  },

  detailText: {
    marginVertical: "2.5%",
    marginHorizontal: "2%",
    color: "#555555",
  },
  detailTextName: {
    marginTop: "2.5%",
    marginBottom: "3%",
    marginHorizontal: "2%",
    color: "#111111",
    fontWeight: "bold",
    fontSize: 20,
  },
});
