package com.esempla.storage.web.rest;
import com.esempla.storage.service.MinioService;
import io.minio.errors.MinioException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.access.prepost.PreAuthorize;

import java.io.IOException;

@RestController
//@RequestMapping("/api")
public class FileUploadController {

    private final MinioService minioService;

    public FileUploadController(MinioService minioService) {
        this.minioService = minioService;
    }

    @PostMapping("/api/upload")
    @PreAuthorize("permitAll()") // Allow unauthenticated access
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        try {
            if (file.isEmpty()) {
                return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
            }

            byte[] data;
            try {
                data = file.getBytes();
            } catch (IOException e) {
                return new ResponseEntity<>("Failed to read file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String fileName = file.getOriginalFilename();

            minioService.uploadObject(fileName, data, "test");

            return new ResponseEntity<>("File uploaded successfully: " + fileName, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Failed to upload file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
