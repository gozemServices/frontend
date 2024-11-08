import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faClipboardList, faHourglassHalf, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faHourglassHalf = faHourglassHalf;
  faClipboardList = faClipboardList;

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

  // Jobs where the user is asked to join the waiting list
  waitingListInvitations = [
    { jobTitle: 'Frontend Developer', company: 'Company A', dateInvited: '2024-10-01' },
    { jobTitle: 'Backend Developer', company: 'Company B', dateInvited: '2024-10-05' },
    { jobTitle: 'Full Stack Developer', company: 'Company C', dateInvited: '2024-10-07' },
    { jobTitle: 'UI/UX Designer', company: 'Company D', dateInvited: '2024-10-08' },
    { jobTitle: 'Mobile Developer', company: 'Company E', dateInvited: '2024-10-10' },
    { jobTitle: 'DevOps Engineer', company: 'Company F', dateInvited: '2024-10-12' },
    { jobTitle: 'Data Scientist', company: 'Company G', dateInvited: '2024-10-14' }
  ];

  // Pagination state
  pageApplied = 1;
  pageWaitingList = 1;
  itemsPerPage = 3;

  // Helper to get the displayed jobs based on pagination
  get displayedAppliedJobs() {
    const startIndex = (this.pageApplied - 1) * this.itemsPerPage;
    return this.appliedJobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get displayedWaitingListJobs() {
    const startIndex = (this.pageWaitingList - 1) * this.itemsPerPage;
    return this.waitingListInvitations.slice(startIndex, startIndex + this.itemsPerPage);
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
    if (this.pageWaitingList * this.itemsPerPage < this.waitingListInvitations.length) {
      this.pageWaitingList++;
    }
  }

  prevPageWaitingList() {
    if (this.pageWaitingList > 1) {
      this.pageWaitingList--;
    }
  }

  // Methods for accepting or refusing the waiting list invitation
  acceptWaitingList(jobTitle: string) {
    alert(`Accepted the invitation for ${jobTitle}`);
    // Handle acceptance logic here
  }

  refuseWaitingList(jobTitle: string) {
    alert(`Refused the invitation for ${jobTitle}`);
    // Handle refusal logic here
  }

  getTotalPagesWaitingList(): number {
    return Math.ceil(this.waitingListInvitations.length / this.itemsPerPage);
  }

  // Method to calculate total pages for applied jobs
  getTotalPagesApplied(): number {
    return Math.ceil(this.appliedJobs.length / this.itemsPerPage);
  }
  constructor() {}

  ngOnInit(): void {}

}
