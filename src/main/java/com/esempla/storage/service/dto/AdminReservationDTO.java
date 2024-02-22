package com.esempla.storage.service.dto;

import com.esempla.storage.domain.UserReservation;

import java.io.Serializable;
import java.time.Instant;

public class AdminReservationDTO implements Serializable {


    private static final long serialVersionUID = 1L;

    private Long id;

    private Long usedSize;

    private Long totalSize;

    private Long userId;

    private boolean activated;

    private String createdBy;

    private Instant createdDate;

    public AdminReservationDTO() {
        // Empty constructor needed for Jackson.
    }

    public AdminReservationDTO(UserReservation userReservation) {
        this.id = userReservation.getId();
        this.usedSize = userReservation.getUsedSize();
        this.totalSize = userReservation.getTotalSize();
        this.userId = userReservation.getUser().getId();
        this.activated = userReservation.isActivated();
        this.createdBy = userReservation.getCreatedBy();
        this.createdDate = userReservation.getCreatedDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsedSize() {
        return usedSize;
    }

    public void setUsedSize(Long usedSize) {
        this.usedSize = usedSize;
    }

    public Long getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(Long totalSize) {
        this.totalSize = totalSize;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "AdminReservationDTO{" +
            "id=" + id +
            ", usedSize=" + usedSize +
            ", totalSize=" + totalSize +
            ", userId=" + userId +
            ", activated=" + activated +
            ", createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            '}';
    }
}
