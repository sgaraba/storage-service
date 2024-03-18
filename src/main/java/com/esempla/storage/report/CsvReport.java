package com.esempla.storage.report;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class CsvReport implements IReport{

    private final Logger log = LoggerFactory.getLogger(CsvReport.class);

    @Override
    public byte[] generate() {
        log.info("Csv report");
        return new byte[0];
    }

    @Override
    public ReportType getType() {
        return ReportType.CSV;
    }
}
