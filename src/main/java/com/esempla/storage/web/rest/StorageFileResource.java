package com.esempla.storage.web.rest;


import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.security.AuthoritiesConstants;
import com.esempla.storage.security.SecurityUtils;
import com.esempla.storage.service.CsvService;
import com.esempla.storage.service.ExcelService;
import com.esempla.storage.service.MinioService;
import com.esempla.storage.service.StorageFileService;
import com.esempla.storage.service.dto.AdminStorageFileDTO;
import com.esempla.storage.service.dto.UploadFileDTO;
import com.esempla.storage.web.rest.errors.BadRequestAlertException;
import com.esempla.storage.web.rest.errors.EmailAlreadyUsedException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;


@RestController
@RequestMapping("/api")
public class StorageFileResource {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

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

    private static class StorageFileException extends RuntimeException {
        private StorageFileException(String message) {
            super(message);
        }
    }


    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StorageFileService storageFileService;
    private final StorageFileRepository storageFileRepository;
    private final MinioService minioService;
    private final ExcelService excelService;
    private final CsvService CsvService;

    public StorageFileResource(StorageFileService storageFileService,
                               StorageFileRepository storageFileRepository,
                               MinioService minioService, ExcelService excelService,
                               com.esempla.storage.service.CsvService csvService) {
        this.storageFileService = storageFileService;
        this.storageFileRepository = storageFileRepository;
        this.minioService = minioService;
        this.excelService = excelService;
        CsvService = csvService;
    }

    @PostMapping("/storage-files")
    public ResponseEntity<StorageFile> createStorageFile(@Valid @RequestBody AdminStorageFileDTO storageFileDTO) throws URISyntaxException {
        log.debug("REST request to save Storage File : {}", storageFileDTO);

        if (storageFileRepository.findByName(storageFileDTO.getName()).isPresent()) {
            throw new BadRequestAlertException("Storage File with that name already exists!", "userStorageFileManagement", "nameexists");
        }

        StorageFile newStorageFile = storageFileService.createStorageFile(storageFileDTO);

        return ResponseEntity
            .created(new URI("/api/storage-files/" + newStorageFile.getName()))
            .headers(HeaderUtil.createAlert(applicationName, "userStorageFileManagement.created", newStorageFile.getName()))
            .body(newStorageFile);
    }

