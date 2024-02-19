import { Component, OnInit } from '@angular/core';
import { FileDto } from 'app/entities/file/file.dto';
import { FileService } from 'app/entities/file/file.service';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import SharedModule from 'app/shared/shared.module';

@Component({
  selector: 'jhi-recent-upload-files',
  standalone: true,
  imports: [SharedModule, SidebarComponent],
  templateUrl: './recent-upload-files.component.html',
  styleUrl: './recent-upload-files.component.scss'
})
export class RecentUploadFilesComponent implements OnInit {
  files: FileDto[] = [];
  pagedFiles: FileDto[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.files = this.fileService.getRecentUploadFIles();
    this.totalPages = Math.ceil(this.files.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePage();
  }

  // call api from file Service
  call_delete_fileService(id: number) {
    this.fileService.deleteFile(id);
  }
  call_donwload_fileService(id: number) {
    this.fileService.downloadFile(id);
  }

  // pagination for table
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.files.length - 1);
    this.pagedFiles = this.files.slice(startIndex, endIndex + 1);
  }
}
