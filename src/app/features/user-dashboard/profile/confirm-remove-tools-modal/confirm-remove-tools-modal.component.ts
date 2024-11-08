import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-remove-tools-modal',
  standalone: true,
  imports: [MatDialogModule,FontAwesomeModule],
  templateUrl: './confirm-remove-tools-modal.component.html',
  styleUrl: './confirm-remove-tools-modal.component.scss'
})
export class ConfirmRemoveToolsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmRemoveToolsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  faDanger = faExclamationTriangle;

  onRemove(): void {
    this.dialogRef.close(true);  
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}
