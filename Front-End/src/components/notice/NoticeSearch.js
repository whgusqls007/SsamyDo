import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
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

  if (searchNotice.length !== 0) {
    return (
      <View>
        <Text>{value} 검색 결과입니다.</Text>
        <ScrollView>
          {searchNotice.map((notice)=>(
            <NoticeItem key={notice.id} notice={notice} navigation={navigation} />
          ))}        
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("Notice")}>
          <Text>공지 목록으로 돌아가기</Text>
        </TouchableOpacity>
    </View>
    );  
  }
  else {
    return (
      <View>
        <Text> {value} 검색 결과가 없습니다. </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notice")}>
          <Text>공지 목록으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    )
  }
};