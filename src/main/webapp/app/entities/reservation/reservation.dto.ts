import { User } from "../user/user.model";

export interface ReservationDTO {
    id: number;
    totalSize: number;
    usedSize: number;
    user: User;
    activated: boolean;
    createdBy: string;
    createdDate: Date;
}

export class Reservation implements ReservationDTO {
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