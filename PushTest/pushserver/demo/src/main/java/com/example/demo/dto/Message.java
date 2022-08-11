package com.example.demo.dto;

import com.google.api.services.storage.model.Notification;

import lombok.Data;

@Data
public class Message {
  private Notification notification;
  private String token;
}
