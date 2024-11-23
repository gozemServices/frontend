import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { InterestsService } from '../../../services/cv/interests.service';
import { EditInterestsComponent } from '../actions/edit-interests/edit-interests.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [TranslateModule,FontAwesomeModule,EditInterestsComponent],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  faDanger = faExclamationTriangle;
  interestsList: any[] = [];
  isEditMode = false;
  selectedInterest: any = null;
  isEditVisible = false;
  isLoading = false;
  cvId!: number;
  confirmDeletion = true;
  isConfirmationModalOpened = false;
  itemToDelete: number | null = null;


  constructor(private interestsService: InterestsService) {}
  ngOnInit() {
    this.fetchInterests();
  }

  fetchInterests() {
    this.interestsService.getInterestsList().subscribe(
      (data) => {
        this.interestsList = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching interests data:', error);
        this.isLoading = false;
      }
    );
  }

  addInterest() {
    this.selectedInterest = null; // Clear selection for new entry.
    this.isEditMode = false;
    this.isEditVisible = true;
  }
  editInterest(reference: any) {
    this.selectedInterest = reference;
    this.isEditMode = true;
    this.isEditVisible = true;
  }
  deleteInterest(interestId: number) {
    this.confirmDeletion = true;
    this.isConfirmationModalOpened = true;
    this.itemToDelete = interestId;
  }


  effectiveDeleteReference(action: boolean) {
    const interestId = this.itemToDelete;
    if(action === true) {
      this.interestsService.deleteInterest(interestId ?? 0).subscribe(
        () => {
          this.interestsList = this.interestsList.filter((int) => int.id !== interestId);
          this.isConfirmationModalOpened = false;
          this.itemToDelete = null;
          this.fetchInterests();
        },
        (error: any) => {
          console.error('Error deleting interests:', error);
        }
      );
    } else {
      this.itemToDelete = null;
      this.isConfirmationModalOpened = false
    }
  }
  onModalClose() {
    this.isEditVisible = false; 
    this.refreshInterestList();
  }

  refreshInterestList() {
    this.fetchInterests();
  }
}
