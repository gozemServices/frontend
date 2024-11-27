import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CvthequeService } from '../../services/cv/cvtheque.service';
import { CvTemplateComponent } from '../../../shared/components/cv-template/cv-template.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { GenericService } from '../../../core/services/generic.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { CvItemComponent } from "../cvtheque/cv-item/cv-item.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, CvItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  isLoading = false;
  cvList: any[] = [];
  filteredCvList: any[] = [];
  isPrevisualized = false;
  selectedData: any = null;
  errorMessage: string | null = null;

  // Updated filter criteria to be arrays
  filterCriteria: any = {
    jobTitles: [],
    languages: [],
    skills: [],
  };
  // To track the applied filters for UI display
  appliedFilters: { category: string; value: string }[] = [];
  private cvthequeService = inject(CvthequeService);
  constructor() {}

  ngOnInit() {
    this.fetchCvs();
  }

  fetchCvs() {
    this.isLoading = true;
    this.cvthequeService.getAllCvs().subscribe(
      (data) => {
        this.cvList = data;
        this.filteredCvList = [...this.cvList];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
        // Optionally add a user-friendly error message
        this.errorMessage = 'Failed to load CVs. Please try again later.';
      }
    );
  }
  

  applyFilters() {
    const { jobTitles, languages, skills } = this.filterCriteria;
  
    this.isLoading = true;
    this.cvthequeService
      .getFilteredCvs({ jobTitles, languages, skills })
      .subscribe(
        (data) => {
          this.filteredCvList = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching filtered data:', error);
          this.isLoading = false;
        }
      );
  }
  

  addFilter(category: string, value: string) {
    if (value && !this.filterCriteria[category].includes(value.toLowerCase())) {
      this.filterCriteria[category].push(value.toLowerCase());
      this.appliedFilters.push({ category, value });
      this.applyFilters();
    }
  }
  
  removeFilter(category: string, value: string) {
    this.filterCriteria[category] = this.filterCriteria[category].filter(
      (item: string) => item !== value.toLowerCase()
    );
    this.appliedFilters = this.appliedFilters.filter(
      (filter) => !(filter.category === category && filter.value === value)
    );
    this.applyFilters();
  }


  handleKeydown(event: KeyboardEvent, category: string) {
    if (event.key === 'Enter') {
      const inputValue = (event.target as HTMLInputElement).value.trim();
      if (inputValue) {
        this.addFilter(category, inputValue);
        (event.target as HTMLInputElement).value = ''; // Clear input after adding
      }
    }
  }

}


