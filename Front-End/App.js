import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/router/StackNavigater";
import Main from "./src/screens/Main";
import styles from "./app.module.css";

export default function App() {
  return (
    <NavigationContainer style={styles.back}>
      <MyStack />
    </NavigationContainer>
  );
}
