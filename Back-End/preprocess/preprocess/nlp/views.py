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
import logging


logger = logging.getLogger('my')

driver = Driver({
        "url" : "meeting.ssafy.com",
        "login_id" : "jayl2cu@gmail.com",
        "password": "Jaylee15@@",
        "port" : 443,
    })


okt = Okt()
stopwords = [
    "습니다"
    "입니다"
    "다"
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
    with open(f'{path}/nlp/asset/tokenizer.pickle', 'rb') as handle:
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
@api_view(['POST'])
def preprocess(request):

    # MatterMostDriver 로그인
    driver.login()

    # 파일 있는지 확인
    text = request.data.get('text')
    file_ids = request.data.get('file_ids')
    print(type(file_ids))
    print(file_ids)
    post_id = request.data.get('post_id')

    total_message = text
    
    if file_ids:
        for file_id in file_ids.split(","):
            try:
                data = driver.files.get_file(file_ids).content

                encoded_img = np.fromstring(data, dtype = np.uint8)
                img = cv2.imdecode(encoded_img, cv2.IMREAD_COLOR)
        
                print("이까진됨")
                ocr = pytesseract.image_to_string(img, 'eng+Hangul')
                print(ocr)
                logger.info(ocr)

                total_message = text + "\n" + ocr
            
            except Exception as e:
                logger.info(e)
                print(e)

    if not file_ids:
        file_ids = ''

        
    if predict(total_message):
        channel_id = request.data.get('channel_id')
        cnt = 1
        while True:
            title = total_message.split("\n")[cnt]
            if title:
                break
            else:
                cnt += 1
        description = total_message
        timestamp = request.data.get('timestamp')
        date = str(datetime.datetime.fromtimestamp(timestamp//1000)).split()[0].replace('-', '')
        notice = {
            "channel_id": channel_id,
            "title": title,
            "file_ids": file_ids,
            "description": description,
            "date" : date,
            "source" : "M",
        }

        serializer = NoticeSerializer(data=notice)
                

     
        if serializer.is_valid():

            serializer.save()
            logger.info("저장 완료", notice)
            return Response(status=status.HTTP_201_CREATED)    
        

    logger.info("저장 안됨")
    return Response(status=status.HTTP_200_OK)




@api_view(['POST'])
def make_todo(request):

    text = request.data.get('text')
    # MatterMostDriver 로그인
    driver.login()

    channel_id = request.data.get('channel_id')
    cnt = 1
    while True:
        if text.split('\n')[cnt]:
            break
        cnt += 1

    title = text.split('\n')[cnt].replace('#', '')
    string = text.split('\n')[cnt+1]
    duedate = re.sub(r'[^0-9]', '', string)


    if duedate[:2] != '20'and duedate[:2] != 22:
        duedate = '2022' + duedate
    elif duedate[:2] == 22:
        duedate = '20' + duedate
    description = text
    timestamp = request.data.get('timestamp')

    date = str(datetime.datetime.fromtimestamp(timestamp//1000)).split()[0].replace('-', '')
        
    file_ids = request.data.get('file_ids')
    
    if not file_ids:
        file_ids = '[]'

    notice = {
        "channel_id": channel_id,
        "title": title,
        "file_ids": file_ids,
        "description": description,
        "date" : date,
        "source" : "M",
    }

    serializer = NoticeSerializer(data=notice)
    
    if serializer.is_valid():
        notice_id = serializer.save()
        logger.info("저장 완료", notice)
    
    file_id_list = file_ids.split(',')
    
    for file_id in file_id_list:
        res = driver.files.get_file(file_id)
        filename = f"{file_id}.jpg"
        completeName = os.path.join(f"/home/ubuntu/imageServer/images", filename)
        with open(completeName, "wb") as f:
            f.write(res.content)

    todo = {
        "title": title,
        "description":  description,
        "notice_id": notice_id,
        "file_ids": file_ids,
        "start_date": date,
        "due_date": duedate, 
        "type": 0,
    }
        
    serializer = TodoSerializer(data=todo)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        logger.info(serializer)
        print("Todo 저장완료")
   
        return Response(status=status.HTTP_201_CREATED)    
    print("Todo 저장실패")
    return Response(status=status.HTTP_200_OK)


def push(request):
    
    text = request.data.get('text')
    title = text.split('\n')[1].replace('#', '')
    
    print("푸시알림 보냄")
    return Response(status=status.HTTP_200_OK)
