import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import Calendar from "../screens/Calendar";
import MyPage from "../screens/MyPage";
import Notice from "../screens/Notice";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Notice" component={Notice} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}

export default MyTabs;
