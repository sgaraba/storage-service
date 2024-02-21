import {Component} from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'jhi-change-total-size',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './change-total-size.component.html',
})
export class ChangeTotalSizeComponent {

}
