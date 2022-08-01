import { useSelector, useDispatch } from "react-redux";
import store from "../store";
import example from "./examSlice";
import { input } from "./examSlice";
import { View, Text, Button, TextInput } from "react-native";
import { useState } from "react";

export default function Example() {
  const dispatch = useDispatch();
  const examOne = useSelector((state) => {
    return state.example.valueOne;
  });
  const examTwo = useSelector((state) => {
    return state.example.valueTwo;
  });
  const examThree = useSelector((state) => {
    return state.example.valueThree;
  });
  const [inputText, setinputText] = useState("");
  return (
    <View>
      <Text>Example</Text>
      <View>
        <Text>examOne : {examOne}</Text>
        <Button
          title="+"
          onPress={() => {
            dispatch({ type: "example/plus", step: 1 });
            console.log(examOne);
          }}
        ></Button>
      </View>
      <View>
        <Text>examTwo : {examTwo}</Text>
        <Button
          title="변환"
          onPress={() => {
            dispatch({ type: "example/change" });
          }}
        ></Button>
      </View>
      <View>
        <Text>examThree : {examThree}</Text>
        <Text>inputText : {inputText}</Text>
        <TextInput
          placeholder="입력해주세요"
          value={inputText}
          onChangeText={setinputText}
        ></TextInput>
        <Button
          title="입력"
          onPress={() => {
            dispatch(input(inputText));
            setinputText("");
          }}
        ></Button>
      </View>
      <View>
        <Button
          title="delete"
          onPress={() => {
            dispatch({ type: "example/delete" });
          }}
        ></Button>
      </View>
    </View>
  );
}
