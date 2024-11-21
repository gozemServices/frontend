import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { InterestsService } from '../../../services/cv/interests.service';
import { EditInterestsComponent } from '../actions/edit-interests/edit-interests.component';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [MatIconModule,FontAwesomeModule,EditInterestsComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;

  @Input() interestsList: any[] = [];
  @Input() cvId!: number;
  @Output() addInterest = new EventEmitter<void>();
  @Output() editInterest = new EventEmitter<any>();

  isAddModalVisible = false;

  constructor(private interestsService: InterestsService) {}

  getInterestsList() {
    this.interestsService.getInterestsList().subscribe(
      (data) => {
        this.interestsList = data;
      },
      (error) => {
        console.error('Error fetching interests data:', error);
      }
    );
  }

  onModalClose() {
    this.isAddModalVisible = false;
  }

  onEdit(interest: any) {
    this.editInterest.emit(interest);
  }

  onAdd() {
    this.isAddModalVisible = true;
  }
}
