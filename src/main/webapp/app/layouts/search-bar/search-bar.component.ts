import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jhi-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  @Output() onChangeEvent = new EventEmitter<string>();

  onChange(event: any) {
    this.onChangeEvent.emit(event.target.value);
  }
}
