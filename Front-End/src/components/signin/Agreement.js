import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Agreement({ navigation }) {
  // 약관 동의 및 다음 버튼 활성화 변수
  const [agreement, setAgreement] = useState(false);
  // 에러메시지
  const [inputError, setInputError] = useState(false);
  return (
    <View style={AgreementStyles.back}>
      <Text style={AgreementStyles.titleText}>
        개인정보 수집 및 이용에 대한 안내
      </Text>
      {/* 개인정보 이용동의서 내용 */}
      <View style={AgreementStyles.container}>
        <ScrollView>
          <Text style={[AgreementStyles.numSub, { marginBottom: 0 }]}>
            1. 수집하는 개인정보의 항목 및 수집 방법
          </Text>
          <Text style={AgreementStyles.chrSub}>
            가. 수집하는 개인정보의 항목
          </Text>
          <Text style={AgreementStyles.description}>
            SSamyDo!(이하 '쌔미두')는 서비스 제공을 위해 아래와 같은 최소한의
            개인정보를 필수항목으로 수집하고 있습니다.
          </Text>
          <Text style={AgreementStyles.description}>
            - 필수항목: EduSSAFY 아이디 및 비밀번호, MatterMost 이메일 주소 및
            비밀번호 서비스 이용과정에서 아래와 같은 정보들이 추가로 수집될 수
            있습니다.
          </Text>
          <Text style={AgreementStyles.description}>
            - EduSSAFY 기반 출석 체크 정보, 교육생의 트랙 정보 등
          </Text>
          <Text style={AgreementStyles.chrSub}>나. 개인정보 수집방법</Text>
          <Text style={AgreementStyles.description}>
            쌔미두는 다음과 같은 방법으로 개인정보를 수집합니다.
          </Text>
          <Text style={AgreementStyles.description}>
            - 어플리케이션 내 최초 인증 화면, 재인증 화면
          </Text>
          <Text style={AgreementStyles.numSub}>
            {"\n"}2. 개인정보의 수집 및 이용 목적
          </Text>
          <Text style={AgreementStyles.description}>
            '쌔미두'는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는
            등 필요한 조치를 이행할 예정입니다.
          </Text>
          <Text style={AgreementStyles.chrSub}>
            가. SSAFY 교육생의 EduSSAFY 공지 및 일정 제공
          </Text>
          <Text style={AgreementStyles.description}>
            - EduSSAFY 사이트 내 출석과 설문 응답 여부 확인을 위한 크롤링을
            목적으로 개인정보를 사용합니다.
          </Text>
          <Text style={AgreementStyles.chrSub}>
            나. SSAFY 교육생의 MatterMost 공지 및 일정 제공
          </Text>
          <Text style={AgreementStyles.description}>
            - MatterMost API 활용 등 어플리케이션 서비스 제공을 목적으로
            개인정보를 사용합니다.
          </Text>
          <Text style={AgreementStyles.numSub}>
            {"\n"}3. 개인정보의 보유 및 이용기간
          </Text>
          <Text style={AgreementStyles.description}>
            교육생의 개인정보는 개인정보의 수집 및 이용목적이 달성되면 지체 없이
            파기 됩니다. 교육생의 개인 정보는 교육 기간 내에 퇴소하거나 1년의
            교육과정 후 수료할 경우 별도의 보관 기간 없이 바로 삭제 됩니다.
            또한, 교육생이 계정 삭제를 원할 경우에도 즉시 파기 됩니다.
          </Text>
          <Text style={AgreementStyles.numSub}>
            {"\n"}4. 개인정보 파기절차 및 방법
          </Text>
          <Text style={AgreementStyles.description}>
            교육생이 입력한 정보는 공지 및 출석 상태 업데이트를 위해 DB에
            암호화하여 저장되며, 목적이 달성 되었거나 교육생의 요청에 따라 즉시
            DB에서 삭제 됩니다.
          </Text>
          <Text style={AgreementStyles.numSub}>
            {"\n"}5. 개인정보의 기술적/관리적 보호 대책
          </Text>
          <Text style={AgreementStyles.description}>
            ‘쌔미두’는 교육생들의 개인정보를 처리함에 있어 개인정보가 분실,
            도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여
            EduSSAFY와 MattaMost 계정 관련 정보는 데이터베이스에 암호화하여
            저장하고 있습니다.
          </Text>
          <Text style={AgreementStyles.description}>
            {"\n"}위 개인정보의 수집 및 이용에 대한 동의를 거부할 수 있으나,
            동의를 거부할 경우 서비스 이용이 제한됩니다.
          </Text>
        </ScrollView>
      </View>
      <View>
        {/* 약관 동의 */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 5,
          }}
          onPress={() => {
            setAgreement(!agreement);
            setInputError();
          }}
        >
          {!agreement && (
            <FontAwesome name="square-o" size={24} color="#A8D1FF" />
          )}
          {agreement && (
            <FontAwesome name="check-square-o" size={24} color="#5BA8FF" />
          )}
          <Text>
            {" "}
            상기 안내를 이해했으며, 개인정보 수집 및 이용에 동의합니다.
          </Text>
        </TouchableOpacity>
      </View>
      {/* 다음(MM, EduSSAFY 인증 단계) 버튼 */}
      {inputError ? (
        <View style={{ flexDirection: "row", margin: 4 }}>
          <Ionicons name="warning" size={19} color="#C22D37" />
          <Text style={{ fontWeight: "bold", color: "#C22D37" }}>
            {inputError}
          </Text>
        </View>
      ) : (
        <View style={{ height: 29 }}></View>
      )}
      <TouchableOpacity
        style={AgreementStyles.submitBtn}
        onPress={() => {
          if (agreement) {
            navigation.navigate("Verification");
          } else {
            // alert 형식 변경 필요할듯
            setInputError("계정 인증을 위해선 약관 확인 및 동의가 필요합니다.");
          }
        }}
      >
        <Text styles={AgreementStyles.submitText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const AgreementStyles = StyleSheet.create({
  // 전체 화면 스타일
  back: {
    height: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "92%",
    height: "75%",
    backgroundColor: "#EDEDED",
    margin: 10,
    padding: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  numSub: {
    fontSize: 14,
    marginBottom: 2,
  },
  chrSub: {
    fontSize: 13,
    marginHorizontal: 5,
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    marginHorizontal: 8,
  },
  submitBtn: {
    alignItems: "center",
    backgroundColor: "#5ba8ff",
    padding: 10,
    margin: 10,
    marginTop: 20,
    borderRadius: 8,
    width: "92%",
  },
  submitText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
