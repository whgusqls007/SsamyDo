import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import styles from "../../../app.module.css";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todoStatusNow } from "../../store/store";
import Notice from "../../store/slice/notice/Notice";
import { Linking } from "react-native";
import id from "faker/lib/locales/id_ID";

// TodoItem에서 보여지는 데이터
// - 현재 activate 된 설문 / List에서 필터 걸어서 내려옴
// - 내가 완료하지 않은 할일 (isCompleted) / item에서 체크한 후 보여주기

export default function TodoItem({ navigation, item }) {
  // console.log(item)
  const dispatch = useDispatch();
  const itemId = item.id;
  const itemTitle = item.title.includes("건강")
    ? item.title.slice(4)
    : item.title;
  // console.log(`item notice ------ ${item.notice}`)

  // console.log(typeof(item))
  // const itemDate = item.dueDate.slice(0,8)

  const itemDuedate =
    item.dueDate.length === 12
      ? item.dueDate.slice(0, 8)
      : item.dueDate.slice(0, 7);

  const dDay =
    itemDuedate.length === 8
      ? itemDuedate - ymdFormat1()
      : itemDuedate - ymdFormat2();

  const hour =
    item.dueDate.length === 12
      ? item.dueDate.slice(8, 10)
      : item.dueDate.slice(8, 9);
  const min =
    item.dueDate.length === 12
      ? item.dueDate.slice(10, 12)
      : item.dueDate.slice(9, 11);
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
    const destinationURL = "https://edu.ssafy.com/edu/board/notice/list.do";
    if (await Linking.canOpenURL(destinationURL))
      await Linking.openURL(destinationURL);
  }, []);

  const saveCompletedTodo = () => {
    dispatch({ type: "TodoStatus/addstatus", payload: itemId });
    dispatch({ type: "TodoStatus/savestatus" });
  };

  const deleteCompletedTodo = () => {
    dispatch({ type: "TodoStatus/deletestatus", payload: itemId });
    dispatch({ type: "TodoStatus/savestatus" });
  };

  // 오늘날짜 220817
  function ymdFormat1(oriDate = new Date()) {
    // let utc = oriDate.getTime() + oriDate.getTimezoneOffset() * 60 * 1000;

    // let timeDiff = 34 * 60 * 60 * 1000;
    // let kst = new Date(utc + timeDiff);

    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(2, "0") +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  // console.log(ymdFormat1());

  // 오늘날짜 22817
  function ymdFormat2(oriDate = new Date()) {
    // let utc = oriDate.getTime() + oriDate.getTimezoneOffset() * 60 * 1000;

    // let timeDiff = 34 * 60 * 60 * 1000;
    // let kst = new Date(utc + timeDiff);

    let result =
      oriDate.getFullYear().toString() +
      (oriDate.getMonth() + 1).toString().padStart(1) +
      oriDate.getDate().toString().padStart(2, "0");
    return result;
  }

  const todostatus = useSelector((state) => {
    return state.TodoStatus[0];
  });

  const nowStatus = useSelector((state) => {
    return state.TodoStatus[0].includes(itemId);
  });

  return (
    <View
      style={[
        styles.todoitemcontainer,
        dDay === 0 && styles.todaycontainer,
        nowStatus && styles.disabled,
      ]}
    >
      <View style={styles.todoitembox}>
        <View style={styles.check}>
          <TouchableOpacity
            onPress={() => {
              if (!nowStatus) {
                saveCompletedTodo();
              } else {
                deleteCompletedTodo();
              }
            }}
          >
            {!nowStatus && (
              <MaterialIcons
                name="check-box-outline-blank"
                size={24}
                color="black"
              />
            )}
            {nowStatus && (
              <MaterialIcons name="check-box" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.textbox}>
          <View style={styles.itemtitlebox}>
            {/* {item.notice === null ? ( */}
              <TouchableOpacity onPress={goEdussafy}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={[styles.itemtitle, nowStatus && styles.disabledtext]}
                >
                  {itemTitle}
                </Text>
              </TouchableOpacity>
          
          </View>

          <View style={styles.itemdatebox} disabled={nowStatus}>
            {dDay === 0 ? (
              <Text style={[styles.itemdate, nowStatus && styles.disabledtext]}>
                D-DAY
              </Text>
            ) : (
              <Text style={[styles.itemdate, nowStatus && styles.disabledtext]}>
                D-{dDay}
              </Text>
            )}
            {dDay === 0 ? (
              <Text style={[styles.itemtime, nowStatus && styles.disabledtext]}>
                {hour}:{min}
              </Text>
            ) : null}
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
  );
}

const styles = StyleSheet.create({
  todoitemcontainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },

  // 마감일 오늘인 것 배경색 변경
  todaycontainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    backgroundColor: "#ffe34f",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },

  todoitembox: {
    flexDirection: "row",
    flexGrow: 1,
    // flexShrink: 1,
    flexWrap: "wrap",
    alignItems: "center",
  },

  itemtitlebox: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "70%",
    // flexShrink: 1,
    // flexGrow: 1,
    flexWrap: "wrap",
  },

  itemtitle: {
    // marginHorizontal: 20,
    color: "#111111",
    fontSize: 15,
    // whiteSpace: "pre-wrap",
  },

  itemdate: {
    marginHorizontal: 10,
    color: "#111111",
    fontSize: 12,
  },

  itemtime: {
    color: "#111111",
    fontSize: 12,
  },

  itemdatebox: {
    flexDirection: "row",
    alignItems: "flex-end",
    // flexShrink: 1,
    // flexGrow: 1,
    flexWrap: "wrap",
    marginRight: 20,
  },

  check: {
    flex: 0.1,
  },

  textbox: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  disabled: {
    backgroundColor: "#ededed",
  },

  disabledtext: {
    textDecorationLine: "line-through",
    color: "#888888",
  },
});
