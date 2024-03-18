package com.esempla.storage.helper;

import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import com.opencsv.CSVWriter;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class UserCsv {
    static String[] HEADERs = { "Id", "Login", "First Name", "Last Name", "Email", "Activated", "Image Url" };
    public static ByteArrayInputStream exportToCsv(List<User> data){

        try (StringWriter stringWriter = new StringWriter();
             CSVWriter csvWriter = new CSVWriter(stringWriter, ';',
                 CSVWriter.DEFAULT_QUOTE_CHARACTER, CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END)) {

            csvWriter.writeNext(HEADERs);

            for (User user : data) {
                csvWriter.writeNext(new String[]{user.getId().toString(), user.getLogin(), user.getFirstName(), user.getLastName(), user.getEmail(), String.valueOf(user.isActivated()), user.getImageUrl()});
            }
            String file = stringWriter.toString();

            return new ByteArrayInputStream(file.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}


