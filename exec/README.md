### 시작하기

#### environment
- Ubuntu 20.04 LTS
- Expo SDK 45
- openjdk 1.8.0_342
- Django 3.2.12

#### Database

* MySQL 
  * Ver 8.0.30-0ubuntu0.20.04.2 for Linux on x86_64

```bash
# Load Database Schema
$ database_name < schema.sql
```

You should add authorities into your authority table for security

```sql
INSERT INTO authority VALUES "ROLE_USER";
INSERT INTO authority VALUES "ROLE_ADMIN";
```





#### Main Server, Image Server

* OpenJDK 1.8.0_342

```bash
# install open-jdk 1.8 if not exist
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install openjdk-8-jdk

# install gradle if not exist
$ sudo apt install gradle

# build gradle
$ gradlew build

# To start Main Server
$ java -jar ssamydo.jar

# To start Image Server
$ java -jar imageServer.jar

# To start Server on background
$ nohup java -jar ssamydo.jar &
$ nohup java -jar imageServer.jar &
```



#### Django Server

* Django 3.2.12

```bash
# make virtual environment
$ python -m venv venv

# active virtual environment
$ source venv/bin/activate

# install tesseract
$ sudo apt install tesseract-ocr

# install python modules
$ pip install -r requirements.txt

# Start Server
$ python3 manage.py runserver 0:8081
```

#### mealcrawler

* Python 3.8.10

```bash 

# add pymysql package
$ pip install pymysql

# add webdriver_manager package
$ pip install webdriver_manager

# add selenium package
$ pip install selenium

# start Crawling
$ python3 mealcrawler.py

# start Crawling background
$ nohup python3 mealcrawler.py &
```

#### edussafycrawling, attendence Push Server

* OpenJDK 1.8.0_342
* gradle 
```bash

# before user attendence push server, you should join firebase console first

# install open-jdk 1.8 if not exist
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install openjdk-8-jdk

# install gradle if not exist
$ sudo apt install gradle

# add jar files to jre directory if necessary
$ cp /jarFile/<*.jar> <*.jar> ... /usr/lib/jvm/java-8-openjdk-amd64/jre/

# build gradle
$ gradlew build

# start Application
$ java -jar build/libs/app.jar

# To start App on background
$ nohup java -jar build/libs/app.jar &
```

### client

* expo SDK 45

```bash
  # before installing, you need install node, npm first

  # install expo-cli
  $ npm install -g expo-cli

  # get node modules
  $ npm install
  
  # if you get error try
  $ npm install --legacy-deer-deps 
  # or
  $ npm install --force

  # start expo
  $ npx expo start
  # or
  $ expo start

  # build
  # android
  $ expo build:android
  # ios
  $ expo build:ios
```
