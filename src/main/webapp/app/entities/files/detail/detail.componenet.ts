import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataUtils } from '../../../core/util/data-util.service';
import SharedModule from '../../../shared/shared.module';
import { FileModel } from '../file.model';
import { EventManager } from 'app/core/util/event-manager.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileService } from '../service/file.service';
import { FileBaseComponent } from '../upload/uploadCORE.component';

@Component({
  selector: 'jhi-files-detail',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './detail.component.html',
})
export class FilesDetailComponent extends FileBaseComponent implements OnInit {
  file: FileModel | null = null;
  filePath!: string;
  fileSize!: number;

  constructor(
    private route: ActivatedRoute,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    public fileService: FileService,
  ) {
    super(dataUtils, eventManager, fileService);
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ file }) => {
      this.file = file;
      this.filePath = file.filePath;
      this.fileSize = file.size;
    });
  }
}
