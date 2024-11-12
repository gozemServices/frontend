import { Component } from '@angular/core';
import { Candidature } from '../../../core/models/jobs.models';
import { AddOfferComponent } from '../offers/add-offer/add-offer.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faEllipsisH, faEdit, faComments, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule],
  templateUrl: './candidatures.component.html',
  styleUrl: './candidatures.component.scss'
})
export class CandidaturesComponent {
  candidatures: Candidature[] = [];  // List of candidatures
  filteredCandidatures: Candidature[] = [];
  searchQuery: string = '';  // Search filter
  statusFilter: 'pending' | 'interview' | 'hired' | 'rejected' | 'all' = 'all';  // Filter by status
  page: number = 1;
  itemsPerPage: number = 5;

  // Keep track of the currently active actions menu
  activeActions: number | null = null;  // ID of the candidature with open actions

  // Define the icons as properties
  faEllipsisH = faEllipsisH;
  faEdit = faEdit;
  faComments = faComments;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch candidatures (in a real app, you'd fetch this from an API)
    this.candidatures = [
      { id: 1, candidateName: 'John Doe', email: 'john@example.com', phone: '123-456-7890', jobTitle: 'Software Engineer', company: 'TechCorp', coverLetter: 'Cover letter content', resume: '', status: 'pending', appliedDate: new Date() },
      { id: 2, candidateName: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', jobTitle: 'Product Manager', company: 'Innovative Inc.', coverLetter: 'Cover letter content', resume: '', status: 'interview', appliedDate: new Date() },
      { id: 3, candidateName: 'Mark Brown', email: 'mark@example.com', phone: '555-555-5555', jobTitle: 'UI/UX Designer', company: 'Creative Studios', coverLetter: 'Cover letter content', resume: '', status: 'hired', appliedDate: new Date() },
      { id: 4, candidateName: 'Sarah Connor', email: 'sarah@example.com', phone: '777-777-7777', jobTitle: 'Backend Developer', company: 'GlobalTech', coverLetter: 'Cover letter content', resume: '', status: 'rejected', appliedDate: new Date() }
    ];
    this.applyFilters();
  }

  // Toggle the actions dropdown visibility for the specific candidature
  toggleActions(candidatureId: number): void {
    if (this.activeActions === candidatureId) {
      this.activeActions = null;  // Close dropdown if it's already open
    } else {
      this.activeActions = candidatureId;  // Open dropdown for this candidature
    }
  }

  // Open modal to add/edit candidature
  openAddCandidatureModal(candidature?: Candidature): void {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      width: '500px',
      data: candidature || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (candidature) {
          const index = this.candidatures.findIndex(c => c.id === candidature.id);
          if (index !== -1) {
            this.candidatures[index] = result;
          }
        } else {
          result.id = this.candidatures.length + 1;
          this.candidatures.push(result);
        }
        this.applyFilters();
      }
    });
  }

  // Filter candidatures by search query and status
  applyFilters() {
    this.filteredCandidatures = this.candidatures.filter(c => {
      return (
        (c.candidateName.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        c.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (this.statusFilter === 'all' || c.status === this.statusFilter)
      );
    });

    // Apply pagination
    this.filteredCandidatures = this.filteredCandidatures.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
  }

  // Update status of a candidature (e.g., 'pending' -> 'interview')
  updateStatus(candidature: Candidature, newStatus: 'pending' | 'interview' | 'hired' | 'rejected') {
    candidature.status = newStatus;
    this.applyFilters();
  }

  setPage(page: number) {
    this.page = page;
    this.applyFilters();
  }
}