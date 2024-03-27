package com.esempla.storage.service.dto;

import com.esempla.storage.domain.StorageFile;

import java.io.Serializable;

public class UploadFileDTO implements Serializable {
    private String name;
    private byte[] data;
    private String mimeType;

    public UploadFileDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }
}
