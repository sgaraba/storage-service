import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FileModel } from 'app/entities/files/file.model';

@Injectable({ providedIn: 'root' })
export class RecentDocumentsService {
  constructor(private http: HttpClient) {}

  getRecentFiles(): Observable<FileModel[]> {
    const files: FileModel[] = [];
    for (let i = 0; i < 10; i++) {
      const file: FileModel = {
        id: i + 1,
        name: `File ${i + 1}.csv`,
        mimeType: 'application/pdf',
        createdBy: 'John Doe',
        createdDate: new Date(),
      };
      files.push(file);
    }
    return of(files);
  }
}
