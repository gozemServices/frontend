import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.scss'
})
export class DialogMessageComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },
    private dialogRef: MatDialogRef<DialogMessageComponent>
  ) {}
  get dialogColor() {
    return this.data.title === 'Success' ? 'green' : 'red';
  }

  closeDialog(): void {
    this.dialogRef.close(); 
  }
}
