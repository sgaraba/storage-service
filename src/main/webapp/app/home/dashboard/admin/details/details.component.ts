import { Component } from '@angular/core';
import SharedModule from 'app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'jhi-details',
  templateUrl: './details.component.html',
  imports: [SharedModule],
})
export class DetailsComponent {}
