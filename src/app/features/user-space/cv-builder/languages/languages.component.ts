import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTrash, faEdit, faAdd, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { EditLanguageComponent } from '../actions/edit-language/edit-language.component';
import { LanguagesService } from '../../../services/cv/languages.service';
import { Language } from '../../../../core/models/cv-sections.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [TranslateModule, CommonModule, EditLanguageComponent,FontAwesomeModule],
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  faDanger = faExclamationTriangle;

  @Input() cvId!: number;
  @Input() languageList: Language[] = [];
  isEditVisible = false;
  selectedLanguage: any = null;
  isEditMode = false;
  loading = true;
  isConfirmationModalOpened = false;
  itemToDelete: number | null = null;

  constructor(private languageService: LanguagesService) {}

  ngOnInit() {
    this.getLanguagesList();
  }

  getLanguagesList() {
    this.loading = true;
    this.languageService.getLanguagesList().subscribe(
      (data) => {
        this.languageList = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching languages:', error);
        this.loading = false;
      }
    );
  }

  addLanguage() {
    this.selectedLanguage = null;
    this.isEditVisible = true;
    this.isEditMode = false;
  }

  editLanguage(language: Language) {
    this.selectedLanguage = language;
    this.isEditVisible = true;
    this.isEditMode = true;
  }

  deleteLanguage(languageId: number) {
    this.itemToDelete = languageId;
    this.isConfirmationModalOpened = true;
  }

  effectiveDeleteLanguage(confirm: boolean) {
    if (confirm && this.itemToDelete != null) {
      this.languageService.deleteLanguage(this.itemToDelete).subscribe(
        () => {
          this.languageList = this.languageList.filter((lang) => lang.id !== this.itemToDelete);
          this.isConfirmationModalOpened = false;
          this.itemToDelete = null;
        },
        (error) => {
          console.error('Error deleting language:', error);
        }
      );
    } else {
      this.isConfirmationModalOpened = false;
      this.itemToDelete = null;
    }
  }

  onModalClose() {
    this.isEditVisible = false;
    this.getLanguagesList();
  }
}
