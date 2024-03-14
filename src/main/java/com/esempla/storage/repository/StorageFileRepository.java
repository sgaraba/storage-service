package com.esempla.storage.repository;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.UserReservation;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface StorageFileRepository extends JpaRepository<StorageFile, Long> {
    Optional<List<StorageFile>> findByUserId (Long id);

    List<StorageFile> findAllByUserLogin(String login);

    Optional<StorageFile> findByName (String name);

    Page<StorageFile> findAllByUserLogin (String login, Pageable pageable);

}
