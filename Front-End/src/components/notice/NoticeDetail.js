// import { View, Text } from "react-native";
// import styles from "../../../app.module.css";

// export default function NoticeDetail({route}) {
//   return (
//     <View style={styles.center}>
//       {/* 전달받은 id 잘 찍히는지 확인용으로 넣어둠 */}
//       <Text>{route.params.id}</Text>
//       <Text>NoticeDetail.js</Text>
//     </View>
//   );
// }

import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View
 } from 'react-native';
 import Timeline from 'react-native-timeline-flatlist'
 
 export default class TodoDetail extends Component {
   constructor(){
     super()
     this.data = [
       {time: '09:00', title: '[LIVE] 웹 어쩌고', description: 'Event 1 Description'},
       {time: '10:00', title: '공통 프로젝트', description: 'Event 2 Description'},
       {time: '12:00', title: '중식', description: 'Event 3 Description'},
       {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
       {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
     ]
   } 
 
   render() {
     //'rgb(45,156,219)'
     return (
       <View style={styles.container}>
         <Timeline 
           style={styles.list}
           data={this.data}
         />
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
     paddingTop:65,
     backgroundColor:'white'
   },
   list: {
     flex: 1,
     marginTop:20,
   },
 });