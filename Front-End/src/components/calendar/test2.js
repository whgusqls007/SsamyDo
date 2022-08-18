<KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={MakeScheduleStyles.makeScheduleBG}
>
  <View
    onPress={Keyboard.dismiss}
    style={MakeScheduleStyles.makeScheduleContainer}
  >
    <View style={MakeScheduleStyles.upperContainer}>
      {/* 뒤로가기 버튼 */}
      <View>
        <TouchableOpacity
          style={MakeScheduleStyles.headerBack}
          onPress={() => {
            navigation.navigate("Calendar");
            dispatch({ type: "Schedule/clear" });
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" margin="0" />
        </TouchableOpacity>
        {errorMSG && (
          <View style={MakeScheduleStyles.err}>
            <Ionicons name="warning" size={19} color="#c1121f" />
            <Text style={MakeScheduleStyles.errText}>{errorMSG}</Text>
          </View>
        )}
      </View>
      {/* 캘린더 */}
      <Calendar
        theme={{
          calendarBackground: "#FFFFFF",
          monthTextColor: "#5BA8FF",

          "stylesheet.calendar.header": {
            dayTextAtIndex0: { color: "red" },
            dayTextAtIndex6: { color: "#A8D1FF" },
          },
        }}
        style={{ maxheight: 200 }}
        hideExtraDays={true}
        onDayPress={(day) => {
          // 종료일 취소(클릭한 날이 종료일과 같다면)
          if (day.dateString === Schedule.day) {
            dispatch({ type: "Schedule/update", payload: { day: "" } });
          } else {
            dispatch({
              type: "Schedule/update",
              payload: { day: day.dateString },
            });
          }
          setMarkedDate({
            // Object의 key값을 변수명으로 할 경우
            [day.dateString]: { selected: true, selectedColor: "#94CBD9" },
          });
        }}
        markedDates={MarkedDate}
      />
    </View>
    <View style={MakeScheduleStyles.bottomContainer}>
      {/* 타입 선택 버튼 묶음 */}
      <View style={MakeScheduleStyles.categoryContainer}>
        {typeName.map((type, idx) => {
          return (
            <TouchableOpacity
              key={`type-${idx}`}
              style={[
                MakeScheduleStyles.categoryBox,
                idx === Schedule.type ? { backgroundColor: "#a8d1ff" } : {},
              ]}
              onPress={() => {
                if (Schedule.type === idx) {
                  dispatch({
                    type: "Schedule/update",
                    payload: { type: 3 },
                  });
                } else {
                  dispatch({
                    type: "Schedule/update",
                    payload: { type: idx },
                  });
                }
              }}
            >
              <View style={MakeScheduleStyles.categoryContent}>
                <Ionicons
                  name="ellipse-sharp"
                  size={10}
                  color={btnColor[idx]}
                />
                <Text> {typeName[idx]}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={MakeScheduleStyles.userInputBox}>
        {/* 일정 이름 입력 */}
        <View style={MakeScheduleStyles.scheduleTitleBox}>
          <TextInput
            style={{ flexShrink: 1 }}
            maxLength={17}
            placeholder="일정을 입력해 주세요"
            placeholderTextColor="#888888"
            value={Schedule.title}
            onChangeText={(text) =>
              dispatch({
                type: "Schedule/update",
                payload: { title: text },
              })
            }
          />
        </View>
        {/* 일정 시각 선택(TimePicker) */}
        <View style={MakeScheduleStyles.timeBox}>
          <TouchableOpacity
            onPress={() => {
              setShow(true);
            }}
          >
            <Text>
              {Schedule.time[0].toString().padStart(2, "0")} :{" "}
              {Schedule.time[1].toString().padStart(2, "0")}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
      </View>
      {/* 생성 버튼 */}
      <TouchableOpacity
        style={MakeScheduleStyles.submitBtn}
        onPress={() => {
          if (Schedule.type === 3) {
            setErrorMSG("일정의 분류를 선택해주세요");
          } else if (Schedule.title === "") {
            setErrorMSG("일정 이름을 입력해주세요");
          } else if (Schedule.day === "") {
            setErrorMSG("일정일을 선택해 주세요");
          } else {
            // id가 있으면 수정
            if (Schedule.id) {
              dispatch({
                type: "ScheduleList/update",
                payload: {
                  id: Schedule.id,
                  type: Schedule.type,
                  title: Schedule.title,
                  content: Schedule.content,
                  day: Schedule.day,
                  time: Schedule.time,
                },
              });
              // 생성으로 보내는 것
            } else {
              dispatch({
                type: "ScheduleList/add",
                payload: {
                  id: id,
                  type: Schedule.type,
                  title: Schedule.title,
                  content: Schedule.content,
                  day: Schedule.day,
                  time: Schedule.time,
                },
              });
            }
            // MakeSchedule 내용 정리
            dispatch({ type: "Schedule/clear" });
            // 저장하기
            dispatch({ type: "ScheduleList/save" });
            // 마크 다시 처리하기(일정 추가한 날로 옮김)
            dispatch({ type: "ScheduleList/mark", day: Schedule.day });
            // 마크 전체보기로 처리
            dispatch({ type: "ScheduleList/mark", select: "all" });
            // 스케쥴 리스트 다시 보이기
            dispatch({
              type: "ScheduleList/filter",
            });
            navigation.navigate("Calendar");
          }
        }}
      >
        <Text style={MakeScheduleStyles.submitBtnText}>{btnName}</Text>
      </TouchableOpacity>
    </View>
  </View>
</KeyboardAvoidingView>;

const MakeScheduleStyles = StyleSheet.create({
  // 전체 화면 스타일
  makeScheduleBG: {
    flex: 1,
    paddingVertical: "10%",
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
  },
  makeScheduleContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "black",
  },
  upperContainer: {
    flex: 1,
    width: "100%",
    height: "80%",
    paddingHorizontal: "10%",
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "#5BA8FF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bottomContainer: {
    flex: 1,
    borderColor: "black",
    boderWidth: 1,
  },
  headerBack: {
    width: "100%",
  },
  categoryContainer: {
    flexDirection: "row",
  },
  categoryBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    margin: "1%",
    padding: "2%",
    paddingHorizontal: "4%",
  },
  categoryContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userInputBox: {
    flexDirection: "column",
    marginVertical: "2%",
    paddingHorizontal: "3%",
  },
  scheduleTitleBox: {
    margin: "1%",
    padding: "2%",
    marginBottom: "2%",
    backgroundColor: "#ededed",
    borderRadius: 4,
  },
  timeBox: {
    flexDirection: "row",
    justifyContent: "center",
    margin: "1%",
    borderRadius: 4,
    paddingVertical: "3%",
    backgroundColor: "#a8d1ff",
  },
  submitBtn: {
    alignItems: "center",
    height: "auto",
    width: "auto",
    backgroundColor: "#5BA8FF",
    borderRadius: 5,
  },
  submitBtnText: { fontWeight: "bold", color: "#ffffff" },
  err: {
    flexDirection: "row",
    padding: 7,
    margin: 7,
  },
  errText: { fontWeight: "bold", color: "#c1121f" },
});
