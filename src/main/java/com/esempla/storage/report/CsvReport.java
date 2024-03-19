package com.esempla.storage.report;

import com.esempla.storage.domain.StorageFile;
import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import com.opencsv.CSVWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class CsvReport implements IReport{

    private final Logger log = LoggerFactory.getLogger(CsvReport.class);

    @Override
    public byte[] generateFilesReport(List<StorageFile> storageFiles) {
        String[] HEADERs = { "Id", "Name", "Size", "Mime Type", "Path", "User",  "Created By", "Created Date" };

        log.info("Csv report");

        try (StringWriter stringWriter = new StringWriter();
             CSVWriter csvWriter = new CSVWriter(stringWriter, ';',
                 CSVWriter.DEFAULT_QUOTE_CHARACTER, CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END)) {

            csvWriter.writeNext(HEADERs);

            for (StorageFile storageFile : storageFiles) {
                csvWriter.writeNext(new String[]{storageFile.getId().toString(), storageFile.getName(), storageFile.getSize().toString(), storageFile.getMimeType(), storageFile.getPath(), storageFile.getUser().getLogin(), storageFile.getCreatedBy() , storageFile.getCreatedDate().toString()});
            }
            String file = stringWriter.toString();

            return file.getBytes(StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("fail to import data to Csv file: " + e.getMessage());
        }
    }

    @Override
    public byte[] generateReservationsReport(List<UserReservation> reservations) {
        String[] HEADERs = { "Id", "Total Size", "Used Size", "User", "Activated", "Created By", "Created Date" };

        log.info("Csv report");

        try (StringWriter stringWriter = new StringWriter();
             CSVWriter csvWriter = new CSVWriter(stringWriter, ';',
                 CSVWriter.DEFAULT_QUOTE_CHARACTER, CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END)) {

            csvWriter.writeNext(HEADERs);

            for (UserReservation reservation : reservations) {
                csvWriter.writeNext(new String[]{reservation.getId().toString(), reservation.getUsedSize().toString(), reservation.getTotalSize().toString(), reservation.getUser().getLogin(), String.valueOf(reservation.isActivated()), reservation.getCreatedBy(), reservation.getCreatedDate().toString()});
            }
            String file = stringWriter.toString();

            return file.getBytes(StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("fail to import data to Csv file: " + e.getMessage());
        }
    }

    @Override
    public byte[] generateUsersReport(List<User> users) {
        String[] HEADERs = { "Id", "Login", "First Name", "Last Name", "Email", "Activated", "Image Url" };

        log.info("Csv report");

        try (StringWriter stringWriter = new StringWriter();
             CSVWriter csvWriter = new CSVWriter(stringWriter, ';',
                 CSVWriter.DEFAULT_QUOTE_CHARACTER, CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END)) {

            csvWriter.writeNext(HEADERs);

            for (User user : users) {
                csvWriter.writeNext(new String[]{user.getId().toString(), user.getLogin(), user.getFirstName(), user.getLastName(), user.getEmail(), String.valueOf(user.isActivated()), user.getImageUrl()});
            }
            String file = stringWriter.toString();

            return file.getBytes(StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("fail to import data to Csv file: " + e.getMessage());
        }
    }

    @Override
    public String getMediaType() {
        return "text/csv; charset=UTF-8";
    }


    @Override
    public ReportType getType() {
        return ReportType.CSV;
    }
}
