import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FileModel } from '../file.model';
import { DataUtils } from '../../../core/util/data-util.service';

@Component({
  selector: 'jhi-files-detail',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './detail.component.html',
})

export class FilesDetailComponent implements OnInit{
  file: FileModel | null = null;

  constructor(
    private route: ActivatedRoute,
    protected dataUtils: DataUtils,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ file }) => {
      this.file = file;
    });
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }
}
