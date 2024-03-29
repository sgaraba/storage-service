package com.esempla.storage.service.dto;

import java.io.Serializable;
import java.util.Map;

public class FilesByMonthDTO implements Serializable {
    private Integer January;
    private Integer February;
    private Integer March;
    private Integer April;
    private Integer May;
    private Integer June;
    private Integer July;
    private Integer August;
    private Integer September;
    private Integer October;
    private Integer November;
    private Integer December;

    public FilesByMonthDTO() {
    }

    public FilesByMonthDTO(Map<String, Integer> dictionary) {
        this.January = dictionary.get("JANUARY");
        this.February = dictionary.get("FEBRUARY");
        this.March = dictionary.get("MARCH");
        this.April = dictionary.get("APRIL");
        this.May = dictionary.get("MAY");
        this.June = dictionary.get("JUNE");
        this.July = dictionary.get("JULY");
        this.August = dictionary.get("AUGUST");
        this.September = dictionary.get("SEPTEMBER");
        this.October = dictionary.get("OCTOBER");
        this.November = dictionary.get("NOVEMBER");
        this.December = dictionary.get("DECEMBER");
    }

    public Integer getJanuary() {
        return January;
    }

    public void setJanuary(Integer january) {
        January = january;
    }

    public Integer getFebruary() {
        return February;
    }

    public void setFebruary(Integer february) {
        February = february;
    }

    public Integer getMarch() {
        return March;
    }

    public void setMarch(Integer march) {
        March = march;
    }

    public Integer getApril() {
        return April;
    }

    public void setApril(Integer april) {
        April = april;
    }

    public Integer getMay() {
        return May;
    }

    public void setMay(Integer may) {
        May = may;
    }

    public Integer getJune() {
        return June;
    }

    public void setJune(Integer june) {
        June = june;
    }

    public Integer getJuly() {
        return July;
    }

    public void setJuly(Integer july) {
        July = july;
    }

    public Integer getAugust() {
        return August;
    }

    public void setAugust(Integer august) {
        August = august;
    }

    public Integer getSeptember() {
        return September;
    }

    public void setSeptember(Integer september) {
        September = september;
    }

    public Integer getOctober() {
        return October;
    }

    public void setOctober(Integer october) {
        October = october;
    }

    public Integer getNovember() {
        return November;
    }

    public void setNovember(Integer november) {
        November = november;
    }

    public Integer getDecember() {
        return December;
    }

    public void setDecember(Integer december) {
        December = december;
    }
}
