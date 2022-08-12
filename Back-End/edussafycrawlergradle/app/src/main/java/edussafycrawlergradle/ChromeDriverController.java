package edussafycrawlergradle;

import java.util.List;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class ChromeDriverController {
    public ChromeDriver chromeDriver;
    protected ChromeOptions chromeOptions;
    protected String Email = "jo7hb@naver.com";
    protected String PW = "qlalfqjsgh4*";

    protected ChromeDriverController() {
        initDriver();
    }

    protected List<WebElement> findElementsByTagName(String tagName) {
        return getElements(By.tagName(tagName));
    }

    protected List<WebElement> findElementsByTagName(WebElement elem, String tagName) {
        return getElements(elem, By.tagName(tagName));
    }

    protected WebElement findElementByTagName(String tagName) {
        return getElement(By.tagName(tagName));
    }

    protected WebElement findElementByTagName(WebElement elem, String tagName) {
        return getElement(elem, By.tagName(tagName));
    }

    protected List<WebElement> findElementsByClassName(String className) {
        return getElements(By.className(className));
    }

    protected List<WebElement> findElementsByClassName(WebElement elem, String className) {
        return getElements(elem, By.className(className));
    }

    protected WebElement findElementByClassName(String className) {
        return getElement(By.className(className));
    }

    protected WebElement findElementByClassName(WebElement elem, String className) {
        return getElement(elem, By.className(className));
    }

    protected List<WebElement> findElementsById(String id) {
        return getElements(By.id(id));
    }

    protected List<WebElement> findElementsById(WebElement elem, String id) {
        return getElements(elem, By.id(id));
    }

    protected WebElement findElementById(String id) {
        return getElement(By.id(id));
    }

    protected WebElement findElementById(WebElement elem, String id) {
        return getElement(elem, By.id(id));
    }

    protected List<WebElement> findElementsByXpath(String xpath) {
        return getElements(By.xpath(xpath));
    }

    protected List<WebElement> findElementsByXpath(WebElement elem, String xpath) {
        return getElements(elem, By.xpath(xpath));
    }

    protected WebElement findElementByXpath(String xpath) {
        return getElement(By.xpath(xpath));
    }

    protected WebElement findElementByXpath(WebElement elem, String xpath) {
        return getElement(elem, By.xpath(xpath));
    }

    private List<WebElement> getElements(By locator) {
        List<WebElement> webElementList = null;

        int count = 0;
        while (true) {
            try {
                webElementList = chromeDriver.findElements(locator);
                break;
            } catch (NoSuchElementException e) {
                if (++count == 500) {
                    return null;
                }
                continue;
            }
        }

        return webElementList;
    }

    private List<WebElement> getElements(WebElement elem, By locator) {
        List<WebElement> webElementList = null;

        while (true) {
            try {
                webElementList = elem.findElements(locator);
                break;
            } catch (NoSuchElementException e) {
                continue;
            }
        }

        return webElementList;
    }

    private WebElement getElement(By locator) {
        WebElement webElement = null;

        int count = 0;
        while (true) {
            try {
                webElement = this.chromeDriver.findElement(locator);
                break;
            } catch (NoSuchElementException e) {
                if (++count == 500) {
                    return null;
                }
                continue;
            }
        }

        return webElement;
    }

    private WebElement getElement(WebElement elem, By locator) {
        WebElement webElement = null;

        while (true) {
            try {
                webElement = elem.findElement(locator);
                break;
            } catch (NoSuchElementException e) {
                continue;
            }
        }

        return webElement;
    }

    protected void move(String url) {
        chromeDriver.get(url);

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return;
    }

    protected void initDriver() {

        chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("headless");
        // chromeOptions.addArguments("--start-maximized");
        chromeOptions.addArguments("--window-size=1920x1080");

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    protected Boolean checkStatus(WebElement webElement) {
        if (webElement == null) {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            closeDriver();
            openDriver();
            loginIntoEdussafy();
            return true;
        }

        return false;
    }

    protected Boolean checkStatus(List<WebElement> webElementList) {
        if (webElementList == null) {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            closeDriver();
            openDriver();
            loginIntoEdussafy();
            return true;
        }

        return false;
    }

    protected void openDriver() {
        chromeDriver = new ChromeDriver(chromeOptions);

    }

    protected void closeDriver() {
        chromeDriver.quit();

        return;
    }

    protected void loginIntoEdussafy() {
        move("https://edu.ssafy.com/comm/login/SecurityLoginForm.do");

        WebElement elem = chromeDriver.findElement(By.id("userId"));
        elem.sendKeys(this.Email);
        elem = chromeDriver.findElement(By.id("userPwd"));
        elem.sendKeys(this.PW);
        elem = chromeDriver.findElement(By.xpath("/html/body/div[1]/div/div/div[2]/form/div/div[2]/div[3]/a"));
        elem.click();

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return;
    }

    protected void startCrawling() {
        return;
    };
}
