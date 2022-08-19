# README

Redux Toolkit

https://ko.redux.js.org/introduction/core-concepts

### 1. 개념 정리

[https://kyun2da.dev/라이브러리/Redux-정리/](https://kyun2da.dev/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/Redux-%EC%A0%95%EB%A6%AC/)

1. Action: 상태에 변화가 필요한 경우 사용, 액션은 객체로 표현, type필드는 필수

```javascript
{  type: 'ADD_TODO', data: { id: 1, text: '리덕스 배우기' } }
```

2. Action Creator: 액션 객체를 만드는 함수(화살표 함수 가능)

```javascript
function addTodo(data) {  return { type: 'ADD_TODO', data,} }
```

3. Reducer: 리듀서는 현재 상태와 액션 객체를 받아, 필요하다면 새로운 상태를 리턴하는 함수, 액션 유형을 기반으로 이벤트를 처리하는 이벤트 리스너(Vue의 Mutation과 같은 역할)

```javascript
const initialState = { counter: 1,}
function reducer(state = initialState, action) {
 switch (action.type) {
   case INCREMENT: return { counter: state.counter + 1,}
   default: return state}}
```

4. Store: 스토어에는 상태가 들어있다. 하나의 프로젝트는 하나의 스토어

5. Dispatch: 스토어의 내장 함수, 액션 객체를 넘겨 상태를 업데이트 하는 유일한 방법(이벤트 트리거)

6. Subscribe: 스토어의 내장 함수, 리스너 함수를 파라미터로 넣어 호출하면 상태가 업데이트될 때마다 호출(일종의 이벤트 리스너)

```javascript
const listener = () => { console.log('상태가 업데이트됨') }
const unsubscribe = store.subsribe(listener)
unsubscribe() // 추후 구독을 비활성화할 때 함수를 호출
```

7. Selector: 일반적인 vanilla.js의 리덕스에서는 스토어의 내장함수인 getState를 사용하지만 react-redux에서는 상태 값을 가져올 때 사용한다.
8. Slice: Store를 기능 단위로 하나의 Slice를 만들어 전체 Store를 구성

### Redux Toolkit 사용

**Slice(state, reducer를 동시에 사용)들을 사용해서 store를 구성하는 경우**

[Redux Toolkit 예시 노션](https://hickory-angora-815.notion.site/Redux-1fef3b4f82854c36bc1478bed72453a6)

[Redux toolkit 영상 강의](https://www.youtube.com/watch?v=9wrHxqI6zuM)

```bash
expo install @reduxjs/toolkit
// useSelector, useDispatch 사용을 위해 react-redux도 설치  
expo install react-redux
```

- Slice를 사용하여 store를 구성

```javascript
// App.js Redux는 Provider를 기준으로 묶인 곳에만 제공 
import { Provider } from "react-redux";
import store from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      ...
    </Provider>
  );
}

// countSlice.js
import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {value:0},
  reducers: {
    // action의 type이 up인 경우 실행
    up:(state, action) => {state.value = state.value +action.step;}
  }  
})
export default counterSlice;
export const {up} =counterSlice.actions; // up을 간결히 보내고 싶은 경우  

// store.js
import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

const store = configureStore({
  reducer:{
  // 각각 slice의 reducer를 입력(counterSlice의 각 reducer를 묶어준 형태) 
    counter:counterSlice.reducer  
  }  
});
export default store;

// 실제 컴포넌트에서 사용시 useSelecter를 사용(해당 컴포넌트.js)
import {useSelector, useDispatch} from "react-redux";
import store from './store';
import counterSlice from './counterSlice';
import {up} from './counterSlice'; // 간편히 up만 가져오고 싶은 경우 

funtion Counter() {
  const dispatch = useDispatch();
  const count = useSelector(state => {
    state.counter.value // counter는 store의 reducer내 counter를 의미
  });
  return(
    <div> //dispatch 내 counter는 countSlice의 name의 counter를 의미 
      <button onClick={()=>{ dispatch({type:"counter/up", step:2}); }} />
      dispatch(counter.action.up(2)); // 위의 dispatch와 같음, 대신 actions를 사용하는 경우 step이 아닌 payload 키값으로 인자가 전달
    </div>
  );  
}
```

# Navigation

https://reactnavigation.org/docs/getting-started/

```bash
npm install @react-navigation/native
# expo를 설치한 경우 dependencies를 위해 설
expo install react-native-screens react-native-safe-area-context
# expo를 설치하지 않은 경우(bare React Native) 
npm install react-native-screens react-native-safe-area-context
```

- Wrapping your app in `NavigationContainer`

```javascript
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

### Bottom Tabs Navigator

```bash
npm install @react-navigation/bottom-tabs
```

```javascript
// router/index.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../screens/Main';
import Calendar from '../screens/Calendar';
import MyPage from '../screens/MyPage';
import Notice from '../screens/Notice';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={ Main } />
      <Tab.Screen name="Calendar" component={ Calendar } />
      <Tab.Screen name="Notice" component={ Notice } />
      <Tab.Screen name="MyPage" component={ MyPage } />
    </Tab.Navigator>
  );
}
export default MyTabs;

// App.js
import { NavigationContainer } from '@react-navigation/native'
import MyTabs from './src/router'; 

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
  } 
}
```

[Bottom tab + 아이콘 추가](https://theseung.tistory.com/6)

[Bottom Tabs Navigator 이용한 화면 설계 및 구현](https://bocoder.tistory.com/13)

### Stack Navigator

```bash
npm install @react-navigation/stack
// expo를 사용 중인 경우 
expo install react-native-gesture-handler
expo install @react-native-masked-view/masked-view
```

- 네비게이션 헤더 옵션 지우기

```javascript
<Tab.Navigator
  screenOptions={{headerShown: false}} >
