import { Component, OnInit } from '@angular/core';
import { FileDto } from 'app/entities/file/file.dto';
import { FileService } from 'app/entities/file/file.service';
import SharedModule from 'app/shared/shared.module';

@Component({
  selector: 'jhi-recent-upload-files',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './recent-upload-files.component.html',
  styleUrl: './recent-upload-files.component.scss'
})
export class RecentUploadFilesComponent implements OnInit {
  files: FileDto[] = [];

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.files = this.fileService.getRecentUploadFIles();
  }

  call_delete_fileService(id: number) {
    this.fileService.deleteFile(id);
  }
  call_donwload_fileService(id: number) {
    this.fileService.downloadFile(id);
  }
}
