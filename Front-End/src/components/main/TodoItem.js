import { View, Text, Button, FlatList } from "react-native";
import styles from "../../../app.module.css";



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

const Item = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);

function TodoItem({ navigation }) {
  const renderItem = ({item}) => (
    <Item title={item.title}/>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View>
                <Text>{item.title}</Text>
                <Button onPress={() => navigation.navigate("TodoDetail")} title="hello"/>
            </View>)}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

export default TodoItem;
