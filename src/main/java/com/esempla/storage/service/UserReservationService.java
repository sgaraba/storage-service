package com.esempla.storage.service;

import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import com.esempla.storage.repository.UserReservationRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class UserReservationService {

    private final UserReservationRepository userReservationRepository;

    public UserReservationService(UserReservationRepository userReservationRepository) {
        this.userReservationRepository = userReservationRepository;
    }

    public UserReservation createReservation(Long totalSize, User user){
        UserReservation userReservation = new UserReservation();
        userReservation.setTotalSize(totalSize);
        userReservation.setUsedSize(0L);
        userReservation.setUser(user);
        userReservation.setCreatedBy(user.getLogin());

        userReservationRepository.save(userReservation);


        return userReservation;
    }
}
