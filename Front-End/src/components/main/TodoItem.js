import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todoStatusNow } from "../../store/store";

// TodoItem에서 보여지는 데이터
// - 현재 activate 된 설문 / List에서 필터 걸어서 내려옴 
// - 내가 완료하지 않은 할일 (isCompleted) / item에서 체크한 후 보여주기


export default function TodoItem({ navigation, item }) {
  const dispatch = useDispatch();
  const itemId = item.id
  // const [completedTodo, setCompletedTodo] = useState('');

  const saveCompletedTodo=()=>{
    dispatch({type:"TodoStatus/addstatus", payload: itemId })
    dispatch({type:"TodoStatus/savestatus"})
  }


  // 빈값만 오는 이유 ,,import 하기 전에 useselector 사용해서인듯

  const todostatus = useSelector((state) => {
    return state.TodoStatus[0]})


  const nowStatus = (todostatus.includes(itemId))
  // console.log(`ㅇㄴㅇ${nowStatus}`)
  // const nowStatus = todostatus.filter((todo) => {
  //   todo.includes(itemId)
  // })



  // checkStatus에 들어있지않을때 -> 미완
  // onPress -> 상태 변경하고 로컬에 저장
    return (
    
    <View style={styles.todoitemcontainer}>
      <Text>{nowStatus}</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.todoitembox}>        
          <TouchableOpacity onPress={()=> { if (!nowStatus) saveCompletedTodo()}}>
            {!nowStatus && <MaterialIcons name="check-box-outline-blank" size={24} color="black" />}
            {nowStatus && <MaterialIcons name="check-box" size={24} color="black" />}
          </TouchableOpacity>
          <Text>
            {item.title} 
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("NoticeDetail", { id: item.id })}
          >
            <Text>공지 상세</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    );  
  } 
//   // 완료상태일 때 
//     <View style={styles.todoitemcontainer}>
//       <View style={{ flexDirection: "row" }}>
//         <View style={[styles.todoitembox, styles.todoCompleted]}>        
//           <MaterialIcons name="check-box" size={24} color="black" />
//           <Text>
//             {item.title} 
//           </Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate("NoticeDetail", { id: item.id })}
//           >
//             <Text>공지 상세</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
  
//   )};
// }


