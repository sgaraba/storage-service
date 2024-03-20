package com.esempla.storage.report;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;

import java.util.List;

public interface IReport {
    byte[] generateFilesReport(List<StorageFile> storageFiles);

    byte[] generateReservationsReport(List<UserReservation> reservations);

    byte[] generateUsersReport(List<User> users);

    String getMediaType();

    ReportType getType();
}
