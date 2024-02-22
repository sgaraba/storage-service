package com.esempla.storage.config;

import io.minio.MinioClient;
import io.minio.errors.MinioException;
import io.minio.messages.Bucket;

import java.util.List;

public class MinioConfiguration {
    public static void main() {//String[] args
        MinioClient minioClient = demo();
        try {
            List<Bucket> bucketList = minioClient.listBuckets();
            System.out.println("Connection succes, total buckets: " + bucketList.size());
        } catch (
            MinioException e) {
            System.out.println("Connection failed: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private static MinioClient demo () {
        MinioClient minioClient = MinioClient.builder()
            .endpoint("https://play.min.io")
            .credentials("Q3AM3UQ867SPQQA43P2F", "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG")
            .build();
        return minioClient;
    }
}