```

- Stack Navigator 내 탭 네비게이션 추가

```javascript
import { createStackNavigator } from '@react-navigation/stack';
import Start from '../components/start/Start';

import MyTabs from '.';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={ Start } />
      <Stack.Screen name="TabNav" component={ MyTabs } />
    </Stack.Navigator>
  );
}
```

- tap Navigation에 Icon 추가하기

```bash
$ npm install --save react-native-vector-icons
```

- 직접적으로 Nav.screen으로 등록되지 않은 컴포넌트에서 { navigation }을 사용하는 경우 prors를 통해 { navigation}을 내려 보낸다.

```javascript
// Calendar.js 는 Tab Navigator에 등록되어 있고 ScheduleDetail.js는 Stack Navigator에 등록된 경우 
<Tab.Navigator>
  <Tab.Screen name="Calendar" component={ Calendar } />
</Tab.Navigator>
<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="ScheduleDetail" component={ScheduleDetail} />
</Stack.Navigator>

// props 과정 
export default function Calendar({ navigation }) {
  return (
    <View>
      <ScheduleList navigation={navigation} />
    </View>
  );

export default function ScheduleList({ navigation }) {
  return (
    <View>
      <ScheduleItem navigation={navigation} />
    </View>
  );
}

export default function ScheduleItem({ navigation }) {
  return (
    <View>
      <Text>ScheduleItem.js</Text>
      <Button title="Detail" onPress={() => navigation.navigate("ScheduleDetail")}
      />
    </View>
  );
}
```

# 달력

```bash
$ expo install react-native-calendars
```

# 스타일

- React Native에서 CSS 파일 활용하는 방법
1. App.module.css 파일 생성

```css
.container {
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: '#6804CD';
  width: '100%';
  height: 30;
}

.text {
  color: '#ffffff';
  font-weight: bold;
}
```

2. library 설치

```bash
yarn add babel-plugin-react-native-classname-to-style babel-plugin-react-native-platform-specific-extensions react-native-css-transformer react-native-paper --dev
```

3. babel.config.js 파일 수정

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-classname-to-style',
      ['react-native-platform-specific-extensions', { extensions: ['css'] }],
    ],
  };
};
```

4. metro.config.js 파일 수정(없는 경우 생성)

```javascript
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-css-transformer")
    },
    resolver: {
      sourceExts: [...sourceExts, "css"]
    }
  };
})();
```

5. app.json 수정하기

```json
{
  "expo": {
    "packagerOpts": {
      "config": "metro.config.js",
      "sourceExts": ["js", "jsx", "css"]
    }
  }
}
```

6. 사용 예시

```javascript
import style from './App.module.css';

<View style={style.container}> </View>
```

- 멀티 스타일

```javascript
<View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
```

# LocalStorage

```bash
expo install @react-native-async-storage/async-storage
```

```javascript
AsyncStorage.setItem('nickname',JSON.stringify({'nickname': 'User1', 'phonenumber','010-xxxx-xxxx'}), () => {
  console.log('유저정보 저장 완료')
});

AsyncStorage.getItem('nickname', (err, result) => {
  const UserInfo = Json.parse(result);
  console.log('닉네임 : ' + UserInfo.nickname); // 출력 => 닉네임 : User1 
  console.log('휴대폰 : ' + UserInfo.phonnumber); //  출력 => 휴대폰 : 010-xxxx-xxxx
});
```

# Prettier

```json
//settings.json에 추가가하

"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true
```

# 오류들

1. Error: Text strings must be rendered within a

```javascript
import { View, Text } from 'react-native-web'; X 잘못된 형식  
import { View, Text } from 'react-native'; O 바른 형식 
```
