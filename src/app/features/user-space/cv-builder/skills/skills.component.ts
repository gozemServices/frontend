import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SkillsService } from '../../../services/cv/skills.service';
import { EditSkillComponent } from '../actions/edit-skill/edit-skill.component';
import { GenericService } from '../../../../core/services/generic.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule, 
    FontAwesomeModule, 
    EditSkillComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  faDanger = faExclamationTriangle;
  cvId!: number;
  isEditVisible = false;
  selectedSkills: any = null;
  isEditMode = false;
  loading = true;
  confirmDeletion = true;
  isConfirmationModalOpened = false;
  itemToDelete: number | null = null;


  skillsList: any[] = [];
  selectedSkill: any = null;

  constructor(private skillsService: SkillsService,private genericsService: GenericService) {}

  ngOnInit() {
    this.getSkillsList();
  }

  getSkillsList() {
    this.loading = true;
    this.skillsService.getSkillsList().subscribe(
      (data) => {
        this.skillsList = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching skills data:', error);
      }
    );
  }

  addSkill() {
    this.selectedSkill = null;
    this.isEditVisible = true; 
    this.isEditMode = false;
  }
  editSkill(skill: any) {    
    this.selectedSkill = skill;
    this.isEditVisible = true;
    this.isEditMode  = true;
  }

  deleteSkill(skillId: number) {
    this.confirmDeletion = true;
    this.isConfirmationModalOpened = true;
    this.itemToDelete = skillId;
  }


  effectiveDeleteSkill(action: boolean) {
    alert(`this is the selected : ${this.itemToDelete}`)
    const skillId = this.itemToDelete;
    if(action === true) {
      this.skillsService.deleteSkill(skillId ?? 0).subscribe(
        () => {
          this.skillsList = this.skillsList.filter((sk) => sk.id !== skillId);
          this.isConfirmationModalOpened = false;
          this.itemToDelete = null;
          this.getSkillsList();
        },
        (error: any) => {
          console.error('Error deleting reference:', error);
        }
      );
    } else {
      this.itemToDelete = null;
      this.isConfirmationModalOpened = false
    }
   
}

  onModalClose() {
    this.isEditVisible = false;
    this.selectedSkill = null;
    this.isEditMode = false;
    this.getSkillsList();
  }
}
