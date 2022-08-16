import { View, Text, TouchableOpacity, 
  Image, TextInput, KeyboardAvoidingView, StyleSheet } from "react-native";
import NoticeList from "../components/notice/NoticeList";
// import styles from "../../app.module.css";
// import { useState, useEffect } from "react";
// import { useDispatch, useState } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import SearchBar from "react-native-platform-searchbar";
import { Entypo } from '@expo/vector-icons';


export default function Notice({ navigation }) {
  const [showNotice, setShowNotice] = useState("All");
  const [value, setValue] = useState("");
  

  // console.log(value)

  // console.log(showNotice)

  return (
    
    <View style={styles.noticecontainer}>
      <Text style={styles.titlecontainer}>Ssamy Says</Text>


      <KeyboardAvoidingView>
        <View style={styles.searchbar}>
          <SearchBar
            maxLength={15}
            placeholder={"궁금한 공지를 찾아보세요!"}
            value={value}
            onChangeText={setValue}
            onSubmitEditing={()=>navigation.navigate("NoticeSearch", { value: value })}
          />
        </View>
      </KeyboardAvoidingView>


      <View>
        <View style={styles.buttonbar}>
          <View style={[{ flexDirection: "row"}]}>
            <TouchableOpacity
              style={[styles.button, showNotice === "All" && styles.clickbutton]}
              onPress={() => setShowNotice("All")}
            >
              <View >
                <Text style={styles.buttontext}>전체 🐬</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, showNotice === "MM" && styles.clickbutton]}
              onPress={() => setShowNotice("MM")}
            >
              <View >
                {/* <Image 
                  source={require('../images/mattermost.png')}
                  style={styles.imageicon}
                /> */}
                <Text style={styles.buttontext}>MatterMost</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, showNotice === "Edu" && styles.clickbutton]}
              onPress={() => setShowNotice("Edu")}
            >
              <View >
                {/* <Image 
                    source={require('../images/ssafy.png.png')}
                    style={styles.imageicon}
                  /> */}
                <Text style={styles.buttontext}>EduSSAFY</Text>
              </View>
            </TouchableOpacity>


          </View>
        </View>

        <View>
          <NoticeList navigation={navigation} select={showNotice} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  noticecontainer : {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column"
  },

  titlecontainer : {
    paddingTop: 30,
    paddingLeft: 20,
    paddingBottom: 15,
    textAlign: 'left',
    backgroundColor: "#5ba8ff",
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },

  imageicon: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  buttonbar: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  button: { 
    backgroundColor: "#ededed",
    // borderRadius: 5,
    // alignItems: "center",
    // marginHorizontal: 5,
    // paddingHorizontal: 10,
    // width: "auto",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },

  clickbutton: {
    backgroundColor: "#FFE34F",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },

  buttontext: {
    textAlign: "center",
    fontSize: 15,
  },

  searchbar: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 20
  }
})