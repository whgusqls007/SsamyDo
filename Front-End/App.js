import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import MyStack from "./src/router/StackNavigater";
// import styles from "./app.module.css";
import { Provider } from "react-redux";
import store from "./src/store/store";
import axios from "axios";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function App() {

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress",()=>{
  //     BackHandler.exitApp();
  //   });
  // }, []);

  return (
    <SafeAreaView style={styles.appcontainer}>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer style={styles.back}>
            <StatusBar />
            <MyStack />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
  },
  back: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
