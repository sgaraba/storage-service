import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatisticsDocumentsService {
    constructor(private http: HttpClient) {}
    
    getChartData(){
        const fileUploadsData = [100, 200, 150, 300, 250, 400, 350, 500, 450, 600, 550, 700];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return {'fileUploadsData': fileUploadsData, 'months': months};
    }
}