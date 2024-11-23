import { Component, Input } from '@angular/core';
import { ReferencesService } from '../../../services/cv/references.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditReferencesComponent } from '../actions/edit-references/edit-references.component';
import { faAdd, faEdit, faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Reference } from '../../../../core/models/cv-sections.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [TranslateModule, CommonModule,FontAwesomeModule,EditReferencesComponent],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  faDanger = faExclamationTriangle;

  @Input() cvId!: number;
  references: Reference[] = [];
  isLoading = false;
  confirmDeletion = true;
  isEditMode = false;
  selectedReference: any = null;
  isEditVisible = false;
  isConfirmationModalOpened = false;
  itemToDelete: number | null = null;
 

  constructor(
    private referencesService: ReferencesService,
  ) {}

  ngOnInit() {
    this.fetchReferences();
  }

  fetchReferences() {
    this.isLoading = true;
    this.referencesService.getReferencesList().subscribe(
      (data: any[]) => {
        this.references = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching references:', error);
        this.isLoading = false;
      }
    );
  }

  addReference() {
    this.selectedReference = null; 
    this.isEditMode = false;
    this.isEditVisible = true;
  }

  editReference(reference: Reference) {
    this.selectedReference = reference;
    this.isEditMode = true;
    this.isEditVisible = true;
  }

  deleteReference(referenceId: number) {
    this.confirmDeletion = true;
    this.isConfirmationModalOpened = true;
    this.itemToDelete = referenceId;
  }

  effectiveDeleteReference(action: boolean) {
    const educationId = this.itemToDelete;
    if(action === true) {
      this.referencesService.deleteReference(educationId ?? 0).subscribe(
        () => {
          this.references = this.references.filter((ref) => ref.id !== educationId);
          this.isConfirmationModalOpened = false;
          this.itemToDelete = null;
          this.fetchReferences();
        },
        (error: any) => {
          console.error('Error deleting education:', error);
        }
      );
    } else {
      this.itemToDelete = null;
      this.isConfirmationModalOpened = false
    }
   
}

onModalClose() {
  this.isEditVisible = false; 
  this.fetchReferences();
}

}
