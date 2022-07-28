import { View, Text, Button } from "react-native";
import styles from "../../../app.module.css";

function TodoItem({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text>TodoItem.js</Text>
        <Button
          title="Detail"
          onPress={() => navigation.navigate("TodoDetail")}
        />
      </View>
    </View>
  );
}

export default TodoItem;
