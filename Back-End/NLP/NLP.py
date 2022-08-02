import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import re
import urllib.request
from konlpy.tag import Okt
from tqdm import tqdm
import pickle
from sklearn.metrics import confusion_matrix
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, Dense, LSTM
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import load_model
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint


train_data = pd.read_excel("traindata.xls")
test_data = pd.read_excel("testdata.xlsx")

train_data["document"].nunique(), train_data["label"].nunique()
train_data.drop_duplicates(subset=["document"], inplace=True)
train_data = train_data.dropna(how="any")

train_data["document"] = train_data["document"].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]", "")
train_data["document"] = train_data["document"].str.replace("^ +", "")
train_data["document"].replace("", np.nan, inplace=True)
train_data = train_data.dropna(how="any")

test_data.drop_duplicates(subset=["document"], inplace=True)
test_data["document"] = test_data["document"].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]", "")
test_data["document"] = test_data["document"].str.replace("^ +", "")
test_data["document"].replace("", np.nan, inplace=True)
test_data = test_data.dropna(how="any")

stopwords = [
    "의",
    "가",
    "이",
    "은",
    "들",
    "는",
    "좀",
    "잘",
    "걍",
    "과",
    "도",
    "를",
    "으로",
    "자",
    "에",
    "와",
    "한",
    "하다",
]

okt = Okt()

max_len = 25

X_train = []
for sentence in tqdm(train_data["document"]):
    tokenized_sentence = okt.morphs(sentence, stem=True)  # 토큰화
    stopwords_removed_sentence = [
        word for word in tokenized_sentence if not word in stopwords
    ]  # 불용어 제거
    X_train.append(stopwords_removed_sentence)

X_test = []
for sentence in tqdm(test_data["document"]):
    tokenized_sentence = okt.morphs(sentence, stem=True)  # 토큰화
    stopwords_removed_sentence = [
        word for word in tokenized_sentence if not word in stopwords
    ]  # 불용어 제거
    X_test.append(stopwords_removed_sentence)

tokenizer = Tokenizer()
tokenizer.fit_on_texts(X_train)

threshold = 3
total_cnt = len(tokenizer.word_index)  # 단어의 수
rare_cnt = 0  # 등장 빈도수가 threshold보다 lstm작은 단어의 개수를 카운트
total_freq = 0  # 훈련 데이터의 전체 단어 빈도수 총 합
rare_freq = 0  # 등장 빈도수가 threshold보다 작은 단어의 등장 빈도수의 총 합

# 단어와 빈도수의 쌍(pair)을 key와 value로 받는다.
for key, value in tokenizer.word_counts.items():
    total_freq = total_freq + value

    # 단어의 등장 빈도수가 threshold보다 작으면
    if value < threshold:
        rare_cnt = rare_cnt + 1
        rare_freq = rare_freq + value

print("단어 집합(vocabulary)의 크기 :", total_cnt)
print("등장 빈도가 %s번 이하인 희귀 단어의 수: %s" % (threshold - 1, rare_cnt))
print("단어 집합에서 희귀 단어의 비율:", (rare_cnt / total_cnt) * 100)
print("전체 등장 빈도에서 희귀 단어 등장 빈도 비율:", (rare_freq / total_freq) * 100)

# 전체 단어 개수 중 빈도수 2이하인 단어는 제거.
# 0번 패딩 토큰을 고려하여 + 1
vocab_size = total_cnt - rare_cnt + 1
print("단어 집합의 크기 :", vocab_size)

tokenizer = Tokenizer(vocab_size)
tokenizer.fit_on_texts(X_train)
X_train = tokenizer.texts_to_sequences(X_train)
X_test = tokenizer.texts_to_sequences(X_test)

y_train = np.array(train_data["label"])
y_test = np.array(test_data["label"])

drop_train = [index for index, sentence in enumerate(X_train) if len(sentence) < 1]

# 빈 샘플들을 제거
X_train = np.delete(X_train, drop_train, axis=0)
y_train = np.delete(y_train, drop_train, axis=0)
print(len(X_train))
print(len(y_train))

print("리뷰의 최대 길이 :", max(len(review) for review in X_train))
print("리뷰의 평균 길이 :", sum(map(len, X_train)) / len(X_train))
plt.hist([len(review) for review in X_train], bins=50)
plt.xlabel("length of samples")
plt.ylabel("number of samples")
plt.show()


def below_threshold_len(max_len, nested_list):
    count = 0
    for sentence in nested_list:
        if len(sentence) <= max_len:
            count = count + 1
    print("전체 샘플 중 길이가 %s 이하인 샘플의 비율: %s" % (max_len, (count / len(nested_list)) * 100))


below_threshold_len(max_len, X_train)

X_train = pad_sequences(X_train, maxlen=max_len)
X_test = pad_sequences(X_test, maxlen=max_len)

# dfx = pd.DataFrame(X_train)
# dfx.to_csv("x_train.txt")

# dfy = pd.DataFrame(y_train)
# dfy.to_csv("y_train.txt")

# save tokenizer
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
#####################

embedding_dim = 100
hidden_units = 128

model = Sequential()
model.add(Embedding(vocab_size, embedding_dim))
model.add(LSTM(hidden_units))
model.add(Dense(1, activation="sigmoid"))

