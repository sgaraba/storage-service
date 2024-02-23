package com.esempla.storage.web.rest;


import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.security.AuthoritiesConstants;
import com.esempla.storage.service.StorageFileService;
import com.esempla.storage.service.dto.AdminStorageFileDTO;
import com.esempla.storage.web.rest.errors.BadRequestAlertException;
import com.esempla.storage.web.rest.errors.EmailAlreadyUsedException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class StorageFileResource {

    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList(
            "id",
            "name",
            "size",
            "mimeType",
            "path",
            "userId",
            "createdBy",
            "createdDate"
        )
    );

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StorageFileService storageFileService;

    private final StorageFileRepository storageFileRepository;

    public StorageFileResource(StorageFileService storageFileService, StorageFileRepository storageFileRepository) {
        this.storageFileService = storageFileService;
        this.storageFileRepository = storageFileRepository;
    }

    @PostMapping("/storageFiles")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<StorageFile> createStorageFile(@Valid @RequestBody AdminStorageFileDTO storageFileDTO) throws URISyntaxException {
        log.debug("REST request to save Storage File : {}", storageFileDTO);

        if (storageFileRepository.findByName(storageFileDTO.getName()).isPresent()) {
            throw new BadRequestAlertException("Storage File with that name already exists!", "userStorageFileManagement", "nameexists");
        }

        StorageFile newStorageFile = storageFileService.createStorageFile(storageFileDTO);

        return ResponseEntity
            .created(new URI("/api/admin/storageFiles/" + newStorageFile.getName()))
            .headers(HeaderUtil.createAlert(applicationName, "userStorageFileManagement.created", newStorageFile.getName()))
            .body(newStorageFile);
    }

    @GetMapping("/storageFiles")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<AdminStorageFileDTO>> getAllReservations(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get all Storage Files for an admin");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<AdminStorageFileDTO> page = storageFileService.getAllManagedStorageFiles(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    @GetMapping("/storageFiles/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<AdminStorageFileDTO> getStorageFile(@PathVariable("id") Long id) {
        log.debug("REST request to get Storage File : {}", id);
        return ResponseUtil.wrapOrNotFound(storageFileRepository.findById(id).map(AdminStorageFileDTO::new));
    }

    @PutMapping("/storageFiles")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<AdminStorageFileDTO> updateStorageFile(@Valid @RequestBody AdminStorageFileDTO adminStorageFileDTO) {
        log.debug("REST request to update Storage File : {}", adminStorageFileDTO);
        Optional<StorageFile> existingStorageFile = storageFileRepository.findByUserId(adminStorageFileDTO.getUserId());
        if (existingStorageFile.isPresent() && (!existingStorageFile.orElseThrow().getId().equals(adminStorageFileDTO.getId()))) {
            throw new EmailAlreadyUsedException();  //nu stiu ce exception de facut
        }

        Optional<AdminStorageFileDTO> updatedStorageFile = storageFileService.updateStorageFile(adminStorageFileDTO);

        return ResponseUtil.wrapOrNotFound(
            updatedStorageFile,
            HeaderUtil.createAlert(applicationName, "storageFileManagement.updated", adminStorageFileDTO.getId().toString())
        );
    }

    @DeleteMapping("/storageFiles/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteStorageFile(@PathVariable("id") Long id) {
        log.debug("REST request to delete Storage File: {}", id);
        storageFileService.deleteStorageFile(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName, "storageFileManagement.deleted", id.toString())).build();
    }
}