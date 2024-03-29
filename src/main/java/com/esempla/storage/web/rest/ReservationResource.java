package com.esempla.storage.web.rest;


import com.esempla.storage.domain.UserReservation;
import com.esempla.storage.report.IReport;
import com.esempla.storage.report.ReportType;
import com.esempla.storage.repository.UserReservationRepository;
import com.esempla.storage.security.AuthoritiesConstants;
import com.esempla.storage.service.UserReservationService;
import com.esempla.storage.service.dto.AdminReservationDTO;
import com.esempla.storage.service.dto.AdminUserDTO;
import com.esempla.storage.service.dto.UpdateReservationDTO;
import com.esempla.storage.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class ReservationResource {

    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList(
            "id",
            "usedSize",
            "totalSize",
            "userId",
            "activated",
            "createdBy",
            "createdDate"
        )
    );

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserReservationService userReservationService;

    private final UserReservationRepository userReservationRepository;
    private final Map<ReportType, IReport> map;

    public ReservationResource(UserReservationService userReservationService,
                               UserReservationRepository userReservationRepository,
                               List<IReport> reports) {
        this.userReservationService = userReservationService;
        this.userReservationRepository = userReservationRepository;
        map = reports.stream().collect(Collectors.toMap(IReport::getType, Function.identity()));
    }

    @PostMapping("/reservations")
    public ResponseEntity<UserReservation> createReservation(@Valid @RequestBody AdminReservationDTO reservationDTO) throws URISyntaxException {
        log.debug("REST request to save Reservation : {}", reservationDTO);

        if (reservationDTO.getId() != null) {
            throw new BadRequestAlertException("A new reservation cannot already have an ID", "userReservationManagement", "idexists");
        }

        if (userReservationRepository.findByUserId(reservationDTO.getUserId()).isPresent()) {
            throw new BadRequestAlertException("Reservation for that user already exists!", "userReservationManagement", "reservationexists");
        }


        UserReservation newReservation = userReservationService.createReservation(reservationDTO);

        return ResponseEntity
            .created(new URI("/api/admin/reservations/" + newReservation.getId()))
            .headers(HeaderUtil.createAlert(applicationName, "userReservationManagement.created", "test"))
            .body(newReservation);
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<UserReservation>> getAllReservations(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get all Reservations for an admin");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<UserReservation> page = userReservationService.getAllManagedReservations(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    @GetMapping("/reservations/{id}")
    public ResponseEntity<AdminReservationDTO> getUserReservation(@PathVariable("id") Long id) {
        log.debug("REST request to get Reservation : {}", id);
        return ResponseUtil.wrapOrNotFound(userReservationRepository.findById(id).map(AdminReservationDTO::new));
    }

    @PutMapping("/reservations")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<AdminReservationDTO> updateReservation(@Valid @RequestBody AdminReservationDTO adminReservationDTO) {
        log.debug("REST request to update Reservation : {}", adminReservationDTO);
        AdminReservationDTO updatedReservation = userReservationService.updateUserReservation(adminReservationDTO);
        return ResponseEntity
            .ok()
            .headers( HeaderUtil.createAlert(applicationName, "userReservationManagement.updated", updatedReservation.getFullName()))
            .body(updatedReservation);
    }

    @PatchMapping("/reservations/update-size")
    public ResponseEntity<UserReservation> updateReservationSize(@RequestBody UpdateReservationDTO updateReservationDTO){
        log.debug("REST request to update Reservation Size : {}", updateReservationDTO);

        UserReservation updatedReservation = userReservationService.updateReservationSize(updateReservationDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createAlert(applicationName, "userReservationManagement.updated", "test"))
            .body(updatedReservation);
    }

    @DeleteMapping("/reservations/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteReservation(@PathVariable("id") Long id) {
        log.debug("REST request to delete Reservation: {}", id);
        userReservationService.deleteReservation(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName, "userReservationManagement.deleted", id.toString())).build();
    }

    @GetMapping("/reservations/export/{type}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<byte[]> export(@PathVariable("type") ReportType type) {
        String filename = "reservations";

        List<UserReservation> reservations = userReservationRepository.findAll();
        byte[] bytes = map.get(type).generateReservationsReport(reservations);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
            .contentType(MediaType.parseMediaType(map.get(type).getMediaType()))
            .body(bytes);
    }

    @GetMapping("/reservations/search")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<UserReservation>> search (@RequestParam(value = "query") String query, @org.springdoc.core.annotations.ParameterObject Pageable pageable) {

        log.debug("REST request for searching for admin");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<UserReservation> page = userReservationService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
