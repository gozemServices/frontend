import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    TranslateModule,
    MatIconModule,
    FontAwesomeModule
],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  
  @Input() educationList: any[] = [];
  @Output() addEducation = new EventEmitter<void>();
  @Output() editEducation = new EventEmitter<any>();
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;



  onAdd() {
    this.addEducation.emit(); // Trigger the modal opening in CvBuilderComponent
  }

  onEdit(education: any) {
    this.editEducation.emit(education); // Send the selected education data for editing
  }

}
