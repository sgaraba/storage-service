package com.esempla.storage.config;

import jakarta.validation.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * Properties specific to Storage Service.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link tech.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "storage", ignoreUnknownFields = false)
public record ApplicationProperties(Minio minio) {
    public record Minio(
        @NotEmpty String url,
        @NotEmpty String accessKey,
        @NotEmpty String secretKey,
        @NotEmpty String bucket
    ){
    }
}
