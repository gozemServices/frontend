import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Education, Experience } from '../../../../core/models/cv-sections.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ 
    FontAwesomeModule
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;

  @Input() experienceList: Experience[] = [];
  @Output() addExperience = new EventEmitter<void>();
  @Output() editExperience = new EventEmitter<any>();

  onAdd(){
    this.addExperience.emit();
  }
  onEdit(education: Experience){
    this.editExperience.emit(education)
  }
}
