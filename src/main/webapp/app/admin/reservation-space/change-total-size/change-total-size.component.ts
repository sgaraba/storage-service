import {Component} from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-change-total-size',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './change-total-size.component.html',
})
export class ChangeTotalSizeComponent {

}
