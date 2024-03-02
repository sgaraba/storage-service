package com.esempla.storage.service;

import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.repository.UserRepository;
import com.esempla.storage.repository.UserReservationRepository;
import com.esempla.storage.service.dto.AdminReservationDTO;
import com.esempla.storage.service.dto.UpdateReservationDTO;
import com.esempla.storage.web.rest.errors.StorageInUseException;
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

    private final StorageFileRepository storageFileRepository;

    public UserReservationService(UserReservationRepository userReservationRepository, UserRepository userRepository, StorageFileRepository storageFileRepository) {
        this.userReservationRepository = userReservationRepository;
        this.userRepository = userRepository;
        this.storageFileRepository = storageFileRepository;
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

    public UserReservation updateReservationSize (UpdateReservationDTO updateReservationDTO){

        UserReservation userReservation = userReservationRepository.findByUserId(updateReservationDTO.getUserId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        userReservation.setTotalSize(updateReservationDTO.getReservationSize().longValue());

        return userReservationRepository.save(userReservation);
    }

    public void deleteReservation(Long id) {
        userReservationRepository
            .findById(id)
            .ifPresent(reservation -> {
                if(storageFileRepository.findByUserId(reservation.getUser().getId()).isPresent()){
                    throw new StorageInUseException();
                }
                userReservationRepository.delete(reservation);
                log.debug("Deleted Reservation: {}", reservation);
            });
    }

    @Transactional(readOnly = true)
    public Page<UserReservation> getAllManagedReservations(Pageable pageable) {
        return userReservationRepository.findAll(pageable);
    }
}
