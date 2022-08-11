
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import styles from "../../../app.module.css";

export default function Alarm() {
  const typeList = useSelector((state) => {
    return state.Setting[2];
  });
  return (
    <View style={[styles.border, { height: 200, backgroundColor: "#E5F3F6" }]}>
      <Text>Setting.js</Text>
      <View>
        <Text>
          스케쥴 타입 : {typeList[0]} / {typeList[1]} / {typeList[2]}
        </Text>
      </View>
    </View>
  );
}
