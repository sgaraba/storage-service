package com.esempla.storage.service;

import com.esempla.storage.domain.DashboardData;
import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.User;
import com.esempla.storage.repository.DashboardRepository;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.repository.UserRepository;
import com.esempla.storage.security.SecurityUtils;
import com.esempla.storage.service.dto.AdminStorageFileDTO;
import com.esempla.storage.service.dto.FilesByMonthDTO;
import com.esempla.storage.web.rest.DashboardResource;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.Month;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final StorageFileRepository storageFileRepository;
    private final DashboardRepository dashboardRepository;
    private final UserRepository userRepository;

    public DashboardService(StorageFileRepository storageFileRepository, DashboardRepository dashboardRepository, UserRepository userRepository) {
        this.storageFileRepository = storageFileRepository;
        this.dashboardRepository = dashboardRepository;
        this.userRepository = userRepository;
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

    public DashboardData getDashboardData(String login) {
        User user = userRepository.findOneByLogin(login)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Optional<DashboardData> dashboardData = dashboardRepository.findByUserId(user.getId());

        return dashboardData.orElseGet(() -> createDashboardData(user.getId()));
    }

    public DashboardData createDashboardData(long userId) {
        DashboardData dashboardData = new DashboardData(userId, 0,0,0L);
        dashboardRepository.save(dashboardData);
        return dashboardData;
    }

    @Scheduled(cron = "0 0/5 * ? * *")
    public void updateDashboardData(){
        Integer files = (int) storageFileRepository.count();
        Integer users = (int) userRepository.count();
        Long usedSpace = storageFileRepository.getTotalFileSize();

        List<DashboardData> dashboardDataList = dashboardRepository.findAll();

        for (DashboardData dashboardData : dashboardDataList) {
            dashboardData.setFiles(files);
            dashboardData.setUsers(users);
            dashboardData.setUsedSpace(usedSpace);
            dashboardRepository.save(dashboardData);
        }
    }
}
