import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FileService } from 'app/entities/file/file.service';

@Component({
  selector: 'jhi-confirm-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() idFile: number = 0;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmActionEvent = new EventEmitter<void>();
  modalVisible: boolean = false;

  constructor(private fileService: FileService) {}
  ngOnInit(): void {}

  closeModal(): void {
    this.modalVisible = false;
    this.closeModalEvent.emit();
  }

  confirmDeleteAction(id: number): void {
    this.fileService.deleteFile(id);
    this.toggleModal();
  }

  toggleModal(): void {
    this.modalVisible = !this.modalVisible;
  }
}
