package com.esempla.storage.service;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import com.esempla.storage.helper.AdminFilesExcel;
import com.esempla.storage.helper.ReservationExcel;
import com.esempla.storage.helper.UsersExcel;
import com.esempla.storage.repository.StorageFileRepository;
import com.esempla.storage.repository.UserRepository;
import com.esempla.storage.repository.UserReservationRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.List;

@Service
public class ExcelService {
    private final UserReservationRepository userReservationRepository;
    private final UserRepository userRepository;
    private final StorageFileRepository storageFileRepository;

    public ExcelService(UserReservationRepository userReservationRepository, UserRepository userRepository, StorageFileRepository storageFileRepository) {
        this.userReservationRepository = userReservationRepository;
        this.userRepository = userRepository;
        this.storageFileRepository = storageFileRepository;
    }

    public ByteArrayInputStream reservationLoad() {
        List<UserReservation> reservations = userReservationRepository.findAll();

        return ReservationExcel.tutorialsToExcel(reservations);
    }

    public ByteArrayInputStream usersLoad() {
        List<User> users = userRepository.findAll();

        return UsersExcel.usersToExcel(users);
    }

    public ByteArrayInputStream adminFilesLoad() {
        List<StorageFile> files = storageFileRepository.findAll();

        return AdminFilesExcel.adminFilesToExcel(files);
    }

    public ByteArrayInputStream userFilesLoad(String login) {
        List<StorageFile> files = storageFileRepository.findAllByUserLogin(login);

        return AdminFilesExcel.adminFilesToExcel(files);
    }
}
