import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View
 } from 'react-native';
 import Timeline from 'react-native-timeline-flatlist'
 
 export default class TimeLineItem extends Component {
   constructor(){
     super()
     this.data = [
       {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
       {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
       {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
       {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
       {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
     ]
   } 
 
   render() {
     //'rgb(45,156,219)'
     return (
       <View style={styles.container}>
        <Text>보이나?</Text>
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