package com.esempla.storage.service;

import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import com.esempla.storage.repository.UserRepository;
import com.esempla.storage.repository.UserReservationRepository;
import com.esempla.storage.service.dto.AdminReservationDTO;
import com.esempla.storage.service.dto.UpdateReservationDTO;
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
public class UserReservationService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserReservationRepository userReservationRepository;

    private final UserRepository userRepository;

    public UserReservationService(UserReservationRepository userReservationRepository, UserRepository userRepository) {
        this.userReservationRepository = userReservationRepository;
        this.userRepository = userRepository;
    }

    public UserReservation createReservation(AdminReservationDTO adminReservationDTO) {
        User user = userRepository.findById(adminReservationDTO.getUserId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        UserReservation userReservation = new UserReservation();
        userReservation.setTotalSize(adminReservationDTO.getTotalSize());
        userReservation.setActivated(adminReservationDTO.isActivated());
        userReservation.setUser(user);
        userReservation.setCreatedBy(user.getLogin());

        return userReservationRepository.save(userReservation);
    }

    public AdminReservationDTO updateUserReservation(AdminReservationDTO adminReservationDTO) {
        return userReservationRepository.findById(adminReservationDTO.getId())
            .map(reservation -> {
                log.debug("Update reservation: {}", reservation);
                reservation.setTotalSize(adminReservationDTO.getTotalSize());
                reservation.setActivated(adminReservationDTO.isActivated());
                userReservationRepository.save(reservation);
                return reservation;
            })
            .map(AdminReservationDTO::new)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public UserReservation updateReservationSize(UpdateReservationDTO updateReservationDTO) {

        UserReservation userReservation = userReservationRepository.findByUserId(updateReservationDTO.getUserId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        userReservation.setTotalSize(updateReservationDTO.getReservationSize().longValue());

        return userReservationRepository.save(userReservation);
    }

    public void deleteReservation(Long id) {
        userReservationRepository
            .findById(id)
            .ifPresent(reservation -> {
                userReservationRepository.delete(reservation);
                log.debug("Deleted Reservation: {}", reservation);
            });
    }

    @Transactional(readOnly = true)
    public Page<UserReservation> getAllManagedReservations(Pageable pageable) {
        return userReservationRepository.findAll(pageable);
    }
}
