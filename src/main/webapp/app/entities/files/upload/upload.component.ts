import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DataUtils } from 'app/core/util/data-util.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Account } from '../../../core/auth/account.model';
import { FileService } from '../service/file.service';
import { EventManager } from '../../../core/util/event-manager.service';
import { FileBaseComponent } from './uploadCORE.component';

@Component({
  selector: 'jhi-upload-file',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './upload.component.html'
})

export class UploadComponent extends FileBaseComponent {
  currentAccount: Account | null = null;

  constructor(
    protected dataUtils: DataUtils,
    public fileService: FileService,
    protected eventManager: EventManager,
  ) {
    super(dataUtils, eventManager, fileService);
  }
}
