package com.esempla.storage.service;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.User;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.repository.UserReservationRepository;
import org.springframework.stereotype.Service;

@Service
public class StorageFileService {
    private final StorageFileRepository storageFileRepository;

    public StorageFileService(StorageFileRepository storageFileRepository) {
        this.storageFileRepository = storageFileRepository;
    }

    public StorageFile createStorageFile(String name, Long size, String mimeType, String path, User user){
        StorageFile storageFile = new StorageFile();
        storageFile.setName(name);
        storageFile.setSize(size);
        storageFile.setMimeType(mimeType);
        storageFile.setPath(path);
        storageFile.setUser(user);
        storageFile.setCreatedBy(user.getLogin());

        return storageFile;
    }
}
