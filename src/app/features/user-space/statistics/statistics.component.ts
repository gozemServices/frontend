import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faClipboardList, faHourglassHalf, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit{

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faHourglassHalf = faHourglassHalf;
  faClipboardList = faClipboardList;
  searchQuery: string = '';
  selectedStatus: string = '';

  stats = {
    applied: 10,
    rejected: 3,
    pending: 5,
    accepted: 2
  };

  // Jobs the user has applied for
  appliedJobs = [
    { jobTitle: 'Frontend Developer', company: 'Company A', dateApplied: '2024-10-01', status: 'Pending' },
    { jobTitle: 'Backend Developer', company: 'Company B', dateApplied: '2024-10-05', status: 'Accepted' },
    { jobTitle: 'Full Stack Developer', company: 'Company C', dateApplied: '2024-10-07', status: 'Rejected' },
    { jobTitle: 'UI/UX Designer', company: 'Company D', dateApplied: '2024-10-08', status: 'Pending' },
    { jobTitle: 'Mobile Developer', company: 'Company E', dateApplied: '2024-10-10', status: 'Pending' },
    { jobTitle: 'DevOps Engineer', company: 'Company F', dateApplied: '2024-10-12', status: 'Accepted' },
    { jobTitle: 'Data Scientist', company: 'Company G', dateApplied: '2024-10-14', status: 'Pending' }
  ];
  waitingList = [
    { jobTitle: 'Frontend Developer', company: 'Company A', dateApplied: '2024-10-01', status: 'Pending' },
    { jobTitle: 'Backend Developer', company: 'Company B', dateApplied: '2024-10-05', status: 'Accepted' },
    { jobTitle: 'Full Stack Developer', company: 'Company C', dateApplied: '2024-10-07', status: 'Rejected' },
    { jobTitle: 'UI/UX Designer', company: 'Company D', dateApplied: '2024-10-08', status: 'Pending' },
    { jobTitle: 'Mobile Developer', company: 'Company E', dateApplied: '2024-10-10', status: 'Pending' },
    { jobTitle: 'DevOps Engineer', company: 'Company F', dateApplied: '2024-10-12', status: 'Accepted' },
    { jobTitle: 'Data Scientist', company: 'Company G', dateApplied: '2024-10-14', status: 'Pending' }
  ];
  // Pagination state
  pageApplied = 1;
  pageWaitingList = 1;
  itemsPerPage = 3;
 
  constructor() {}

  ngOnInit(): void {}


  get displayedAppliedJobs() {
    const startIndex = (this.pageApplied - 1) * this.itemsPerPage;
    return this.appliedJobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get displayedWaitingListJobs() {
    const startIndex = (this.pageWaitingList - 1) * this.itemsPerPage;
    return this.waitingList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Methods to handle pagination
  nextPageApplied() {
    if (this.pageApplied * this.itemsPerPage < this.appliedJobs.length) {
      this.pageApplied++;
    }
  }

  prevPageApplied() {
    if (this.pageApplied > 1) {
      this.pageApplied--;
    }
  }

  nextPageWaitingList() {
    if (this.pageWaitingList * this.itemsPerPage < this.waitingList.length) {
      this.pageWaitingList++;
    }
  }

  prevPageWaitingList() {
    if (this.pageWaitingList > 1) {
      this.pageWaitingList--;
    }
  }
  getTotalPagesWaitingList(): number {
    return Math.ceil(this.waitingList.length / this.itemsPerPage);
  }

  // Method to calculate total pages for applied jobs
  getTotalPagesApplied(): number {
    return Math.ceil(this.appliedJobs.length / this.itemsPerPage);
  }

}
