import { Component, Input } from '@angular/core';
import { FileService } from '../../service/file.service';
import saveAs from 'file-saver';
import SharedModule from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FileModel } from '../../file.model';

@Component({
  standalone: true,
  selector: 'app-files-list-action',
  templateUrl: './list-action.component.html',
  imports: [SharedModule, RouterModule],
})
export default class FilesListAction {
  @Input() selectedFiles: FileModel[] = [];
  @Input() page_list_all: boolean = false;
  
  constructor(private fileService: FileService) {}

  donwloadArchive(){
    console.log(this.selectedFiles);
  }

  exportListFiles(type: string) {
    this.fileService.exportFiles(type).subscribe((blob: Blob) => {
      saveAs(blob, 'list of files');
    });
  }
}
