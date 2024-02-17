import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDto } from './file.dto';

@Injectable({ providedIn: 'root' })
export class FileService {
    private apiUrl = "/api/files";

    constructor(private http: HttpClient) { }

    deleteFile(id: number) {
        alert("Deleting file with id: "+ id);
    }

    downloadFile(id: number) {
        alert("Donwloading file with id: "+ id);
    }
}