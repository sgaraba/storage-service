import {User} from "../user-management/user-management.model";

export interface ReservationModel {
    id: number;
    totalSize: number;
    usedSize: number;
    user: User;
    activated: boolean;
    createdBy: string;
    createdDate: Date;
}

export class Reservation implements ReservationModel {
    constructor(
        public id: number,
        public totalSize: number,
        public usedSize: number,
        public user: User,
        public activated: boolean,
        public createdBy: string,
        public createdDate: Date
    ) {}
}
