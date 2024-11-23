import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CvthequeService } from '../../services/cv/cvtheque.service';
import { CvTemplateComponent } from '../../../shared/components/cv-template/cv-template.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, CvTemplateComponent, FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  cvList: any[] = [];
  filteredCvList: any[] = [];
  isPrevisualized = false;
  selectedData: any = null;

  // Filtering criteria
  filterCriteria = {
    experience: '',
    skills: '',
    location: '',
  };

  constructor(private cvthequeService: CvthequeService) {}

  ngOnInit() {
    this.fetchCvs();
  }

  fetchCvs() {
    this.isLoading = true;
    this.cvthequeService.getAllCvs().subscribe(
      (data) => {
        this.cvList = data;
        this.filteredCvList = [...this.cvList]; // Initialize with all CVs
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilters() {
    this.filteredCvList = this.cvList.filter((cv: any) => {
      const matchesExperience = this.filterCriteria.experience
        ? cv.experienceLevel === this.filterCriteria.experience
        : true;

      const matchesSkills = this.filterCriteria.skills
        ? cv.skills.some((skill: string) =>
            skill.toLowerCase().includes(this.filterCriteria.skills.toLowerCase())
          )
        : true;

      const matchesLocation = this.filterCriteria.location
        ? cv.location.toLowerCase().includes(this.filterCriteria.location.toLowerCase())
        : true;

      return matchesExperience && matchesSkills && matchesLocation;
    });
  }

  loadPicture(fileName: string): string {
    // Implement logic to generate picture URL
    return '';
  }

  togglePrevisualized() {
    this.isPrevisualized = !this.isPrevisualized;
  }

  selectCv(data: any) {
    this.selectedData = data;
    this.isPrevisualized = true;
  }

  onCloseModal() {
    this.selectedData = null;
    this.isPrevisualized = false;
  }
}