    @GetMapping("/storage-files")
    public ResponseEntity<List<AdminStorageFileDTO>> getAllReservations(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {

        if(SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)){
            log.debug("REST request to get all Storage Files for an admin");
            if (!onlyContainsAllowedProperties(pageable)) {
                return ResponseEntity.badRequest().build();
            }

            final Page<AdminStorageFileDTO> page = storageFileService.getAllManagedStorageFiles(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
        }

        String login = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.debug("REST request to get Storage Files by User : {}", login);
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<AdminStorageFileDTO> page = storageFileService.getStorageFilesByUserLogin(login, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);

    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    @GetMapping("/storage-files/{id}")
    public ResponseEntity<AdminStorageFileDTO> getStorageFile(@PathVariable("id") Long id) {
        log.debug("REST request to get Storage File : {}", id);
        return ResponseUtil.wrapOrNotFound(storageFileRepository.findById(id).map(AdminStorageFileDTO::new));
    }


    @PutMapping("/admin/storage-files/{id}")
    public ResponseEntity<AdminStorageFileDTO> updateStorageFile(@PathVariable("id") Long id, @Valid @RequestBody AdminStorageFileDTO adminStorageFileDTO) {
        log.debug("REST request to update Storage File : {}", adminStorageFileDTO);
        Optional<StorageFile> existingStorageFile = storageFileRepository.findById(id);
        if (existingStorageFile.isPresent() && (!existingStorageFile.orElseThrow().getId().equals(adminStorageFileDTO.getId()))) {
            throw new EmailAlreadyUsedException();  //nu stiu ce exception de facut
        }

        Optional<AdminStorageFileDTO> updatedStorageFile = storageFileService.updateStorageFile(adminStorageFileDTO);

        return ResponseUtil.wrapOrNotFound(
            updatedStorageFile,
            HeaderUtil.createAlert(applicationName, "storageFileManagement.updated", adminStorageFileDTO.getId().toString())
        );
    }

    @PutMapping("/storage-files/{id}")
    public ResponseEntity<UploadFileDTO> modifyStorageFile(@PathVariable("id") Long id, @Valid @RequestBody UploadFileDTO uploadFileDTO) {
        log.debug("REST request to modify Storage File : {}", id);

        UploadFileDTO updatedStorageFile = storageFileService.modifyStorageFile(id, uploadFileDTO);

        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createAlert(applicationName, "userReservationManagement.updated", "test"))
            .body(updatedStorageFile);
    }

    @DeleteMapping("/storage-files/{id}")
    public ResponseEntity<Void> deleteStorageFile(@PathVariable("id") Long id) {
        log.debug("REST request to delete Storage File: {}", id);
        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new StorageFileException("Current user login not found"));

        storageFileService.deleteStorageFile(id, userLogin);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName, "storageFileManagement.deleted", id.toString())).build();
    }

    @PostMapping("/storage-files/upload-file")
    public ResponseEntity<StorageFile> uploadStorageFile(@RequestBody UploadFileDTO uploadFileDTO) throws URISyntaxException {
        log.debug("REST request to upload Storage File : {}", uploadFileDTO);

        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new StorageFileException("Current user login not found"));

        if (storageFileRepository.findByName(uploadFileDTO.getName()).isPresent()) {
            throw new BadRequestAlertException("Storage File with that name already exists!", "userStorageFileManagement", "nameexists");
        }

        String objectName = UUID.randomUUID().toString();

        minioService.uploadObject(objectName, uploadFileDTO.getData(), uploadFileDTO.getMimeType(), userLogin);

        StorageFile storageFile = storageFileService.uploadNewFile(uploadFileDTO, userLogin, objectName);

        //adaugat schimb automat de usedSize la rezervare

        return ResponseEntity
            .created(new URI("/api/storage-files/" + storageFile.getName()))
            .headers(HeaderUtil.createAlert(applicationName, "userStorageFileManagement.created", storageFile.getName()))
            .body(storageFile);
    }

    @GetMapping("/storage-files/download/{id}")
    public ResponseEntity<UploadFileDTO> downloadStorageFile(@PathVariable("id") Long id) throws IOException {

        log.debug("REST request to get Storage File");
        UploadFileDTO fileDTO = storageFileService.getFile(id);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createAlert(applicationName, "userStorageFileManagement.created", fileDTO.getName()))
            .body(fileDTO);
    }

    @GetMapping("/storage-files/excel-export")
    public ResponseEntity<Resource> excelExport() {
        String filename = "files.xlsx";

        if(SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)){
            log.debug("REST request to get all Storage Files for admin");
            InputStreamResource file = new InputStreamResource(excelService.adminFilesLoad());

            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
            }

        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new StorageFileException("Current user login not found"));

        log.debug("REST request to get all Storage Files for user");
        InputStreamResource file = new InputStreamResource(excelService.userFilesLoad(userLogin));

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
            .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
            .body(file);
    }

    @GetMapping( "/storage-files/csv-export")
    public ResponseEntity<Resource> exportToCsv() {
        String filename = "files.csv";

        if(SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)){
            log.debug("REST request to get all Storage Files for admin");
            InputStreamResource file = new InputStreamResource(CsvService.adminFilesLoad());

            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("text/csv; charset=UTF-8"))
                .body(file);
        }

        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new StorageFileException("Current user login not found"));

        log.debug("REST request to get all Storage Files for user");
        InputStreamResource file = new InputStreamResource(CsvService.userFilesLoad(userLogin));

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename = " + filename)
            .contentType(MediaType.parseMediaType("text/csv; charset=UTF-8"))
            .body(file);
    }

}
