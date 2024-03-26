package com.esempla.storage.web.rest;


import com.esempla.storage.service.DashboardService;
import com.esempla.storage.service.StorageFileService;
import com.esempla.storage.service.dto.AdminStorageFileDTO;
import com.esempla.storage.service.dto.FilesByMonthDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardResource {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);


    @Value("${jhipster.clientApp.name}")
    private String applicationName;


    private final DashboardService dashboardService;

    public DashboardResource(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/recent-files")
    public ResponseEntity<List<AdminStorageFileDTO>> getRecentFiles() {
        log.debug("REST request to get Recent Files for an admin");

        final List<AdminStorageFileDTO> list = dashboardService.getAdminRecentFiles();
        return ResponseEntity.ok()
            .body(list);
    }

    @GetMapping("/files-by-month")
    public ResponseEntity<FilesByMonthDTO> getFilesByMonth() {
        log.debug("REST request to get Recent Files for an admin");

        FilesByMonthDTO filesByMonthDTO = dashboardService.countObjectsByMonth();

        return ResponseEntity.ok()
            .body(filesByMonthDTO);
    }

}
