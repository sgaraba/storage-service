package com.esempla.storage.repository;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.UserReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorageFileRepository extends JpaRepository<StorageFile, Long> {
    Optional<StorageFile> findByUserId (Long id);

    Optional<StorageFile> findByName (String name);

}
