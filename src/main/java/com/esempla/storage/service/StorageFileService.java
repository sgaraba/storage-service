package com.esempla.storage.service;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.User;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.repository.UserRepository;
import com.esempla.storage.service.dto.AdminStorageFileDTO;
import com.esempla.storage.service.dto.AdminUserDTO;
import com.esempla.storage.service.dto.UploadFileDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;

@Service
public class StorageFileService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final StorageFileRepository storageFileRepository;

    private final UserRepository userRepository;
    private final MinioService minioService;

    public StorageFileService(StorageFileRepository storageFileRepository, UserRepository userRepository, MinioService minioService) {
        this.storageFileRepository = storageFileRepository;
        this.userRepository = userRepository;
        this.minioService = minioService;
    }

    public StorageFile createStorageFile(AdminStorageFileDTO adminStorageFileDTO){
        User user = userRepository.findById(adminStorageFileDTO.getUserId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        StorageFile storageFile = new StorageFile();
        storageFile.setName(adminStorageFileDTO.getName());
        storageFile.setPath(adminStorageFileDTO.getPath());
        storageFile.setMimeType(adminStorageFileDTO.getMimeType());
        storageFile.setSize(adminStorageFileDTO.getSize());
        storageFile.setUser(user);
        storageFile.setCreatedBy(user.getLogin());

        storageFileRepository.save(storageFile);
        return storageFile;
    }

    public StorageFile uploadNewFile(UploadFileDTO uploadFileDTO, String userLogin){
        User user = userRepository.findOneByLogin(userLogin)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String objectName = UUID.randomUUID().toString();
        minioService.uploadObject(objectName, uploadFileDTO.getData(), uploadFileDTO.getMimeType(), userLogin);


        StorageFile storageFile = new StorageFile();
        storageFile.setName(uploadFileDTO.getName());
        storageFile.setPath(userLogin + "/" + objectName);
        storageFile.setMimeType(uploadFileDTO.getMimeType());
        storageFile.setSize((long) uploadFileDTO.getData().length);
        storageFile.setUser(user);
        storageFile.setCreatedBy(user.getLogin());

        storageFileRepository.save(storageFile);
        return storageFile;
    }

    public Optional<AdminStorageFileDTO> updateStorageFile(AdminStorageFileDTO adminStorageFileDTO) {
        return Optional
            .of(storageFileRepository.findById(adminStorageFileDTO.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(storageFile -> {
                storageFile.setSize(adminStorageFileDTO.getSize());
                storageFile.setMimeType(adminStorageFileDTO.getMimeType());
                storageFile.setName(adminStorageFileDTO.getName());
                storageFile.setPath(adminStorageFileDTO.getPath());
                storageFileRepository.save(storageFile);
                log.debug("Changed Information for Storage File: {}", storageFile);
                return storageFile;
            })
            .map(AdminStorageFileDTO::new);
    }

    public UploadFileDTO modifyStorageFile(Long id, UploadFileDTO uploadFileDTO, String userLogin){
        StorageFile storageFile = storageFileRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String objectName = storageFile.getPath().substring(storageFile.getPath().lastIndexOf('/') + 1);

        minioService.uploadObject(objectName, uploadFileDTO.getData(), uploadFileDTO.getMimeType(), userLogin);


        storageFile.setName(uploadFileDTO.getName());
        storageFile.setSize((long) uploadFileDTO.getData().length);
        storageFile.setMimeType(uploadFileDTO.getMimeType());
        storageFileRepository.save(storageFile);

        return uploadFileDTO;
    }

    public UploadFileDTO getFile(long id) throws IOException {

        StorageFile storageFile = storageFileRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        byte[] data = minioService.getObject(storageFile.getPath()).readAllBytes();

        UploadFileDTO fileDTO = new UploadFileDTO();
        fileDTO.setName(storageFile.getName());
        fileDTO.setMimeType(storageFile.getMimeType());
        fileDTO.setData(data);

        return fileDTO;
    }

    public void deleteStorageFile(Long id, String login) {
        storageFileRepository
            .findById(id)
            .ifPresent(storageFile -> {
                minioService.deleteObject(storageFile.getPath(), login);
                storageFileRepository.delete(storageFile);
                log.debug("Deleted Storage File: {}", storageFile);
            });
    }



    @Transactional(readOnly = true)
    public Page<AdminStorageFileDTO> getAllManagedStorageFiles(Pageable pageable) {
        return storageFileRepository.findAll(pageable).map(AdminStorageFileDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<AdminStorageFileDTO> getStorageFilesByUserLogin(String login, Pageable pageable) {
        return storageFileRepository.findAllByUserLogin(login, pageable).map(AdminStorageFileDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<AdminStorageFileDTO> search(String query, Pageable pageable) {
        return storageFileRepository.findByDynamicQuery(query, pageable).map(AdminStorageFileDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<AdminStorageFileDTO> userSearch(String query, String login, Pageable pageable) {
        return storageFileRepository.findByDynamicQueryForUser(query, login, pageable).map(AdminStorageFileDTO::new);
    }
}
