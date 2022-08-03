import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   List
 } from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
 
 export default class TimeLineItem extends Component {
   constructor(){
     super()
     this.data = [
       {time: '09:00', title: '[LIVE] 웹쩌고 저쩌고'},
       {time: '10:00', title: '자율 coding 팀별 프로젝트 진행'},
       {time: '12:20', title: '중식'},
       {time: '13:30', title: '자율 coding 팀별 프로젝트 진행'},
       {time: '18:00', title: '퇴실체크'}
     ]
   } 
 
   render() {
     //'rgb(45,156,219)'
     return (
       <View>
        <Text>TimeLineItem</Text>
         <Text 
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
 
// export default TimeLineItem;

// import React, { Component } from 'react';
// import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
// import styles from "../../../app.module.css";

// const DATA = [
//   {
//     time: "09:00",
//     schedule: "[Live] 웹 서버 프로그래밍 시 주의할 점",
//   },
//   {
//     time: "10:00",
//     schedule: "자율coding: 팀별 PJT 진행",
//   },
// ];

// const Item = ({schedule}) => (
//   <View style = {currentStyles.item}>
//     <Text style = {currentStyles.schedule}>{schedule}</Text>
//   </View>
// );

// function TimeLineItem(props) {
//   const renderItem = () => <Item schedule={Item.title}/>;
//   return (
//     <SafeAreaView style= {currentStyles.contatiner}>
//       <FlatList
//         data = {DATA}
//         renderItem = {renderItem}
//         keyExtractor = {(item) => item.date }
//       />
//     </SafeAreaView>
    
//   );
// }

// const currentStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   schedule: {

//   }
// });

// export default TimeLineItem;