import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import MyStack from "./src/router/StackNavigater";
import styles from "./app.module.css";
import { Provider } from "react-redux";
import store from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.back}>
        <StatusBar />
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
