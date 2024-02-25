package com.esempla.storage.service;

import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import com.esempla.storage.repository.UserRepository;
import com.esempla.storage.repository.UserReservationRepository;
import com.esempla.storage.service.dto.AdminReservationDTO;
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

    public UserReservation createReservation(AdminReservationDTO adminReservationDTO){
        User user = userRepository.findById(adminReservationDTO.getUserId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        UserReservation userReservation = new UserReservation();
        userReservation.setTotalSize(adminReservationDTO.getTotalSize());
        userReservation.setActivated(adminReservationDTO.isActivated());
        userReservation.setUser(user);
        userReservation.setCreatedBy(user.getLogin());

       return userReservationRepository.save(userReservation);
    }

    public Optional<AdminReservationDTO> updateUserReservation(AdminReservationDTO adminReservationDTO) {
//        UserReservation userReservation = userReservationRepository.findById(adminReservationDTO.getId())
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
//
//        userReservation.setTotalSize(adminReservationDTO.getTotalSize());
//        userReservation.setActivated(adminReservationDTO.isActivated());
//        userReservationRepository.save(userReservation);
//        log.debug("Changed Information for Reservation: {}", userReservation);
//        return new AdminReservationDTO(userReservation);

        return Optional
            .of(userReservationRepository.findById(adminReservationDTO.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(reservation -> {
                reservation.setTotalSize(adminReservationDTO.getTotalSize());
                reservation.setActivated(adminReservationDTO.isActivated());
                userReservationRepository.save(reservation);
                log.debug("Changed Information for Reservation: {}", reservation);
                return reservation;
            })
            .map(AdminReservationDTO::new);
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
    public Page<AdminReservationDTO> getAllManagedReservations(Pageable pageable) {
        return userReservationRepository.findAll(pageable).map(AdminReservationDTO::new);
    }
}
