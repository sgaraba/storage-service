import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDto } from './file.dto';

@Injectable({ providedIn: 'root' })
export class FileService {
    private apiUrl = "/api/files";
    public files: FileDto[] = [];

    constructor(private http: HttpClient) { }

    getRecentUploadFIles() {
        for (let i = 1; i <= 10; i++) {
            this.files.push({
                id: i,
                name: `File ${i}`,
                size: Math.floor(Math.random() * 1000),
                mimeType: 'text/plain',
                createdBy: `User ${i}`,
                createdDate: new Date(),
            });
        }
        return this.files;
    }

    deleteFile(id: number) {
        alert("Deleting file with id: " + id);
    }

    downloadFile(id: number) {
        alert("Donwloading file with id: " + id);
    }
}