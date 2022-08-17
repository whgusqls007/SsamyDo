import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import styles from "../../../app.module.css";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todoStatusNow } from "../../store/store";
import Notice from "../../store/slice/notice/Notice";

// TodoItem에서 보여지는 데이터
// - 현재 activate 된 설문 / List에서 필터 걸어서 내려옴 
// - 내가 완료하지 않은 할일 (isCompleted) / item에서 체크한 후 보여주기


export default function TodoItem({ navigation, item }) {
  // console.log(item)
  const dispatch = useDispatch();
  const itemId = item.id
  
  // const itemDate = item.dueDate.slice(0,8)

  const itemDuedate= (item.dueDate.length === 12 ? item.dueDate.slice(0,8): item.dueDate.slice(0,7));

  const dDay = (itemDuedate.length === 8 ? itemDuedate - ymdFormat1() : itemDuedate - ymdFormat2());


  // console.log(dDay)
  // console.log(itemDuedate)
  // console.log(itemDate)
  // const [completedTodo, setCompletedTodo] = useState('');

  // const year = item.dueDate.slice(2,4)
  // const month = item.dueDate.slice(4,6)
  // const day = item.dueDate.slice(6,8)
  // const hour = item.dueDate.slice(8,10)
  // const min = item.dueDate.slice(10,12)


  const goEdussafy = useCallback(async () => {
    const destinationURL = 'https://edu.ssafy.com/edu/board/notice/list.do' 
    if (await Linking.canOpenURL(destinationURL)) await Linking.openURL(destinationURL)
    console.log("룰루")
  }, [])

  const saveCompletedTodo=()=>{
    dispatch({type:"TodoStatus/addstatus", payload: itemId })
    dispatch({type:"TodoStatus/savestatus"})
  }

  // 오늘날짜 220817
  function ymdFormat1(oriDate = new Date()) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  // 오늘날짜 22817
  function ymdFormat2(oriDate = new Date()) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(1) +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }


  const todostatus = useSelector((state) => {
    return state.TodoStatus[0]})


  const nowStatus = (todostatus.includes(itemId))


  return (
    <View style={[styles.todoitemcontainer, dDay === 0 && styles.todaycontainer, 
                  nowStatus && styles.disabled]}>
      <View>
        <View style={styles.todoitembox}>
          <View style={styles.check}>       
            <TouchableOpacity
              disabled={nowStatus} 
              onPress={()=> { if (!nowStatus) saveCompletedTodo()}}>
              {!nowStatus && <MaterialIcons name="check-box-outline-blank" size={24} color="black" />}
              {nowStatus && <MaterialIcons name="check-box" size={24} color="black" />}
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.item1}>
              <TouchableOpacity onPress={() => { item.notice !== null 
                                                ? navigation.navigate("NoticeDetail", { id: item.notice })
                                                : {goEdussafy}}
              }>
                <Text numberOfLines={1} ellipsizeMode={"tail"} style={[styles.itemtitle, nowStatus&& styles.disabledtext]}>{item.title}</Text>
              </TouchableOpacity>
              <Text>D-{dDay}</Text>  
              {/* <Text style={[styles.itemdate, nowStatus&& styles.disabledtext]}>{year}/{month}/{day} {hour}:{min}</Text> */}
            </View>
          </View>

          {/* notice id 있는 애들만 상세 정보 보여주게 넘김  */}
          {/* <TouchableOpacity onPress={() => { item.notice !== null 
                                              ? navigation.navigate("NoticeDetail", { id: item.notice })
                                              : {goEdussafy}}
          }>
            {item.notice !== null && <Text>  🔔</Text>}
            {item.notice === null && <Text>  ⛵</Text>}
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
    );  
  };

const styles = StyleSheet.create({
  todoitemcontainer : {
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },

  // 마감일 오늘인 것 배경색 변경 
  todaycontainer : {
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: "#ffe34f",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },

  todoitembox: {
    flexDirection : "row",
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap'
  },


  item1 : {
    flexDirection: "row",
    alignItems : "center",
    // flexShrink: 1,
    // flexGrow: 1,
    flexWrap: 'wrap'
  },

  itemtitle: {
    marginHorizontal: 20,
    color: "#111111",
    // whiteSpace: "pre-wrap",

  },

  itemdate : {

  },

  disabled : {
    backgroundColor: "#ededed",
    
  },

  disabledtext : {
    textDecorationLine: "line-through",
    color: "#888888",
  }
})