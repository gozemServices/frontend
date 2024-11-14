import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../../../core/models/jobs.models';
import { CommonModule } from '@angular/common';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { faDeleteLeft, faEdit, faEye, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule,FormsModule,MatTabsModule,FontAwesomeModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent implements OnInit {

  faDelete = faDeleteLeft;
  faEdit = faEdit;
  faViewCandidates = faEye;
  fatoggleOn = faToggleOn;
  fatoggleOf = faToggleOff;
  jobOffers: JobOffer[] = [
    { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'New York', salary: 120000, description: 'Develop web applications', postingDate: new Date(), active: true },
    { id: 2, title: 'Product Manager', company: 'Innovative Inc.', location: 'San Francisco', salary: 150000, description: 'Lead product development', postingDate: new Date(), active: false },
    { id: 3, title: 'UI/UX Designer', company: 'Creative Studios', location: 'Los Angeles', salary: 95000, description: 'Design user interfaces', postingDate: new Date(), active: true },
    { id: 4, title: 'Frontend Developer', company: 'GlobalTech', location: 'Chicago', salary: 100000, description: 'Develop client-side applications', postingDate: new Date(), active: true },
    { id: 5, title: 'Backend Developer', company: 'Server Solutions', location: 'Austin', salary: 115000, description: 'Work on backend infrastructure', postingDate: new Date(), active: false }
  ];

  filteredOffers: JobOffer[] = [];
  page: number = 1;
  itemsPerPage: number = 3;
  searchQuery: string = '';
  sortField: keyof JobOffer = 'title';  // Ensure sortField is a valid key of JobOffer
  sortOrder: string = 'asc';
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredOffers = this.jobOffers;
  }

  openAddOfferModal(offer?: JobOffer): void {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      width: '700px',
      height: '400px',
      panelClass: 'custom-modal',
      data: offer || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (offer) {
          const index = this.jobOffers.findIndex(o => o.id === offer.id);
          if (index !== -1) {
            this.jobOffers[index] = result;
          }
        } else {
          result.id = this.jobOffers.length + 1;
          this.jobOffers.push(result);
        }
        this.applyFilters();
      }
    });
  }

  deleteOffer(id: number) {
    this.jobOffers = this.jobOffers.filter(offer => offer.id !== id);
    this.applyFilters();
  }

  toggleOfferStatus(id: number) {
    const offer = this.jobOffers.find(o => o.id === id);
    if (offer) {
      offer.active = !offer.active;
    }
    this.applyFilters();
  }

  applyFilters() {
    // Filter job offers based on search and status
    this.filteredOffers = this.jobOffers.filter(offer => {
      return (
        offer.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        offer.company.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        offer.location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });

    // Sort job offers
    this.filteredOffers.sort((a, b) => {
      // We use a type assertion here because `this.sortField` is now guaranteed to be a key of `JobOffer`
      if (this.sortOrder === 'asc') {
        return a[this.sortField].toString().localeCompare(b[this.sortField].toString());
      } else {
        return b[this.sortField].toString().localeCompare(a[this.sortField].toString());
      }
    });

    // Apply pagination
    this.filteredOffers = this.filteredOffers.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
  }

  setSortField(field: keyof JobOffer) {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  setPage(page: number) {
    this.page = page;
    this.applyFilters();
  }
}