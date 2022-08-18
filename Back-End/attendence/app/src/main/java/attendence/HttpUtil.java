package attendence;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class HttpUtil {
  public List<JSONObject> apiGet() throws Exception {
    URL url = null;
    String readLine = null;
    StringBuilder buffer = null;
    BufferedReader bufferedReader = null;
    BufferedWriter bufferedWriter = null;
    HttpURLConnection urlConnection = null;

    String apiUrl = "http://i7e204.p.ssafy.io:8080/api/getUsers";

    try {
      url = new URL(apiUrl);
      urlConnection = (HttpURLConnection) url.openConnection();
      urlConnection.setRequestMethod("GET");
      urlConnection.setRequestProperty("Accept", "*/*");
      urlConnection.setRequestProperty("Authorization",
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNjYxMDE2OTEyfQ.RPqwqSiWJgqfUMlKEZrYsQhdkmpk3vevjAA-PMa85vk0hgvldBfKWZj6hpCoMrfY0KjP_LdGC61vCw8Qc_rFSw");

      buffer = new StringBuilder();

      if (urlConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
        bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));
        while ((readLine = bufferedReader.readLine()) != null) {
          buffer.append(readLine).append("\n");
        }
      } else {
        buffer.append("code : ");
        buffer.append(urlConnection.getResponseCode()).append("\n");
        buffer.append("message : ");
        buffer.append(urlConnection.getResponseMessage()).append("\n");
      }
    } catch (Exception ex) {
      ex.printStackTrace();
    } finally {
      try {
        if (bufferedWriter != null) {
          bufferedWriter.close();
        }
        if (bufferedReader != null) {
          bufferedReader.close();
        }
      } catch (Exception ex) {
        ex.printStackTrace();
      }
    }
    JSONParser jsonParser = new JSONParser();
    JSONObject obj = (JSONObject) jsonParser.parse(buffer.toString());
    JSONArray jsonArray = (JSONArray) obj.get("data");

    List<JSONObject> list = new ArrayList<>();

    for (int i = 0; i < jsonArray.size(); i++) {
      JSONObject jsonObject = (JSONObject) jsonArray.get(i);
      String fcmToken = (String) jsonObject.get("fcmToken");

      if (fcmToken == null || fcmToken.equals("")) {
        continue;
      }

      list.add((JSONObject) jsonArray.get(i));
    }

    return list;
  }
}
