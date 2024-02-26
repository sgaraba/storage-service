import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileModel } from '../file.model';

@Injectable({ providedIn: 'root' })
export class FileService {
  public files: FileModel[] = [];
    private apiUrl = "/api/files";

    constructor(private http: HttpClient) { }

    getRecentUploadFIles() {
        for (let i = 1; i <= 30; i++) {
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
