package com.esempla.storage.web.rest.errors;

public class StorageInUseException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public StorageInUseException() {
        super(ErrorConstants.STORAGE_IN_USE_TYPE, "Storage contains files!", "userReservationManagement", "filesexists");
    }
}
