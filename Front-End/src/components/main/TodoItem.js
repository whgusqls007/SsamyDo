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
  const itemDate = item.dueDate.slice(0,8)
  // console.log(itemDate)
  // const [completedTodo, setCompletedTodo] = useState('');

  const year = item.dueDate.slice(2,4)
  const month = item.dueDate.slice(4,6)
  const day = item.dueDate.slice(6,8)
  const hour = item.dueDate.slice(8,10)
  const min = item.dueDate.slice(10,12)

  const goEdussafy = useCallback(async () => {
    const destinationURL = 'https://edu.ssafy.com/edu/board/notice/list.do' 
    if (await Linking.canOpenURL(destinationURL)) await Linking.openURL(destinationURL)
    console.log("룰루")
  }, [])

  const saveCompletedTodo=()=>{
    dispatch({type:"TodoStatus/addstatus", payload: itemId })
    dispatch({type:"TodoStatus/savestatus"})
  }

  // 오늘날짜 
  function ymdFormat(oriDate = new Date()) {
    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  // console.log(ymdFormat())


  // 빈값만 오는 이유 ,,import 하기 전에 useselector 사용해서인듯

  const todostatus = useSelector((state) => {
    return state.TodoStatus[0]})
    // console.log(`todostatus ----------- ${todostatus}`)


  const nowStatus = (todostatus.includes(itemId))
  // console.log(`ㅇㄴㅇ${nowStatus}`)
  // const nowStatus = todostatus.filter((todo) => {
  //   todo.includes(itemId)
  // })



  // checkStatus에 들어있지않을때 -> 미완
  // onPress -> 상태 변경하고 로컬에 저장
    
// onPress 하면 TodoStatus > addstatus로 추가 , savestatus로 로컬에 저장

// function TodoItem({ navigation, item }) {
  return (
    <View style={[styles.todoitemcontainer, itemDate === ymdFormat() && styles.todaycontainer, 
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
          <View style={styles.item1}>
            <Text style={[styles.itemtext, nowStatus&& styles.disabledtext]}>{item.title}</Text>
            <Text style={[styles.itemtext, nowStatus&& styles.disabledtext]}>{year}/{month}/{day} {hour}:{min}</Text>
          </View>

          {/* notice id 있는 애들만 상세 정보 보여주게 넘김  */}
          <TouchableOpacity onPress={() => { item.notice !== null 
                                              ? navigation.navigate("NoticeDetail", { id: item.notice })
                                              : {goEdussafy}}
          }>
            {item.notice !== null && <Text>  🔔</Text>}
            {item.notice === null && <Text>  ⛵</Text>}
          </TouchableOpacity>
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
    borderRadius: 20,
  },

  // 마감일 오늘인 것 배경색 변경 
  todaycontainer : {
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: "#ffc0cb",
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },

  todoitembox: {
    flexDirection : "row",
  },


  item1 : {
    flexDirection: "row",
    alignItems : "center",
  },

  itemtext: {
    marginHorizontal: 20,
    // whiteSpace: "pre-wrap",
  },

  disabled : {
    backgroundColor: "#ededed",
    
  },

  disabledtext : {
    textDecorationLine: "line-through"
  }
})