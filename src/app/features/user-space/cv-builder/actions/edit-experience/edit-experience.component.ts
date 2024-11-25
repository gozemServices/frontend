import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../../../services/cv/experience.service';
import { Experience, Task } from '../../../../../core/models/cv-sections.model';
import { TranslateModule } from '@ngx-translate/core';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-edit-experience',
  standalone: true,
  imports: [FormsModule, CommonModule,TranslateModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss'],
})
export class EditExperienceComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Input() isEditMode: boolean = false;
  @Input() experienceData?: Experience;
  @Output() closeModal = new EventEmitter<void>();
  @Output() experienceUpdated = new EventEmitter<void>();

  experienceForm!: FormGroup;
  isLoading = false;
  faAdd = faAdd;
  faRemove = faRemove;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService
  ) {}

  ngOnInit() {
    this.initForm(this.experienceData);
    console.log(this.experienceData);
  }

  initForm(data?: Experience) {
    // if(data) console.log(data);
    this.experienceForm = this.fb.group({
      startDate: [data?.startDate || '', Validators.required],
      endDate: [data?.endDate || '', Validators.required],
      position: [data?.position || '', Validators.required],
      company: [data?.company || '', Validators.required],
      tasks: this.createTasksArray(data?.task || []), // Initialize tasks as a FormArray
    });
  }

  createTasksArray(tasks: Task[]): FormArray {
    return this.fb.array(
      tasks.map((task) =>
        this.fb.control(task?.name, [Validators.required, Validators.minLength(3)])
      )
    );
  }

  get tasks(): FormArray {
    return this.experienceForm.get('tasks') as FormArray;
  }

  addTask() {
    this.tasks.push(
      this.fb.control('', [Validators.required, Validators.minLength(3)])
    );
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  onSubmit() {
    if(!this.experienceForm.valid) {
      this.experienceForm.markAllAsTouched();
    }
    if (this.experienceForm.valid) {
      const experienceData = this.experienceForm.value;
      const experienceId = this.experienceData?.id;
      console.log(experienceData);

      if (this.isEditMode && experienceId) {
        this.experienceService
          .updateExperience(experienceId, experienceData)
          .subscribe(
            (updatedData) => {
              this.experienceForm.reset();
              this.closeModal.emit();
              this.experienceUpdated.emit();
            },
            (error) => {
              console.error('Error updating experience:', error);
            }
          );
      } else {
        this.experienceService.addExperience(experienceData).subscribe(
          (newData) => {
            // console.log('New experience created:', newData);
            this.closeModal.emit();
            this.experienceUpdated.emit();
          },
          (error) => {
            console.error('Error creating experience:', error);
          }
        );
      }
    }
  }

  onCancel() {
    this.experienceForm.reset();
    this.closeModal.emit();
  }
}
