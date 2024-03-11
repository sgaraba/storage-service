package com.esempla.storage.helper;

import com.esempla.storage.domain.UserReservation;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ReservationExcel {
    static String[] HEADERs = { "Id", "Total Size", "Used Size", "User", "Activated", "Created By", "Created Date" };
    static String SHEET = "Reservations";

    public static ByteArrayInputStream tutorialsToExcel(List<UserReservation> reservationList) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet(SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (UserReservation reservation : reservationList) {
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
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}