es = EarlyStopping(monitor="val_loss", mode="min", verbose=1, patience=4)
mc = ModelCheckpoint(
    "best_model.h5", monitor="val_acc", mode="max", verbose=1, save_best_only=True
)

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["acc"])
history = model.fit(
    X_train, y_train, epochs=15, callbacks=[es, mc], batch_size=64, validation_split=0.2
)

model.save("./")

loaded_model = load_model("best_model.h5")
# print("\n 테스트 정확도:", loaded_model.evaluate(X_test, y_test))


#Predict
y_prediction = model.predict(X_test)
y_prediction = np.argmax (y_prediction)
y_test=np.argmax(y_test)

#Create confusion matrix and normalizes it over predicted (columns)
result = confusion_matrix(y_test, y_prediction , normalize='pred')
print(result)

def sentiment_predict(new_sentence):
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    new_sentence = re.sub(r"[^ㄱ-ㅎㅏ-ㅣ가-힣 ]", "", new_sentence)
    new_sentence = okt.morphs(new_sentence, stem=True)  # 토큰화
    new_sentence = [word for word in new_sentence if not word in stopwords]  # 불용어 제거
    encoded = tokenizer.texts_to_sequences([new_sentence])  # 정수 인코딩
    pad_new = pad_sequences(encoded, maxlen=max_len)  # 패딩
    score = float(loaded_model.predict(pad_new))  # 예측
    if score > 0.5:
        print("{:.2f}% 확률로 공지입니다.\n".format(score * 100))
    else:
        print("{:.2f}% 확률로 부정 리뷰입니다.\n".format((1 - score) * 100))


print(sentiment_predict("""@here 
부울경 1반 여러분~ 좋은 아침이에요-!!
🔸9시 전 입실체크/오전 건강설문 완료해주시고 아래 공지사항 꼭 확인해주세요.

##### **[공지]**
1. 단체보험 가입
  - 가입방법 : 에듀싸피 공지사항 內 첨부파일 작성하여 제출(암호 설정 : 0707)
  - 제출방법 : 에듀싸피 > 마이캠퍼스 > 서류제출 > 글쓰기
  - 제출기한 : 1/12(수)까지
2. 우편비 지급
  - 에듀싸피 공지사항 >  "우편비 지급" 관련 게시 확인 첨부파일 작성
  - 제출방법 : 에듀싸피 > 마이캠퍼스 > 서류제출 > 파일명 : 지역_반 _이름(금액)   ex) 부울경_1반_김싸피(3170)
  - 제출기한 : 1/12(수)까지
3. 7기 입학식 Webex 서포터즈 모집
  - 신청조건 : Webex 가상배경 적용이 원활한 교육생
  - 모집인원 : ✨세 자리 남았습니다-!! / 저에게 MM으로 신청해주세요!
  - 신청기한 : ~1/11(화) 오늘까지!!
4. 각 반 별 자치회 선출
  - 모집인원 : 반 별 반장 1명, CA 1명
  - 신청기간 : ~1/14(금) 15시까지 / 저에게 MM으로 신청해주세요!"""))

print(sentiment_predict("""
                        @HERE
이번 3월부터 '삼성 임직원 멘토링 게시판'이 오픈된거 알고 있으시죠? :slightly_smiling_face:

 [에듀싸피-멘토링 게시판] 에서는 멘토님들의 진심어린 멘토링이 이어지고 있는데요~

멘토링을 진행하고 계신 현업 선배이자, 삼성 임직원 멘토님들과 직접 만날 수 있는 자리를 마련했습니다.

간담회를 통해 평소 멘토님들께 궁금했던 부분, 취업/진로에 관한 부분, 업계에 관한 부분 등 자유롭게 질문해주시면 됩니다!

SW개발자로 한층 더 성장할 수 있는 아주아주 특별한 소통의 시간, 놓치지 말고 적극 참여 부탁드려요~!

 
**★ 간담회 참여신청 : 구글 설문폼 https://forms.gle/RAeE4N1UbY18oRbn8**

★★ 참석을 희망하시는 분들은 ~3/23(수)까지 신청해주세요 :slightly_smiling_face:

 

**□ 간담회 일정 : 3/29(화) or 3/30(수) 오후 6시~ (1H)**
※ 단, 3/30(수)는 선착순으로 멘티 참석 인원이 학기별 8명으로 제한됩니다.

□ 진행방식 : Webex(온라인)"""))

print(sentiment_predict(
"""@here 
1반 여러분~ 저번주 종례 때 전해드린 개인정보 동의 안하신 분들이 많네요ㅜㅜ
아래 경로로 13시까지 꼭! 하셔야 합니다 :blush: 
학사사이트 > 마이캠퍼스 > 교육생 서약서 > '제3자 정보제공 동의서(카카오)' 클릭 > 휴대폰 인증만 하면 끝!"""))


print(sentiment_predict(
"""@here 
1반 여러분~ 저 배고파요 프론트가 다 해 줘"""))

print(sentiment_predict("@here 안녕하세요 1반 여러분~ 저번주 종례 때 전해드린 개인정보 동의 1/24일까지 해주시길 바랍니다. 제가 부탁 좀 드리겠습니다."))



    
exit()