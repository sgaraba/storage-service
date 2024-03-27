package com.esempla.storage.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "dashboard_data")
public class DashboardData implements Serializable {

    @Id
    private Long userId;
    private Integer users = 0;
    private Integer files = 0;
    private Integer usedSpace = 0;

    public Integer getFiles() {
        return files;
    }

    public void setFiles(Integer files) {
        this.files = files;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getUsers() {
        return users;
    }

    public void setUsers(Integer users) {
        this.users = users;
    }



    public Integer getUsedSpace() {
        return usedSpace;
    }

    public void setUsedSpace(Integer usedSpace) {
        this.usedSpace = usedSpace;
    }

    public DashboardData() {
    }

    public DashboardData(Long userId, Integer users, Integer files, Integer usedSpace) {
        this.userId = userId;
        this.users = users;
        this.files = files;
        this.usedSpace = usedSpace;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DashboardData that = (DashboardData) o;
        return Objects.equals(userId, that.userId) && Objects.equals(users, that.users) && Objects.equals(files, that.files) && Objects.equals(usedSpace, that.usedSpace);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, users, files, usedSpace);
    }

    @Override
    public String toString() {
        return "DashboardData{" +
            "userId=" + userId +
            ", users=" + users +
            ", files=" + files +
            ", usedSpace=" + usedSpace +
            '}';
    }
}
