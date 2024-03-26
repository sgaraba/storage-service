package com.esempla.storage.web.rest;


import com.esempla.storage.service.StorageFileService;
import com.esempla.storage.service.dto.AdminStorageFileDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardResource {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);


    @Value("${jhipster.clientApp.name}")
    private String applicationName;


    private final StorageFileService storageFileService;

    public DashboardResource(StorageFileService storageFileService) {
        this.storageFileService = storageFileService;
    }

    @GetMapping("/recent-files")
    public ResponseEntity<List<AdminStorageFileDTO>> getRecentFiles() {
        log.debug("REST request to get Recent Files for an admin");

        final List<AdminStorageFileDTO> list = storageFileService.getAdminRecentFiles();
        return ResponseEntity.ok()
            .body(list);
    }

}
