import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileService } from 'app/entities/file/file.service';
import { AlertService } from '../../core/util/alert.service';

@Component({
  selector: 'jhi-confirm-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() idFile: number = 0;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmActionEvent = new EventEmitter<void>();
  modalVisible: boolean = false;

  constructor(
    private fileService: FileService,
    private alertService: AlertService
  ) {}

  closeModal(): void {
    this.modalVisible = false;
    this.closeModalEvent.emit();
  }

  confirmDeleteAction(id: number): void {
    if (id) {
      this.fileService.deleteFile(id);
      this.toggleModal();
      this.alertService.addAlert({ type: 'success', message: 'Your file is deleted!' });
    } else {
      console.error('No file ID provided.');
    }
  }

  toggleModal(): void {
    this.modalVisible = !this.modalVisible;
  }
}
