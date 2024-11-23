import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillsService } from '../../../../services/cv/skills.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-edit-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent {
  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Input() selectedSkill?: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() educationUpdated = new EventEmitter<void>();
  skillForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private skillsService: SkillsService) {}

  ngOnInit() {
    this.initForm(this.selectedSkill);
  }

  initForm(data: any) {
    this.skillForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      level: [data?.level || '', Validators.required],
      description: [data?.description || '', Validators.maxLength(500)],
    });
  }

  onSubmit() {
    if (this.skillForm.valid) {
      const skillData = this.skillForm.value;
      this.isLoading = true;

      if (this.isEditMode) {
        this.skillsService.updateSkill(this.selectedSkill.id, skillData).subscribe(
          () => {
            console.log('Skill updated');
            this.closeModal.emit();
          },
          (error) => {
            console.error('Error updating skill:', error);
          }
        );
      } else {
        this.skillsService.addSkill(skillData).subscribe(
          () => {
            console.log('New skill added');
            this.closeModal.emit();
          },
          (error) => {
            console.error('Error adding skill:', error);
          }
        );
      }
    }
  }

  onCancel() {
    this.closeModal.emit();
  }
}
