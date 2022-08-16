import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import styles from "../../../app.module.css";
import { Linking } from "react-native";
import { useCallback } from "react";
import { BackHandler } from "react-native";
// notice id로 해당 notice만 뽑아오기
import { ScrollView } from "react-native";

const handlePressBack = () => {
  if (navigation?.canGoBack()) {
    navigation.goBack()
    return true
  }
  return false 
}

export default function NoticeDetail({ navigation, route }) {

  // route.id 있으면 noticelist에서 id === 같은거 찾아서 사용

  // noticeList라고 가정.. 

  const id = route.params.id
  const item = noticeList.filter(item => item.id === id)

  const goEdussafy = useCallback(async () => {
    const destinationURL = 'https://edu.ssafy.com/edu/board/notice/list.do' 
    if (await Linking.canOpenURL(destinationURL)) await Linking.openURL(destinationURL)
  }, [])


  return (
    <View style={styles.detailcontainer}>
      <Text style={styles.titlecontainer}>Ssamy Says</Text>
      <View style={styles.detailbox}>
        <Text style={styles.detailtitle}>{item.title}</Text>
        <ScrollView>
          <Text style={styles.detaildescription}>{item.description}</Text>
        </ScrollView>
      </View> 

      <View style={styles.detailfooter}>

        <TouchableOpacity style={styles.buttonedussafy} onPress={goEdussafy}>
          <Text >에듀싸피로 이동</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonnotice} onPress={() => navigation.pop()}>
          <Text>돌아가기 ⬅ </Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailcontainer:{
    flex: 1,
    backgroundColor: "#fff"
  },
  titlecontainer: { 
    paddingTop: 30,
    paddingLeft: 20,
    paddingBottom: 15,
    textAlign: 'left',
    backgroundColor: "#5ba8ff",
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  detailbox : {
    margin: 20,
    flex: 0.9,
    backgroundColor: "#ededed",
    borderRadius: 20,
    padding: 20,
  },
  detailtitle : {
    fontSize: 30,
    textAlign: "center",
    margin: 15
  },
  detaildescription : {
    fontSize: 15,
    textAlign: "center",
    margin: 15,
  },

  detailfooter : {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 30,
    // marginHorizontal: 30,
  },
  
  buttonedussafy : {
    padding: 10,
    backgroundColor: "#5ba8ff",
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: "center"
  },

  buttonnotice : {
    padding: 10,
    backgroundColor: "#ffe34f",
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: "center"
  }
});