import { Component } from '@angular/core';
import SharedModule from 'app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'jhi-recent-documents',
  templateUrl: './recent-documents.component.html',
  imports: [SharedModule],
})
export class RecentDocumentsComponent {}