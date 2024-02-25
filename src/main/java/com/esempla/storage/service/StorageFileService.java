package com.esempla.storage.service;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.repository.UserRepository;
import com.esempla.storage.repository.UserReservationRepository;
import com.esempla.storage.service.dto.AdminReservationDTO;
import com.esempla.storage.service.dto.AdminStorageFileDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class StorageFileService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final StorageFileRepository storageFileRepository;

    private final UserRepository userRepository;

    public StorageFileService(StorageFileRepository storageFileRepository, UserRepository userRepository) {
        this.storageFileRepository = storageFileRepository;
        this.userRepository = userRepository;
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

    public void deleteStorageFile(Long id) {
        storageFileRepository
            .findById(id)
            .ifPresent(storageFile -> {
                storageFileRepository.delete(storageFile);
                log.debug("Deleted Storage File: {}", storageFile);
            });
    }

    @Transactional(readOnly = true)
    public Page<AdminStorageFileDTO> getAllManagedStorageFiles(Pageable pageable) {
        return storageFileRepository.findAll(pageable).map(AdminStorageFileDTO::new);
    }
}
