import { Component } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-upload-file',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
})

export class UploadComponent {
  isSaving = false;

  constructor(
    protected dataUtils: DataUtils,
  ) {}

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }
}
