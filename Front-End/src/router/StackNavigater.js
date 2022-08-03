import { createStackNavigator } from "@react-navigation/stack";
import Start from "../components/start/Start";
import SignIn from "../components/signin/SignIn";
import NoticeDetail from "../components/notice/NoticeDetail";
import TodoDetail from "../components/main/TodoDetail";
import MakeSchedule from "../components/calendar/MakeSchedule";
import ScheduleDetail from "../components/calendar/ScheduleDetail";
import TodoItem from "../components/main/TodoItem";
import MyTabs from ".";
import example from "../store/example/example";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        headerTitleAlign: 'center', }} 
    >
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="TabNav" component={MyTabs} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
      <Stack.Screen name="TodoItem" component={TodoItem} />
      <Stack.Screen name="TodoDetail" component={TodoDetail} />
      <Stack.Screen name="MakeSchedule" component={MakeSchedule} />
      <Stack.Screen name="example" component={example} />
    </Stack.Navigator>
  );
}
