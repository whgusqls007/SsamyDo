from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
import re


options = Options()
options.add_argument("--start-fullscreen")
options.add_argument("headless")

driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

driver.get("http://welplus.welstory.com/#/login")
driver.implicitly_wait(100)

x = driver.find_element(By.CLASS_NAME, "close")
x.click()

login_btn = driver.find_element(By.CLASS_NAME, "btn-type1")
login_btn.click()

username = driver.find_element(By.NAME, "username")
username.send_keys("whgusqls007")

pwd = driver.find_element(By.NAME, "password")
pwd.send_keys("qlalfqjsgh4*")

login = driver.find_elements(By.CLASS_NAME, "btn-type1")[1]
login.click()

time.sleep(1)

driver.get("http://welplus.welstory.com/#/meal")

thumbs = driver.find_elements(By.CLASS_NAME, "meal-item-type1")

time.sleep(1)

menu_names = driver.find_elements(By.CLASS_NAME, "tit")
menu_details = driver.find_elements(By.CLASS_NAME, "txt-desc")

parser = re.compile("http://\S*.jpg")
for i in range(1, 5):
    img = driver.find_element(
        By.XPATH, f'//*[@id="contents"]/div[4]/ul/li[{i}]/div/div[1]/a'
    )
    style = img.get_attribute("style")
    store = driver.find_element(
        By.XPATH, f'//*[@id="contents"]/div[4]/ul/li[{i}]/div/div[2]/a/div/span[1]/img'
    )

    print(menu_names[i].text)
    print(menu_details[i].text)
    print(parser.findall(style)[0])
    print(store.get_attribute("alt"))
    print()
