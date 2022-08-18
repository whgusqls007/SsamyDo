import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import UserDetail from "../components/myPage/UserDetail";
import Setting from "../components/myPage/Setting";
import { useDispatch } from "react-redux";

export default function MyPage({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={myPageStyles.myPageContainer}>
      <View style={myPageStyles.myPageHeader}>
        <Image
          source={require("../images/mypage_header.png")}
          style={myPageStyles.imageicon}
        />
      </View>
      <View style={myPageStyles.myPageBody}>
        <UserDetail />
      </View>
      <View style={myPageStyles.myPageFooter}>
        <Setting />
        <TouchableOpacity
          style={myPageStyles.deleteBtn}
          onPress={() => {
            dispatch({ type: "Account/mode", mode: "탈퇴" });
            navigation.navigate("Verification");
          }}
        >
          <Text style={myPageStyles.deleteBtnText}>계정 삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const myPageStyles = StyleSheet.create({
  myPageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  myPageHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "1%",
    paddingBottom: "2%",
    backgroundColor: "#5ba8ff",
  },
  imageicon: {
    height: "58%",
    resizeMode: "contain",
    marginTop: "9%",
    marginLeft: "28%",
  },
  myPageBody: {
    flex: 3,
    width: "100%",
    paddingBottom: "2%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#5ba8ff",
  },
  myPageFooter: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "5%",
    backgroundColor: "#ffffff",
  },
  deleteBtn: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#C22D37",
  },
  deleteBtnText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
