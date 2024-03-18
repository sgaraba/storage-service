package com.esempla.storage.helper;

import com.esempla.storage.domain.UserReservation;
import com.opencsv.CSVWriter;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class ReservationCsv {
    static String[] HEADERs = { "Id", "Total Size", "Used Size", "User", "Activated", "Created By", "Created Date" };
    public static ByteArrayInputStream exportToCsv(List<UserReservation> data){

        try (StringWriter stringWriter = new StringWriter();
             CSVWriter csvWriter = new CSVWriter(stringWriter, ';',
                 CSVWriter.DEFAULT_QUOTE_CHARACTER, CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END)) {

            csvWriter.writeNext(HEADERs);

            for (UserReservation reservation : data) {
                csvWriter.writeNext(new String[]{reservation.getId().toString(), reservation.getUsedSize().toString(), reservation.getTotalSize().toString(), reservation.getUser().getLogin(), String.valueOf(reservation.isActivated()), reservation.getCreatedBy(), reservation.getCreatedDate().toString()});
            }
            String file = stringWriter.toString();

            return new ByteArrayInputStream(file.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}
