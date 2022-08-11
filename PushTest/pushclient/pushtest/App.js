import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Permissions } from "expo";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

const registerForPushNotificicationAsync = async () => {};

async function getTheToken() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return null;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  await Notifications.getPermissionsAsync();
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export default function App() {
  const token = getTheToken();
  token.then((e) => console.log("token : " + e));
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
