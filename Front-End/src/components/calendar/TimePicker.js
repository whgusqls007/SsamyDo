import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useSelector, useDispatch, useEffect } from "react-redux";

export default function CustomTimePicker() {
  // 시간 선택을 위한 변수 설정
  const value = useSelector((state) => {
    return state.Schedule[2];
  });
  // {label: , value: }
  const times = [
    { label: "오전", value: 0 },
    { label: "오후", value: 1 },
  ];
  const hours = [];
  for (let i = 0; i <= 12; i++) {
    hours.push({ label: String(i), value: i });
  }
  const minutes = [];
  for (let i = 0; i <= 60; i = i + 5) {
    minutes.push({ label: String(i), value: i });
  }
  const [time, setTime] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <WheelPickerExpo
        selectedStyle={{ borderColor: "blue", borderWidth: 2 }}
        initialSelectedIndex={0}
        items={times}
        onChange={({ item }) => setTime(item.label)}
      />
      <WheelPickerExpo
        selectedStyle={{ borderColor: "blue", borderWidth: 2 }}
        initialSelectedIndex={0}
        items={hours}
        onChange={({ item }) => setHour(item.label)}
      />
      <WheelPickerExpo
        selectedStyle={{ borderColor: "blue", borderWidth: 2 }}
        initialSelectedIndex={0}
        items={minutes}
        onChange={({ item }) => setMinute(item.label)}
      />
    </View>
  );
}

// 시간 계산용 변수들
// const MILLISECONDS_PER_MINUTE = 60 * 1000;
// const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
// const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

// const [timeValue, setTimeValue] = useState(Date.now() % MILLISECONDS_PER_DAY);
// const [hour, min] = useMemo(() => {
//   return [
//     Math.floor(timeValue / MILLISECONDS_PER_HOUR),
//     Math.floor((timeValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
//     Math.floor((timeValue % MILLISECONDS_PER_MINUTE) / 1000),
//   ];
// }, [timeValue]);
