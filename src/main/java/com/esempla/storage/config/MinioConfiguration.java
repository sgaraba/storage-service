package com.esempla.storage.config;

import io.minio.MinioClient;
import io.minio.errors.MinioException;
import io.minio.messages.Bucket;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class MinioConfiguration {


    private final ApplicationProperties properties;

    public MinioConfiguration(ApplicationProperties properties) {
        this.properties = properties;
    }

    @Bean
    public MinioClient minioClient() {
        ApplicationProperties.Minio minio = properties.minio();
        MinioClient minioClient = MinioClient.builder()
            .endpoint(minio.url())
            .credentials(minio.accessKey(), minio.secretKey())
            .build();
        return minioClient;
    }
}
