// package com.example.demo.config;

// import com.google.auth.oauth2.GoogleCredentials;
// import com.google.firebase.FirebaseApp;
// import com.google.firebase.FirebaseOptions;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.core.io.Resource;

// import javax.annotation.PostConstruct;
// import java.io.FileInputStream;
// import java.io.IOException;
// import java.util.*;

// @Configuration
// public class FirebaseConfig {

//   @Value("classpath:keystore/firebase_key.json")
//   private Resource resource;

//   @PostConstruct
//   public void initFirebase() throws IOException {
//     try {
//       FileInputStream serviceAccount = new FileInputStream(
//           "D:/pushserver/demo/src/main/resources/keystore/firebase_key.json");

//       FirebaseOptions options = new FirebaseOptions.Builder()
//           .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//           .build();

//       FirebaseApp.initializeApp(options);
//     } catch (Exception e) {
//       // do nothing
//     }
//   }
// }