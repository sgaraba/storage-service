package com.esempla.storage.repository;

import com.esempla.storage.domain.StorageFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageFileRepository extends JpaRepository<StorageFile, Long> {
}
