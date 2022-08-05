package com.example.demo.service;

import java.io.FileNotFoundException;
import java.util.Map;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;

public interface ImageService {
    Map<String, Object> getImage(String fileName) throws FileNotFoundException;

    FileSystemResource getResource(String fileName) throws FileNotFoundException;

    HttpHeaders getHeader(String fileName);
}
