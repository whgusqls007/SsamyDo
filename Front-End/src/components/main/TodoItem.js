import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";

// TodoItem에서 보여지는 데이터
// 1. 오늘 날짜 포함 ~ 이후 할일
// 2. 현재 activate 된 설문
// 3. 내가 완료하지 않은 할일 (isCompleted)

const completeTodo = () => {
  item["isCompleted"] = !item[isCompleted];
};

function TodoItem({ navigation, item }) {
  // console.log(item);
  return (
    <View style={styles.todoitemcontainer}>
      {/* <Text>{item.title}</Text> */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.todoitembox}>
          {/* 지금 클릭하면 오류나는거 정상 */}
          <TouchableOpacity onPress={completeTodo}>
            <View style={[styles.circle]} />
          </TouchableOpacity>
          <Text>
            {item.title} {item.duedate}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("NoticeDetail", { id: item.id })}
          >
            <Text>공지 상세</Text>
          </TouchableOpacity>
        </View>
        {/* <FlatList
          data={item}
          renderItem={({ item }) => (
            <View style={styles.todoitembox}>
                <TouchableOpacity
                  onPress={completeTodo}>
                  <View 
                    style={[styles.circle]} />             
                </TouchableOpacity>
                <Text>
                    {item.title} {item.duedate}
                </Text>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => navigation.navigate("NoticeDetail", {id: item.id})} >
                  <Text>공지 상세</Text>
                </TouchableOpacity>
            </View>)}
          keyExtractor={item => item.id}
        /> */}
      </View>
    </View>
  );
}

export default TodoItem;
