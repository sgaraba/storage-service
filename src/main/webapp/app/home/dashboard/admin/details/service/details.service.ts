import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetailsService {
    private data: 
    {usedSpace: number, totalDocuments: number, totalUsers: number} = {
        usedSpace: 0,
        totalDocuments: 0,
        totalUsers: 0
    };

    constructor(private http: HttpClient) {}

    getDetails(){
        this.data.usedSpace = 2244;
        this.data.totalDocuments = 123444;
        this.data.totalUsers = 4566;

        return this.data;
    }
}