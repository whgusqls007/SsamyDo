import pandas as pd
from mattermostdriver import Driver
from requests import post
from requests import models
from requests.models import Response
import json
import numpy as np
import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = "C://Program Files/Tesseract-OCR"
foo = Driver(
    {
        "url": "meeting.ssafy.com",
        "login_id": "jayl2cu@gmail.com",
        "password": "Jaylee15@@",
        "port": 443,
    }
)

foo.login()
# user_id = foo.users.get_user(user_id='me')['id']
# print(foo.teams.get_user_teams(user_id))
import os
file_id = "sqj4o3o7stdofeimh1tef71qga"
# # for file_id in file_ids:
res = foo.files.get_file(file_id)
    # encoded_img = np.fromstring(res.content, dtype = np.uint8)
    # img = cv2.imdecode(encoded_img, cv2.IMREAD_GRAYSCALE)
    
    # ocr = pytesseract.image_to_string(encoded_img, lang="kor")
filename = f"{file_id}.jpg"  
completeName = os.path.join("./images", filename)       
with open(completeName, "wb") as f:
    f.write(res.content)
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


# print(res.headers)
# import base64

# encoded = base64.b64encode(res.content)
# # # print(encoded)

# # imgdata = base64.b64decode(encoded)
# I assume you have a way of picking unique filenames



# tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

# import pytesseract
# import cv2

# oem = 3
# psm = 4

# # traineddata = "kor"

# import numpy as np
# # img = cv2.imread()

# encoded_img = np.fromstring(res.content, dtype=np.uint8)
# img = cv2.imdecode(encoded_img, cv2.IMREAD_COLOR)

# result = pytesseract.image_to_string(img, "kor", config="--oem 3 --psm 4")
# # ocr_result = pytesseract.image_to_string(
# #     image=img, lang="kor", config="--oem " + str(oem) + " --psm " + str(psm)
# # )

# print(result)
