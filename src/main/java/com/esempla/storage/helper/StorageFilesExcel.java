package com.esempla.storage.helper;

import com.esempla.storage.domain.StorageFile;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class StorageFilesExcel {
    static String[] HEADERs = { "Id", "Name", "Size", "Mime Type", "Path", "User",  "Created By", "Created Date" };
    static String SHEET = "Files";

    public static ByteArrayInputStream adminFilesToExcel(List<StorageFile> storageFiles) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet(SHEET);

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
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}
