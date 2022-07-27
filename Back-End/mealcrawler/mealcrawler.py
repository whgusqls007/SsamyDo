from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime
import pymysql
import time
import re


class Driver:
    driver = ""
    options = ""

    def __init__(self) -> None:
        self.driver
        self.options = self.initOptions()

    def initOptions(self):
        options = Options()
        options.add_argument("--start-fullscreen")
        options.add_argument("headless")
        return options

    def open(self):
        self.driver = webdriver.Chrome(
            ChromeDriverManager().install(), options=self.options
        )
        return

    def close(self):
        self.driver.close()
        return

    def move(self, url):
        self.driver.get(url)
        time.sleep(5)
        return

    def find(self, locator, selector):
        count = 0
        while True:
            if count >= 500:
                self.driver.refresh()
                time.sleep(5)
                count = 0

            try:
                element = self.driver.find_element(locator, selector)
                return element
            except:
                count += 1
                continue

    def findAll(self, locator, selector):
        count = 0
        while True:
            if count >= 500:
                self.driver.refresh()
                time.sleep(5)
                count = 0

            try:
                element = self.driver.find_elements(locator, selector)
                return element
            except:
                count += 1
                continue


def insertIntoDataBase(main, detail, date, store, img):
    conn = pymysql.connect(
        host="stg-yswa-kr-practice-db-master.mariadb.database.azure.com",
        user="S07P12E204@stg-yswa-kr-practice-db-master",
        password="F7MCkOqbj8",
        db="S07P12E204",
        charset="utf8",
        port=3306,
    )

    cur = conn.cursor()
    query = "SELECT * FROM lunch WHERE date=%s AND store=%s"
    cur.execute(query, (date, store))
    result = cur.fetchall()

    if len(result) > 0:
        query = "UPDATE lunch SET main=%s, detail=%s, date=%s, store=%s, img=%s WHERE date=%s AND store=%s"
        cur.execute(query, (main, detail, date, store, img, date, store))
        print("업데이트")
    else:
        query = (
            "insert into lunch (main, detail, date, store, img) values (%s,%s,%s,%s,%s)"
        )
        cur.execute(query, (main, detail, date, store, img))
        print("삽입")
    conn.commit()
    cur.close()
    conn.close()


if __name__ == "__main__":
    flag = False
    driver = Driver()
    driver.initOptions()
    driver.open()

    while True:
        hour = datetime.now().hour
        minute = datetime.now().minute
        second = datetime.now().second

        if (
            (hour == 9 and minute == 0 and second == 0)
            or (hour == 14 and second == 20)
            or (hour == 14 and second == 50)
        ):

            flag = True
            
            driver.move("http://welplus.welstory.com/#/login")

            x = driver.find(By.CLASS_NAME, "close")
            x.click()

            login_btn = driver.find(By.CLASS_NAME, "btn-type1")
            login_btn.click()

            username = driver.find(By.NAME, "username")
            username.send_keys("whgusqls007")

            pwd = driver.find(By.NAME, "password")
            pwd.send_keys("qlalfqjsgh4*")

            login = driver.findAll(By.CLASS_NAME, "btn-type1")[1]
            login.click()

            time.sleep(1)

            driver.move("http://welplus.welstory.com/#/meal")

            thumbs = driver.findAll(By.CLASS_NAME, "meal-item-type1")

            time.sleep(1)

            menu_names = driver.findAll(By.CLASS_NAME, "tit")
            menu_details = driver.findAll(By.CLASS_NAME, "txt-desc")

            parser = re.compile("http://\S*.jpg|http://\S*.png")
            for i in range(1, 5):
                img = driver.find(
                    By.XPATH, f"/html/body/div[1]/main/div[4]/ul/li[{i}]/div/div[1]/a"
                )
                style = img.get_attribute("style")
                store = driver.find(
                    By.XPATH,
                    f'//*[@id="contents"]/div[4]/ul/li[{i}]/div/div[2]/a/div/span[1]/img',
                )
                insertIntoDataBase(
                    menu_names[i].text,
                    menu_details[i].text,
                    datetime.now().strftime("%Y%m%d"),
                    store.get_attribute("alt"),
                    parser.findall(style)[0],
                )
                print(
                    menu_names[i].text,
                    menu_details[i].text,
                    datetime.now().strftime("%Y%m%d"),
                    store.get_attribute("alt"),
                    parser.findall(style)[0],
                )

            driver.close()
