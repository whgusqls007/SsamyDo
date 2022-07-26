from selenium import webdriver
from selenium.webdriver.common.by import By
import os
import time
import re

# still not work on windows because of device type
os.environ["SELENIUM_SERVER_JAR"] = "selenium-server-standalone-2.41.0.jar"

browser = webdriver.Safari()

browser.get("http://welplus.welstory.com/")
browser.implicitly_wait(100)

x = browser.find_element(By.CLASS_NAME, 'close')
x.click()

time.sleep(1)
login_btn = browser.find_element(By.CLASS_NAME, 'btn-type1')
login_btn.click()

username = browser.find_element(By.NAME, 'username')
username.send_keys("username")

pwd = browser.find_element(By.NAME, 'password')
pwd.send_keys("password")

browser.implicitly_wait(10)

login = browser.find_elements(By.CLASS_NAME, 'btn-type1')[1]
login.click()

time.sleep(1)

browser.get("http://welplus.welstory.com/#/meal")

thumbs = browser.find_elements(By.CLASS_NAME, 'meal-item-type1')

time.sleep(1)

menu_names = browser.find_elements(By.CLASS_NAME, 'tit')
menu_details = browser.find_elements(By.CLASS_NAME, 'txt-desc')

parser = re.compile("http://\S*.jpg")
for i in range(1, 5):
    img = browser.find_element(By.XPATH, f'//*[@id="contents"]/div[4]/ul/li[{i}]/div/div[1]/a')
    style = img.get_attribute("style")
    store = browser.find_element(By.XPATH, f'//*[@id="contents"]/div[4]/ul/li[{i}]/div/div[2]/a/div/span[1]/img')

    print(i, menu_names[i].text, menu_details[i].text, parser.findall(style)[0], store)




