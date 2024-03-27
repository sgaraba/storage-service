package com.esempla.storage.repository;

import com.esempla.storage.domain.DashboardData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DashboardRepository extends JpaRepository<DashboardData, Long> {
    Optional<DashboardData> findByUserId (long id);
}
