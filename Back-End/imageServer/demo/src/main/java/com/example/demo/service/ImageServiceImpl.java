package com.example.demo.service;

import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service("ImageService")
public class ImageServiceImpl implements ImageService {

    final String path = "./images/";
    final String[] extension = { ".jpg", ".jpeg", ".png" };
    String currentExtension = "";

    @Override
    public Map<String, Object> getImage(String fileName) throws FileNotFoundException {
        Map<String, Object> map = new HashMap<>();
        try {
            FileSystemResource resource = this.getResource(fileName);
            HttpHeaders header = this.getHeader(fileName);

            map.put("resource", resource);
            map.put("header", header);
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException();
        }

        return map;
    }

    @Override
    public FileSystemResource getResource(String fileName) throws FileNotFoundException {
        FileSystemResource resource = null;
        try {
            int i;
            for (i = 0; i < 3; i++) {
                resource = new FileSystemResource(path + fileName + extension[i]);
                if (!resource.exists()) {
                    resource = null;
                    this.currentExtension = "";
                } else {
                    this.currentExtension = extension[i];
                    break;
                }
            }
            if (resource == null) {
                throw new FileNotFoundException();
            }
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException();
        }
        return resource;
    }

    @Override
    public HttpHeaders getHeader(String fileName) {
        HttpHeaders header = new HttpHeaders();
        try {
            Path filePath = null;
            filePath = Paths.get(path + fileName + this.currentExtension);
            header.add("Content-Type", Files.probeContentType(filePath));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return header;
    }

}
