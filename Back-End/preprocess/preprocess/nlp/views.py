from logging import raiseExceptions
from sqlite3 import Timestamp
from turtle import isvisible
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from konlpy.tag import Okt
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .serializers import NoticeSerializer, TodoSerializer
from mattermostdriver import Driver
import re
import time
import datetime
import pickle
import numpy as np
import pytesseract
import cv2
import os

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

path = os.getcwd()

loaded_model = load_model(f"{path}/nlp/asset/model.h5")


def predict(new_sentence):
<<<<<<< HEAD
    with open(
        "C:/Users/Jay Lee/preprocess/preprocess/nlp/asset/tokenizer.pickle", "rb"
    ) as handle:
=======
    with open(f'{path}/nlp/asset/tokenizer.pickle', 'rb') as handle:
>>>>>>> 2a912829ecb2ab9695a04ede4185f1fe87647e01
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

    # 파일 있는지 확인
<<<<<<< HEAD
    text = request.POST.get("text")
    file_ids = request.POST.get("file_ids")
    post_id = request.POST.get("post_id")
=======
    text = request.data.get('text')
    file_ids = request.data.get('file_ids')
    post_id = request.data.get('post_id')
>>>>>>> 2a912829ecb2ab9695a04ede4185f1fe87647e01
    if file_ids:
        file_info = driver.posts.get_file_info_for_post(post_id)

    if "image" in file_info[0]["mime_type"]:
        data = driver.files.get_file(file_ids).content

    encoded_img = np.fromstring(data, dtype=np.uint8)
    img = cv2.imdecode(encoded_img, cv2.IMREAD_COLOR)

    ocr = pytesseract.image_to_string(img, lang="kor+eng", config="")

    total_message = text + "\n" + ocr

    if predict(total_message):
<<<<<<< HEAD
        print("save")
        channel_id = request.POST.get("channel_id")
        title = total_message.split("\n")[0]
        description = total_message
        date = request.POST.get("timestamp")

=======
        channel_id = request.data.get('channel_id')
        title = total_message.split("\n")[0]
        description = total_message
        date = request.data.get('timestamp')
        datetime = str(datetime.datetime.fromtimestamp(date/1000))
        
>>>>>>> 2a912829ecb2ab9695a04ede4185f1fe87647e01
        notice = {
            "channel_id": channel_id,
            "title": title,
            "file_ids": file_ids,
            "description": description,
<<<<<<< HEAD
            "date": date,
=======
            "date" : datetime
>>>>>>> 2a912829ecb2ab9695a04ede4185f1fe87647e01
        }

        serializer = NoticeSerializer(data=notice)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print("저장완료")
            return Response(status=status.HTTP_201_CREATED)

    print("저장 안됨")
    return Response(status=status.HTTP_200_OK)


<<<<<<< HEAD
# def preprocess(request):
# return
=======


@api_view(['POST'])
def make_todo(request):
    text = request.data.get('text')
    # MatterMostDriver 로그인
    driver.login()

    channel_id = request.data.get('channel_id')
    title = text.split('\n')[1].replace('#', '')
    description = text
    date = request.data.get('timestamp')
    datetime = str(datetime.datetime.fromtimestamp(date/1000))
    file_ids = request.data.get('file_ids')
    
    notice = {
        "channel_id": channel_id,
        "title": title,
        "file_ids": file_ids,
        "description": description,
        "date": datetime,
    }
    
    serializer = NoticeSerializer(data=notice)
    
    if serializer.is_valid(raise_exception=True):
        notice_id = serializer.save()
        print("공지 저장완료")

    duedate = text.split('\n')[2].replace('#', '')
    todo = {
        "title": title,
        "description":  description,
        "notice_id": notice_id,
        "file_ids": file_ids,
        "date": datetime,
        "duedate": duedate, 
    }
    
    serializer = TodoSerializer(data=todo)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        print("Todo 저장완료")
    
        return Response(status=status.HTTP_201_CREATED)    
    return Response(status=status.HTTP_200_OK)


def push(request):
    
    text = request.data.get('text')
    title = text.split('\n')[1].replace('#', '')
    
    push = {
        "title":title
    }
    print("푸시알림 보냄")
    return Response(status=status.HTTP_200_OK)
>>>>>>> 2a912829ecb2ab9695a04ede4185f1fe87647e01
