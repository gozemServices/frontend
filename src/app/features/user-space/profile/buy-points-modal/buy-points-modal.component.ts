import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-buy-points-modal',
  standalone: true,
  imports: [MatDialogModule,MatFormField,MatLabel,FormsModule],
  templateUrl: './buy-points-modal.component.html',
  styleUrl: './buy-points-modal.component.scss'
})
export class BuyPointsModalComponent {
  pointsToBuy: number = 10;  
  constructor(
    public dialogRef: MatDialogRef<BuyPointsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onBuy(): void {
    this.dialogRef.close(this.pointsToBuy);  
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
