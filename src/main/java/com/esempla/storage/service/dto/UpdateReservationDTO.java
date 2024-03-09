package com.esempla.storage.service.dto;

import java.io.Serializable;

public class UpdateReservationDTO implements Serializable {
    private Long userId;
    private Integer reservationSize;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getReservationSize() {
        return reservationSize;
    }

    public void setReservationSize(Integer reservationSize) {
        this.reservationSize = reservationSize;
    }
}
