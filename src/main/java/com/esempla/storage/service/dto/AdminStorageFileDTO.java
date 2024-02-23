package com.esempla.storage.service.dto;

import com.esempla.storage.domain.StorageFile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.time.Instant;

public class AdminStorageFileDTO implements Serializable {


    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank
    @Size(min = 1, max = 255)
    private String name;

    private Long size;

    @Size(max = 255)
    private String mimeType;

    @Size(max = 255)
    private String path;

    private Long userId;

    private String createdBy;

    private Instant createdDate;

    public AdminStorageFileDTO(){

    }

    public AdminStorageFileDTO(StorageFile storageFile) {
        this.id = storageFile.getId();
        this.name = storageFile.getName();
        this.size = storageFile.getSize();
        this.mimeType = storageFile.getMimeType();
        this.path = storageFile.getPath();
        this.userId = storageFile.getUser().getId();
        this.createdBy = storageFile.getCreatedBy();
        this.createdDate = storageFile.getCreatedDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }
}
