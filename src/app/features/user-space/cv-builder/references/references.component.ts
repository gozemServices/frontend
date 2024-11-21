import { Component, Input } from '@angular/core';
import { ReferencesService } from '../../../services/cv/references.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditReferencesComponent } from '../actions/edit-references/edit-references.component';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,EditReferencesComponent],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  @Input() cvId!: number;
  references: any[] = [];
  isLoading = false;
  isEditMode = false;
  selectedReference: any = null;
  isEditVisible = false;
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;

  constructor(private referencesService: ReferencesService) {}

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
    this.selectedReference = null; // Clear selection for new entry.
    this.isEditMode = false;
    this.isEditVisible = true;
  }

  editReference(reference: any) {
    this.selectedReference = reference;
    this.isEditMode = true;
    this.isEditVisible = true;
  }

  deleteReference(referenceId: number) {
    if (confirm('Are you sure you want to delete this reference?')) {
      this.referencesService.deleteReference(referenceId).subscribe(
        () => {
          this.references = this.references.filter((ref) => ref.id !== referenceId);
        },
        (error: any) => {
          console.error('Error deleting reference:', error);
        }
      );
    }
  }

  closeEditModal() {
    this.isEditVisible = false;
    this.fetchReferences(); // Refresh the list.
  }


}
