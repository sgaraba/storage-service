package com.esempla.storage.service.dto;

import com.esempla.storage.domain.User;
import com.esempla.storage.domain.UserReservation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.time.Instant;

public class AdminReservationDTO implements Serializable {


    private static final long serialVersionUID = 1L;

    private Long id;

    private Long usedSize = 0L;

    @NotNull
    private Long totalSize;

    private Long userId;

    private String fullName;

    private boolean activated = false;

    @Size(max=50)
    private String createdBy;

    private Instant createdDate;

    public AdminReservationDTO() {
        // Empty constructor needed for Jackson.
    }

    public AdminReservationDTO(UserReservation userReservation) {
        User user = userReservation.getUser();
        this.id = userReservation.getId();
        this.usedSize = userReservation.getUsedSize();
        this.totalSize = userReservation.getTotalSize();
        this.userId = user.getId();
        this.fullName = user.getFullName();
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

    public String getFullName() {
        return fullName;
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
