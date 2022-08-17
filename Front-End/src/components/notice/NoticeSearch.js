import { View, Text, ScrollView, TouchableOpacity,
KeyboardAvoidingView, StyleSheet } from "react-native";
// import styles from "../../../app.module.css";
import NoticeItem from "./NoticeItem";


// Notice data에서 찾기 .. 


export default function NoticeSearch({ navigation, route }){
  const value = route.params.value
  const noticeList = route.params.noticeList
  // console.log(value)
  // console.log('필터링된애들')
  const searchNotice = noticeList.filter(notice => notice.title.includes(value))
  // console.log(searchNotice)

  const search = String.fromCodePoint(0x1F50E)

  if (searchNotice.length !== 0) {
    return (
      <View style={styles.searchcontainer} >
        <View style={styles.titlecontainer}>
          <Text style={styles.titletext}>Ssamy Says</Text>
        </View>
        
        <Text style={styles.searchbox}>{search}  "{value}" 검색 결과입니다.</Text>

        <View style={styles.resultcontainer}>
          <View style={styles.resultbox}>
            <ScrollView>
              {searchNotice.map((notice)=>(
                <NoticeItem key={notice.id} notice={notice} navigation={navigation} />
              ))}        
            </ScrollView>
          </View>

          <View style={styles.buttonbar}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Notice")}>
              <Text>공지로 돌아가기</Text>
            </TouchableOpacity>
          </View>
        </View>

    </View>
    );  
  }
  else {
    return (
      <View style={styles.searchcontainer}>
        <View style={styles.titlecontainer}>
          <Text style={styles.titletext}>Ssamy Says</Text>
        </View>

        <View style={styles.failresult}>
          <Text style={styles.searchbox}>{search}  "{value}" 검색 결과가 없습니다. </Text>
          
          <View style={styles.buttonbar}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Notice")}>
              <Text>공지로 돌아가기</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    )
  }
};

const styles = StyleSheet.create({
  searchcontainer : {
    flex: 1,
    backgroundColor: "#fff"
  },

  titlecontainer : {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'column',
    // paddingBottom: 15,
    // textAlign: 'left',
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    // marginBottom: 10,
  },

  titletext:{
    fontSize: 30,
    // paddingTop: 10,
    paddingLeft: 20,
    // paddingRight: 20,
    fontWeight: "bold",
    color: "#000000"
  },
  searchbox : {
    backgroundColor: "#ededed",
    margin: 20,
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
  },

  resultcontainer : {
    flexDirection: 'column',    
    backgroundColor: "#A8D1FF",
    paddingTop: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    height: "100%",
  },

  resultbox: {
    marginBottom: 20
  },

  button : {
    backgroundColor: "#ffe34f",
    borderRadius: 8,
    padding: 12,
  },
  
  buttonbar: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
    marginHorizontal: 20,
  },

})