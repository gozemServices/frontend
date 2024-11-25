import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CvthequeService } from '../../services/cv/cvtheque.service';
import { CvTemplateComponent } from '../../../shared/components/cv-template/cv-template.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, CvTemplateComponent, FormsModule, CommonModule],
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
    jobTitle: '',
    language: '',
    skill: '',
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
    const { jobTitle, language, skill } = this.filterCriteria;

    this.filteredCvList = this.cvList.filter((cv: any) => {
      const matchesJobTitle = jobTitle
        ? cv.cv?.jobTitle?.toLowerCase().includes(jobTitle.toLowerCase())
        : true;

      const matchesLanguage = language
        ? cv.cv?.language?.some((lang: any) =>
            lang.name.toLowerCase().includes(language.toLowerCase())
          )
        : true;

      const matchesSkill = skill
        ? cv.cv?.skills?.some((sk: any) =>
            sk.name.toLowerCase().includes(skill.toLowerCase())
          )
        : true;

      return matchesJobTitle && matchesLanguage && matchesSkill;
    });
  }

  loadPicture(fileName: string): string {
    return fileName ? `/assets/images/${fileName}` : 'assets/default-profile.png';
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
