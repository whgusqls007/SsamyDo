import pytesseract
import cv2
import numpy as np
from mattermostdriver import Driver
tesseract_cmd = 'C:\\Program Files\Tesseract-OCR\\tesseract.exe'

driver = Driver({
    "url" : "meeting.ssafy.com",
    "login_id" : "jayl2cu@gmail.com",
    "password": "Jaylee15@@",
    "port" : 443,
    })


driver.login()

file_id = "sqj4o3o7stdofeimh1tef71qga"

data = driver.files.get_file(file_id).content

encoded_img = np.fromstring(data, dtype = np.uint8)
img = cv2.imdecode(encoded_img, cv2.IMREAD_GRAYSCALE)
print("돼줘")
ocr = pytesseract.image_to_string(img, config="--psm 6")
print(ocr)