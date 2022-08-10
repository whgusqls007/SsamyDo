from sqlite3 import Timestamp
from turtle import isvisible
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from konlpy.tag import Okt
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .serializers import NoticeSerializer
from mattermostdriver import Driver
import re
import pickle
import numpy as np
import pytesseract
import cv2
import sys

driver = Driver(
    {
        "url": "meeting.ssafy.com",
        "login_id": "jayl2cu@gmail.com",
        "password": "Jaylee15@@",
        "port": 443,
    }
)

pytesseract.pytesseract.tesseract_cmd = "C:/Program Files/Tesseract-OCR/tesseract.exe"

okt = Okt()
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

loaded_model = load_model("C:/Users/Jay Lee/preprocess/preprocess/nlp/asset/model.h5")


def predict(new_sentence):
    with open(
        "C:/Users/Jay Lee/preprocess/preprocess/nlp/asset/tokenizer.pickle", "rb"
    ) as handle:
        tokenizer = pickle.load(handle)

    new_sentence = re.sub(r"[^ㄱ-ㅎㅏ-ㅣ가-힣 ]", "", new_sentence)
    new_sentence = okt.morphs(new_sentence, stem=True)  # 토큰화
    new_sentence = [word for word in new_sentence if not word in stopwords]  # 불용어 제거
    encoded = tokenizer.texts_to_sequences([new_sentence])  # 정수 인코딩
    pad_new = pad_sequences(encoded, maxlen=25)  # 패딩
    score = float(loaded_model.predict(pad_new))  # 예측
    if score > 0.5:
        print("{:.2f}% 확률로 공지입니다.\n".format(score * 100))
        return True
    else:
        print("{:.2f}% 확률로 공지가 아닙니다.\n".format((1 - score) * 100))
        return False


# Create your views here.
@api_view(["POST"])
def preprocess(request):

    # MatterMostDriver 로그인
    driver.login()
    print("로그인 성공")

    # 파일 있는지 확인
    text = request.POST.get("text")
    file_ids = request.POST.get("file_ids")
    post_id = request.POST.get("post_id")
    if file_ids:
        file_info = driver.posts.get_file_info_for_post(post_id)

    if "image" in file_info[0]["mime_type"]:
        data = driver.files.get_file(file_ids).content

    encoded_img = np.fromstring(data, dtype=np.uint8)
    img = cv2.imdecode(encoded_img, cv2.IMREAD_COLOR)

    ocr = pytesseract.image_to_string(img, lang="kor+eng", config="")

    total_message = text + "\n" + ocr

    if predict(total_message):
        print("save")
        channel_id = request.POST.get("channel_id")
        title = total_message.split("\n")[0]
        description = total_message
        date = request.POST.get("timestamp")

        notice = {
            "channel_id": channel_id,
            "title": title,
            "file_ids": file_ids,
            "description": description,
            "date": date,
        }

        serializer = NoticeSerializer(data=notice)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print("저장완료")
            return Response(status=status.HTTP_201_CREATED)

    print("저장 안됨")
    return Response(status=status.HTTP_200_OK)


# def preprocess(request):
# return
