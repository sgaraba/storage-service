package com.esempla.storage.report;

public interface IReport {
    byte[] generate();

    ReportType getType();
}
