import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FileModel } from 'app/entities/files/file.model';
import { FileService } from 'app/entities/files/service/file.service';
import SharedModule from 'app/shared/shared.module';
import saveAs from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from 'app/entities/files/delete/delete.component';
import { GetFileIcon } from 'app/shared/files';
import { RecentDocumentsService } from './service/recent-documents.service';

@Component({
  standalone: true,
  selector: 'jhi-recent-documents',
  templateUrl: './recent-documents.component.html',
  styleUrls: ['./recent-documents.component.scss'],
  imports: [SharedModule, GetFileIcon],
})
export class RecentDocumentsComponent implements OnInit {
  files: FileModel[] | null = null;

  constructor(
    private fileService: FileService,
    private modalService: NgbModal,
    private recentDocumentsService: RecentDocumentsService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  call_download_fileService(id: number): void {
    this.fileService.downloadFile(id).subscribe((fileData: any) => {
      const binaryData = this.base64Decode(fileData.data);
      const blob = new Blob([binaryData], { type: 'application/octet-stream' });

      saveAs(blob, fileData.name);
    });
  }

  openModal(fileID: number): void {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.fileID = fileID;

    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  loadAll(){
    this.recentDocumentsService.getRecentFiles().subscribe({
      next: (files: FileModel[]) => {
        this.files = files;
      },
      error: (error) => {
        console.error('Error fetching recent files:', error);
      }
    });
  }

  private base64Decode(base64String: string): Uint8Array {
    const byteString = atob(base64String);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray;
  }
}