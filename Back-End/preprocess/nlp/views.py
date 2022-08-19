from email import message
from email.mime import image
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
    new_sentence = okt.morphs(new_sentence, stem=True)
    new_sentence = [word for word in new_sentence if not word in stopwords]
    encoded = tokenizer.texts_to_sequences([new_sentence])
    pad_new = pad_sequences(encoded, maxlen=50)
    score = float(loaded_model.predict(pad_new))
    if score > 0.5:
        print("{:.2f}% 확률로 공지입니다.\n".format(score*100))
        return True
    else:
        print("{:.2f}% 확률로 공지가 아닙니다.\n".format((1 - score) * 100))
        return False


@api_view(['POST'])
def preprocess(request):
    print("1.Webhook In")
    def image_process(message, file_id):
        res = driver.files.get_file(file_id)
        filename = f"{file_id}.jpg"
        completeName = os.path.join(f"/home/ubuntu/imageServer/images", filename)
        with open(completeName, "wb") as f:
            f.write(res.content)

        try:
            data = driver.files.get_file(file_ids).content

            encoded_img = np.fromstring(data, dtype = np.uint8)
            img = cv2.imdecode(encoded_img, cv2.IMREAD_COLOR)

            ocr = pytesseract.image_to_string(img, "Hangul+eng", config="--oem 3 --psm 4")

            message += "\n"
            message += ocr

            return message

        except Exception as e:
            logger.info(e)

    def preprocess_message(data):
        data = re.sub(r'[^가-힣1-9]', ' ', data)
        data = data.replace('  ', ' ')
        data = data.replace('\n', ' ')
        idx = 1
        result = ''
        while idx < len(data)-3:
            result += data[idx]
            if data[idx-1] == ' ' and data[idx+1] == ' ' and data[idx+3] == ' ':
                idx +=1
            idx += 1

        return result

    driver.login()
    text = request.data.get('text')
    message = text[:]
    file_ids = request.data.get('file_ids')

    if file_ids:
        for file_id in file_ids.split(","):
            message = image_process(message, file_id)

    if not file_ids:
        file_ids = '[]'


    cnt = 1
    while True:
        title = message.split("\n")[cnt]
        if title:
            break
        else:
            cnt += 1

    message = preprocess_message(message)

    if predict(message):
        channel_id = request.data.get('channel_id')
        description = message
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
    def rm_emoji(data):
        parser = re.compile(":.{0,20}:")
        emojis = parser.findall(data)
        data = data.replace(emojis[0], "")
        return data

    def duedate_process(duedate):
        if duedate[:2] != '20'and duedate[:2] != 22 and duedate[0] != 0:
            duedate = '20220' + duedate
        elif duedate[:2] != '20'and duedate[:2] != 22:
            duedate = '2022' + duedate
        elif duedate[:2] == 22:
            duedate = '20' + duedate
        duedate = duedate + (12 - len(duedate)) * '0'
        return duedate

    def parse_context(text):
        cnt = 1
        while True:
            if text.split('\n')[cnt]:
                break
            cnt += 1

        title = text.split('\n')[cnt].replace('#', '')
        string = text.split('\n')[cnt+1]
        duedate = re.sub(r'[^0-9]', '', string)
        description = "\n".join(text.split('\n')[cnt+1:])

        return title, duedate, description

    def save_images(file_id):
        res = driver.files.get_file(file_id)
        filename = f"{file_id}.jpg"
        completeName = os.path.join(f"/home/ubuntu/imageServer/images", filename)
        with open(completeName, "wb") as f:
            f.write(res.content)

    driver.login()
    text = request.data.get('text')
    channel_id = request.data.get('channel_id')
    timestamp = request.data.get('timestamp')
    date = str(datetime.datetime.fromtimestamp(timestamp//1000)).split()[0].replace('-', '')

    title, duedate, description = parse_context(text)
    duedate = duedate_process(duedate)

    file_ids = request.data.get('file_ids')


    if not file_ids:
        file_ids = '[]'

    else:
        for file_id in file_ids.split(","):
            save_images(file_id)
    
    if not title:
        title=message[0]
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
        notice = serializer.save()
        print("Notice saved")
        logger.info("Notice saved")
        notice_id = notice.id

    else:
        logger.info("failed to save Notice")

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
    if serializer.is_valid():
        serializer.save()
        logger.info(serializer)
        print("Todo saved")
        logger.info("Todo saved")
        return Response(status=status.HTTP_201_CREATED)

    logger.info("failed to save Todo")
    return Response(status=status.HTTP_200_OK)