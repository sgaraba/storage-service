import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataUtils } from '../../../core/util/data-util.service';
import SharedModule from '../../../shared/shared.module';
import { FileModel } from '../file.model';

@Component({
  selector: 'jhi-files-detail',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './detail.component.html',
})

export class FilesDetailComponent implements OnInit {
  file: FileModel | null = null;
  filePath!: string;
  fileSize!: number;

  constructor(
    private route: ActivatedRoute,
    protected dataUtils: DataUtils,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ file }) => {
      this.file = file;
      this.filePath = file.filePath;
      this.fileSize = file.size;
    });
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }
}
