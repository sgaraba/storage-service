package com.esempla.storage.config;

import io.minio.MinioClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class ApplicationReadyListener implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger log = LoggerFactory.getLogger(ApplicationReadyListener.class);

    private final MinioClient minioClient;

    public ApplicationReadyListener(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        log.info("Application is ready");
        // Create storage bucket

    }
}
