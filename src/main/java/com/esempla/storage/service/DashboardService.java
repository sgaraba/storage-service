package com.esempla.storage.service;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.service.dto.AdminStorageFileDTO;
import com.esempla.storage.service.dto.FilesByMonthDTO;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.Month;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final StorageFileRepository storageFileRepository;

    public DashboardService(StorageFileRepository storageFileRepository) {
        this.storageFileRepository = storageFileRepository;
    }

    public List<AdminStorageFileDTO> getAdminRecentFiles() {
        return storageFileRepository.findAllByCreatedDateDesc().stream().map(AdminStorageFileDTO::new).collect(Collectors.toList());
    }

    public FilesByMonthDTO countObjectsByMonth() {
        List<StorageFile> files = storageFileRepository.findAll();
        Map<String, Integer> countByMonth = new HashMap<>();

        String[] months = {"JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"};
        for (String month : months) {
            countByMonth.put(month, 0);
        }
        
        for (StorageFile file : files) {
            Instant createdInstant = file.getCreatedDate();
            Month month = createdInstant.atZone(ZoneId.systemDefault()).getMonth();
            String monthName = month.toString();
            countByMonth.put(monthName, countByMonth.getOrDefault(monthName, 0) + 1);
        }

        return new FilesByMonthDTO(countByMonth);
    }
}
