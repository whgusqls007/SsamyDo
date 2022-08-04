import pandas as pd
from mattermostdriver import Driver
from requests import post
from requests import models
from requests.models import Response
import json

foo = Driver(
    {
        "url": "meeting.ssafy.com",
        "login_id": "jayl2cu@gmail.com",
        "password": "Jaylee15@@",
        "port": 443,
    }
)

foo.login()

# print("로그인 성공")


# # print(foo.users.get_user(user_id='me'))

# user_id = foo.users.get_user(user_id='me')['id']

# user_teams = foo.teams.get_user_teams(user_id)

# messages = []
# for user_team in user_teams:
#     team_id = user_team['id']

#     channels = foo.channels.get_channel_for_user(user_id, team_id)
#     for channel in channels:
#         if "공지" in channel['display_name']:
#             try:
#                 channel_id = channel['id']
#                 dictionary = foo.posts.get_posts_for_channel(channel_id, {"since":1640962800})
#                 for post in dictionary['posts'].values():
#                     if '팀에 가입' not in post['message'] and '채널에 추가' not in post['message'] and '채널에 들어' not in post['message'] and '채널을 떠났' not in post['message'] and len(post['message']) > 30:
#                         messages.append(post['message'])

#             except:
#                 continue


# print(messages)

# df = pd.DataFrame(messages)
# df['flag'] = 0
# # df.to_csv('data.txt')
# df.to_excel('labeldata.xls')


# import pandas as pd


# df = pd.read_csv('mattermost_data.txt', sep="§")
# print(df)

res = foo.files.get_file("sqj4o3o7stdofeimh1tef71qga")
print(res.headers)
import base64

encoded = base64.b64encode(res.content)
# # print(encoded)

# imgdata = base64.b64decode(encoded)
filename = "some_image.jpg"  # I assume you have a way of picking unique filenames
with open(filename, "wb") as f:
    f.write(res.content)


tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

import pytesseract
import cv2

oem = 3
psm = 4

traineddata = "kor"

# img = cv2.imread(encoded)
import numpy as np

encoded_img = np.fromstring(res.content, dtype=np.uint8)
img = cv2.imdecode(encoded_img, cv2.IMREAD_COLOR)

ocr_result = pytesseract.image_to_string(
    image=img, lang=traineddata, config="--oem " + str(oem) + " --psm " + str(psm)
)

print(ocr_result)
