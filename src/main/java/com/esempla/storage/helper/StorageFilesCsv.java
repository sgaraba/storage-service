package com.esempla.storage.helper;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.UserReservation;
import com.opencsv.CSVWriter;

import java.io.ByteArrayInputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class StorageFilesCsv {
    static String[] HEADERs = { "Id", "Name", "Size", "Mime Type", "Path", "User",  "Created By", "Created Date" };
    public static ByteArrayInputStream exportToCsv(List<StorageFile> data){

        try (StringWriter stringWriter = new StringWriter();
             CSVWriter csvWriter = new CSVWriter(stringWriter, ';',
                 CSVWriter.DEFAULT_QUOTE_CHARACTER, CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END)) {

            csvWriter.writeNext(HEADERs);

            for (StorageFile storageFile : data) {
                csvWriter.writeNext(new String[]{storageFile.getId().toString(), storageFile.getName(), storageFile.getSize().toString(), storageFile.getMimeType(), storageFile.getPath(), storageFile.getUser().getLogin(), storageFile.getCreatedBy() , storageFile.getCreatedDate().toString()});
            }
            String file = stringWriter.toString();

            return new ByteArrayInputStream(file.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}
