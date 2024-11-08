import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-point-modal',
  standalone: true,
  imports: [],
  templateUrl: './buy-point-modal.component.html',
  styleUrl: './buy-point-modal.component.scss'
})
export class BuyPointModalComponent {
  pointsToBuy: number = 10;  // Default number of points to buy

  constructor(
    public dialogRef: MatDialogRef<BuyPointModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onBuy(): void {
    // Here, you can handle the logic for purchasing points (e.g., make an API call)
    this.dialogRef.close(this.pointsToBuy);  // Return the number of points selected
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without doing anything
  }
}
