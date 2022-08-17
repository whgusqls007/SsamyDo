import { View, Text, ScrollView, TouchableOpacity,
KeyboardAvoidingView, StyleSheet } from "react-native";
// import styles from "../../../app.module.css";
import NoticeItem from "./NoticeItem";


// Notice data에서 찾기 .. 

const DATA = [
  {
    id: '1',
    title: '공지1a',
    duedate : '2022-08-03',
    route: 'MM'
  },
  {
    id: '2',
    title: '공지2',
    duedate : '2022-08-03',
    route: 'Edu'
  }
];

export default function NoticeSearch({ navigation, route }){
  const {value} = route.params
  // console.log(value)
  // console.log('필터링된애들')
  const searchNotice = DATA.filter(notice => notice.title.includes(value))
  // console.log(searchNotice)

  const search = String.fromCodePoint(0x1F50E)

  if (searchNotice.length !== 0) {
    return (
      <View style={styles.searchcontainer} >
        <Text style={styles.titlecontainer}>Ssamy Says</Text>
        <Text style={styles.searchbox}>{search}  "{value}" 검색 결과입니다.</Text>
        <View style={styles.resultcontainer}>
          <View style={styles.resultbox}>
            <ScrollView>
              {searchNotice.map((notice)=>(
                <NoticeItem key={notice.id} notice={notice} navigation={navigation} />
              ))}        
            </ScrollView>
          </View>

          <View >
            <TouchableOpacity style={styles.buttonnotice} onPress={() => navigation.navigate("Notice")}>
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
        <Text style={styles.titlecontainer}>Ssamy Says</Text>
        <View style={styles.failresult}>
          <Text style={styles.searchbox}>{search}  "{value}" 검색 결과가 없습니다. </Text>
          
          <View>
            <TouchableOpacity style={styles.buttonnotice} onPress={() => navigation.navigate("Notice")}>
              <Text>공지 목록으로 돌아가기</Text>
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

  buttonnotice : {
    padding: 10,
    backgroundColor: "#ffe34f",
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: "center",
    alignItems : "center",
  },
  
})