import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SkillsService } from '../../../services/cv/skills.service';
import { EditSkillComponent } from '../actions/edit-skill/edit-skill.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [MatIconModule, FontAwesomeModule, EditSkillComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;

  @Input() skillsList: any[] = [];
  @Input() cvId!: number;

  @Output() skillAdded = new EventEmitter<void>();
  @Output() skillEdited = new EventEmitter<any>();
  @Output() skillDeleted = new EventEmitter<number>();

  isAddModalVisible = false;
  selectedSkill: any = null;
  isEditMode = false;

  constructor(private skillsService: SkillsService) {}

  ngOnInit() {
    this.getSkillsList();
  }

  getSkillsList() {
    this.skillsService.getSkillsList().subscribe(
      (data) => {
        this.skillsList = data;
      },
      (error) => {
        console.error('Error fetching skills data:', error);
      }
    );
  }

  onModalClose() {
    this.isAddModalVisible = false;
    this.selectedSkill = null;
    this.isEditMode = false;
    this.getSkillsList(); // Refresh the list after a change
  }

  onAdd() {
    this.isAddModalVisible = true;
    this.isEditMode = false;
    this.selectedSkill = null;
  }

  onEdit(skill: any) {
    this.isAddModalVisible = true;
    this.isEditMode = true;
    this.selectedSkill = skill;
  }

  onDelete(skillId: number) {
    this.skillsService.deleteSkill(skillId).subscribe(
      () => {
        console.log('Skill deleted:', skillId);
        this.skillDeleted.emit(skillId);
        this.getSkillsList(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting skill:', error);
      }
    );
  }
}
