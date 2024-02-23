package com.esempla.storage.service;

import com.esempla.storage.domain.UserReservation;
import com.esempla.storage.repository.UserRepository;
import com.esempla.storage.repository.UserReservationRepository;
import com.esempla.storage.service.dto.AdminReservationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Optional
            .of(userRepository.findById(adminReservationDTO.getUserId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(user -> {
                UserReservation userReservation = new UserReservation();
                userReservation.setTotalSize(adminReservationDTO.getTotalSize());
                userReservation.setActivated(adminReservationDTO.isActivated());
                userReservation.setUser(user);
                userReservation.setCreatedBy(user.getLogin());

                userReservationRepository.save(userReservation);

                return userReservation;
            });
        return null;
    }

    public Optional<AdminReservationDTO> updateUserReservation(AdminReservationDTO adminReservationDTO) {
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
