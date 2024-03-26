package com.esempla.storage.repository;

import com.esempla.storage.domain.StorageFile;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StorageFileRepository extends JpaRepository<StorageFile, Long> {
    Optional<List<StorageFile>> findByUserId (Long id);

    List<StorageFile> findAllByUserLogin(String login);

    Optional<StorageFile> findByName (String name);

    Page<StorageFile> findAllByUserLogin (String login, Pageable pageable);

    @Query("SELECT s FROM StorageFile s ORDER BY s.createdDate DESC LIMIT 10")
    List<StorageFile> findAllByCreatedDateDesc();

    @Query("SELECT s FROM StorageFile s WHERE s.name LIKE %:query%")
    Page<StorageFile> findByDynamicQuery(@Param("query") String query, Pageable pageable);

    @Query("SELECT s FROM StorageFile s WHERE s.name LIKE %:query% AND s.user.login = :login")
    Page<StorageFile> findByDynamicQueryForUser(@Param("query") String query, String login, Pageable pageable);

}
