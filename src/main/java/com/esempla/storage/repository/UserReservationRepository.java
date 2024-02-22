package com.esempla.storage.repository;

import com.esempla.storage.domain.UserReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserReservationRepository extends JpaRepository<UserReservation, Long> {
    Optional<UserReservation> findByUserId (Long id);
}
