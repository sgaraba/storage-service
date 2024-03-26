package com.esempla.storage.repository;

import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserReservationRepository extends JpaRepository<UserReservation, Long> {
    Optional<UserReservation> findByUserId (Long id);
    Optional<UserReservation> findByUserLogin(String login);

    @Query("SELECT r FROM UserReservation r WHERE r.user.login LIKE %:query% OR r.user.firstName LIKE %:query% OR r.user.lastName LIKE %:query% OR CAST(r.totalSize AS string) LIKE %:query%")
    Page<UserReservation> findByDynamicQuery(@Param("query") String query, Pageable pageable);
}
