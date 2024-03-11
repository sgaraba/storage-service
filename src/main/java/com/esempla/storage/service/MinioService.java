package com.esempla.storage.service;

import com.esempla.storage.config.ApplicationProperties;
import com.esempla.storage.config.ApplicationReadyListener;
import io.minio.*;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.MinioException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Service
public class MinioService {

    private final MinioClient minioClient;
    private ApplicationProperties applicationProperties;
@Autowired
    public MinioService(MinioClient minioClient, ApplicationProperties applicationProperties) {
        this.minioClient = minioClient;
        this.applicationProperties = applicationProperties;
    }

    private final Logger log = LoggerFactory.getLogger(MinioService.class);

    public MinioService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public void createBucket(String bucketName) throws MinioException {
        try {
            boolean bucketExists = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (!bucketExists) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket("storage/" + bucketName).build());
            }
        } catch (ErrorResponseException e) {
            throw new MinioException("Error creating bucket: " + bucketName + e);
        } catch (Exception e) {
            throw new MinioException("Unexpected error occurred while creating bucket: " + bucketName + e);
        }
    }
    public void createSubdirectory(String subdirectoryName) throws MinioException {
        String bucketName = applicationProperties.minio().bucket();
        try {
            // Create an empty object in the subdirectory
            minioClient.putObject(PutObjectArgs.builder()
                .bucket(bucketName)
                .object(subdirectoryName + "/")
                .stream(InputStream.nullInputStream(), 0, -1)
                .build());
        } catch (ErrorResponseException e) {
            throw new MinioException("Error creating subdirectory: " + subdirectoryName + " in bucket: " + bucketName + e);
        } catch (Exception e) {
            throw new MinioException("Unexpected error occurred while creating subdirectory: " + subdirectoryName + " in bucket: " + bucketName + e);
        }
    }
    public void uploadObject(String objectName, byte[] data, String login) {
        String fullObjectName = login + "/" + objectName;
        try {
            minioClient.putObject(
                PutObjectArgs.builder()
                    .bucket(applicationProperties.minio().bucket())
                    .object(fullObjectName)
                    .stream(new ByteArrayInputStream(data), data.length, -1)
                    .build());
            System.out.println(objectName + " is successfully uploaded to bucket " + applicationProperties.minio().bucket() + ".");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteObject(String objectName, String login) {
        try {
            String bucketName = applicationProperties.minio().bucket();
            objectName = "test.txt";
            String fullObjectName = login + "/" + objectName;

            minioClient.removeObject(
                RemoveObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fullObjectName)
                    .build());

            System.out.println(objectName + " is successfully deleted from subdirectory " + login + " of bucket " + bucketName + ".");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
