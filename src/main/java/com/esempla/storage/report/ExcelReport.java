package com.esempla.storage.report;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component
public class ExcelReport implements IReport{

    private final Logger log = LoggerFactory.getLogger(ExcelReport.class);

    @Override
    public byte[] generateFilesReport(List<StorageFile> storageFiles) {
        log.info("Excel report");
        String[] HEADERs = { "Id", "Name", "Size", "Mime Type", "Path", "User",  "Created By", "Created Date" };

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Files");

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (StorageFile storageFile : storageFiles) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(storageFile.getId());
                row.createCell(1).setCellValue(storageFile.getName());
                row.createCell(2).setCellValue(storageFile.getSize());
                row.createCell(3).setCellValue(storageFile.getMimeType());
                row.createCell(4).setCellValue(storageFile.getPath());
                row.createCell(5).setCellValue(storageFile.getUser().getLogin());
                row.createCell(6).setCellValue(storageFile.getCreatedBy());
                row.createCell(7).setCellValue(storageFile.getCreatedDate().toString());
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

    @Override
    public byte[] generateReservationsReport(List<UserReservation> reservations) {
        log.info("Excel report");
        String[] HEADERs = { "Id", "Total Size", "Used Size", "User", "Activated", "Created By", "Created Date" };

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Reservations");

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (UserReservation reservation : reservations) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(reservation.getId());
                row.createCell(1).setCellValue(reservation.getUsedSize());
                row.createCell(2).setCellValue(reservation.getTotalSize());
                row.createCell(3).setCellValue(reservation.getUser().getLogin());
                row.createCell(4).setCellValue(reservation.isActivated());
                row.createCell(5).setCellValue(reservation.getCreatedBy());
                row.createCell(6).setCellValue(reservation.getCreatedDate().toString());
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

    @Override
    public byte[] generateUsersReport(List<User> users) {
        log.info("Excel report");
        String[] HEADERs = { "Id", "Login", "First Name", "Last Name", "Email", "Activated", "Image Url" };

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Users");

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (User user : users) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(user.getId());
                row.createCell(1).setCellValue(user.getLogin());
                row.createCell(2).setCellValue(user.getFirstName());
                row.createCell(3).setCellValue(user.getLastName());
                row.createCell(4).setCellValue(user.getEmail());
                row.createCell(5).setCellValue(user.isActivated());
                row.createCell(6).setCellValue(user.getImageUrl());
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

    @Override
    public String getMediaType() {
        return "application/vnd.ms-excel";
    }

    @Override
    public ReportType getType() {
        return ReportType.EXCEL;
    }
}
