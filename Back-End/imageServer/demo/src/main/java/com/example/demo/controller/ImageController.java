package com.example.demo.controller;

import java.io.FileNotFoundException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.ImageService;

@RestController
public class ImageController {

    @Autowired
    ImageService imageService;

    @GetMapping("/api/image/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        Map<String, Object> map = null;
        FileSystemResource resource = null;
        HttpHeaders header = null;
        try {
            map = imageService.getImage(fileName);
            resource = (FileSystemResource) map.get("resource");
            header = (HttpHeaders) map.get("header");
        } catch (FileNotFoundException e) {
            return new ResponseEntity<>(null, null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(resource, header, HttpStatus.OK);
    }
}
