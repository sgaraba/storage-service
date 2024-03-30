import { Component, OnInit } from '@angular/core';
import { FileModel } from 'app/entities/files/file.model';
import SharedModule from 'app/shared/shared.module';
import { GetFileIcon } from 'app/shared/files';
import { RecentDocumentsService } from './service/recent-documents.service';
import { RouterModule } from '@angular/router';
import FilesMenu from 'app/entities/files/list/files-menu/files-menu.component';

@Component({
  standalone: true,
  selector: 'jhi-recent-documents',
  templateUrl: './recent-documents.component.html',
  styleUrls: ['./recent-documents.component.scss'],
  imports: [SharedModule, GetFileIcon, RouterModule, FilesMenu],
})
export class RecentDocumentsComponent implements OnInit {
  files: FileModel[] | null = null;

  constructor(
    private recentDocumentsService: RecentDocumentsService,
  ) {}

  ngOnInit(): void {
    this.loadAll();
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
}