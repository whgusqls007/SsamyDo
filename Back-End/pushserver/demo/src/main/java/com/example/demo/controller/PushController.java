package com.example.demo.controller;

import lombok.RequiredArgsConstructor;

import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RequestDTO;
import com.example.demo.service.HttpUtil;

import io.github.jav.exposerversdk.ExpoPushMessage;
import io.github.jav.exposerversdk.PushClient;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PushController {

  HttpUtil httpUtil = new HttpUtil();

  @PostMapping("/api/fcm")
  public ResponseEntity pushMessage(@RequestBody RequestDTO requestDTO)
      throws Exception {
    // List<JSONObject> list = httpUtil.apiTestGet();

    String recipient = requestDTO.getTargetToken();
    String title = requestDTO.getTitle();
    String message = requestDTO.getBody();

    System.out.println(recipient + title + message);

    if (!PushClient.isExponentPushToken(recipient))
      throw new Error("Token:" + recipient + " is not a valid token.");

    ExpoPushMessage expoPushMessage = new ExpoPushMessage();
    expoPushMessage.getTo().add(recipient);
    expoPushMessage.setTitle(title);
    expoPushMessage.setBody(message);

    List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
    expoPushMessages.add(expoPushMessage);

    PushClient client = new PushClient();

    List<List<ExpoPushMessage>> chunks = client.chunkPushNotifications(expoPushMessages);

    for (List<ExpoPushMessage> chunk : chunks) {
      client.sendPushNotificationsAsync(chunk);
    }

    return ResponseEntity.ok().build();
  }
}