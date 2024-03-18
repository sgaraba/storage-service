package com.esempla.storage.report;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ExcelReport implements IReport{

    private final Logger log = LoggerFactory.getLogger(ExcelReport.class);

    @Override
    public byte[] generate() {
        log.info("Excel report");
        return new byte[0];
    }

    @Override
    public ReportType getType() {
        return ReportType.EXCEL;
    }
}
