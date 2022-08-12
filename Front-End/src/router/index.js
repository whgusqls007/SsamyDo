import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Main from "../screens/Main";
import Calendar from "../screens/Calendar";
import MyPage from "../screens/MyPage";
import Notice from "../screens/Notice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// icons
const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "check-circle" }),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "calendar" }),
        }}
      />
      <Tab.Screen
        name="Notice"
        component={Notice}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "exclamation" }),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "account" }),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
