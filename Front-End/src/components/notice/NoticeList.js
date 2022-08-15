import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import NoticeItem from "./NoticeItem";
// import styles from "../../../app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";


// 여기서 data 받아오기  . . 

const DATA = [
  {
    id: '1',
    title: '공지1',
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

export default function NoticeList({ navigation, select }) {

  const noticeList = useSelector((state) => state.Notice);

  const dispatch = useDispatch();
  const baseURL = "http://i7e204.p.ssafy.io:8080/api/notice/page/1"
  useEffect(() => {
    axios({
      method: "get",
      url: baseURL,
    })
      .then((response) => {
        console.log("Notice Axios 요청 성공!");
        console.log(`notice axios ---------- ${response.data}`);
    
        dispatch({type: "Notice/import", payload: response.data})
        // console.log(getTodo)
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);


  console.log(`notice list --------------- ${JSON.stringify(noticeList)}`)

  // DATA 부분 noticeList로 변경 필요

  if (select === 'All') {
    return (
          <View style={styles.noticelistcontainer}>
            <ScrollView>
              {DATA.map((notice)=>(
                <NoticeItem key={notice.id} notice={notice} navigation={navigation} />
              ))}    
            </ScrollView>
          </View>
    );  
  }
  else if (select === 'MM') {
    return (
      <View style={styles.noticelistcontainer}>
        <ScrollView>
          {DATA.filter(notice => notice.route === 'MM').map((notice)=>(
            <NoticeItem key={notice.id} notice={notice} navigation={navigation} />
          ))}        
        </ScrollView>
      </View>
    );
  }
  else if (select === 'Edu') {
    return  (
      <View style={styles.noticelistcontainer}>
        <ScrollView>
          {DATA.filter(notice => notice.route === 'Edu').map((notice)=>(
              <NoticeItem key={notice.id} notice={notice} navigation={navigation} />
            ))}     
        </ScrollView>
      </View>
    );
  }; 

};

const styles = StyleSheet.create({
  noticelistcontainer: {
    flexDirection: 'row',    
    backgroundColor: "#A8D1FF",
    paddingTop: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    height: "100%",
  }
})