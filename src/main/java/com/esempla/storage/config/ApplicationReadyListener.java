package com.esempla.storage.config;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.errors.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Component
public class ApplicationReadyListener implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger log = LoggerFactory.getLogger(ApplicationReadyListener.class);

    private final MinioClient minioClient;
    private final ApplicationProperties applicationProperties;

    public ApplicationReadyListener(MinioClient minioClient, ApplicationProperties applicationProperties) {
        this.minioClient = minioClient;
        this.applicationProperties = applicationProperties;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        log.info("Application is ready");
        // Create storage bucket
       String name =applicationProperties.minio().bucket();
        boolean bucketExists = false;
        try {
            bucketExists = minioClient.bucketExists(BucketExistsArgs.builder().bucket(name).build());
            if (!bucketExists) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(name).build());
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
