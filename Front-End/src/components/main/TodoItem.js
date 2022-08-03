import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import styles from "../../../app.module.css";

// TodoItem에서 보여지는 데이터
// 1. 오늘 날짜 포함 ~ 이후 할일
// 2. 현재 activate 된 설문 
// 3. 내가 완료하지 않은 할일 (isCompleted)

// 날짜 순으로 sort

const DATA = [
  {
    id: '1',
    title: '공지1',
    duedate : '2022-08-03'
  },
  {
    id: '2',
    title: '공지2',
    duedate : '2022-08-03'
  }
];


function TodoItem({ navigation }) {
  return (
    <View style={styles.todoitemcontainer}>
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View style={styles.todoitembox}>
                <TouchableOpacity>
                  <View 
                    style={styles.circle} />
                    {/* 
                        버튼 onPress 하면 완료로 상태 변경 -> 완료된 항목 내리기 
                        icon으로 대체 가능 
                    */}                    
                </TouchableOpacity>
                <Text>{item.title} {item.duedate}</Text>
                {/* 상세 보기 : 지금은 버튼이지만 나중에는 제목 누르면 이동하게, id값 사용 */}
                <Button 
                  onPress={() => navigation.navigate("NoticeDetail", {id: item.id})} 
                  title="공지"
                />
            </View>)}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

export default TodoItem;
