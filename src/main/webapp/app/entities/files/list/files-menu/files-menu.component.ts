import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../../service/file.service';
import saveAs from 'file-saver';
import { FormsModule } from '@angular/forms';
import SharedModule from 'app/shared/shared.module';
import { DeleteComponent } from '../../delete/delete.component';

@Component({
  standalone: true,
  selector: 'app-files-menu',
  templateUrl: './files-menu.component.html',
  imports: [FormsModule, SharedModule],
  styleUrls: ['files-menu.component.scss'],
})
export default class FilesMenu {
  @Input() fileId!: number;
  @Input() pageFiles!: boolean;

  constructor(
    public fileService: FileService,
    public modalService: NgbModal,
  ) {}

  openModal(fileID: number): void {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.fileID = fileID;

    modalRef.closed.subscribe();
  }

  call_download_fileService(id: number): void {
    this.fileService.downloadFile(id).subscribe((fileData: any) => {
      const binaryData = this.base64Decode(fileData.data);
      const blob = new Blob([binaryData], { type: 'application/octet-stream' });

      saveAs(blob, fileData.name);
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
