import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import Calendar from "../screens/Calendar";
import MyPage from "../screens/MyPage";
import Notice from "../screens/Notice";
import { Ionicons } from "@expo/vector-icons";

// icons
const TabIcon = ({ name, size, color }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5ba8ff",
        tabBarInactiveTintColor: "#a8d1ff",
        backgroundColor: "#ff0000",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Main}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "home" }),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "calendar-sharp" }),
        }}
      />
      <Tab.Screen
        name="Notice"
        component={Notice}
        options={{
          tabBarIcon: (props) =>
            TabIcon({ ...props, name: "newspaper-outline" }),
        }}
      />
      <Tab.Screen
        name="mypage"
        component={MyPage}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "person" }),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
