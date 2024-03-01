import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FileModel } from '../file.model';

@Component({
  selector: 'jhi-files-detail',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './detail.component.html',
})

export class FilesDetailComponent implements OnInit{
  file: FileModel | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ file }) => {
      this.file = file;
    });
  }
}
