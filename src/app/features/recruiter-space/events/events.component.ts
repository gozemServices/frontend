
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisH, faEdit, faTrashAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { Event } from '../../../core/models/common.model';
import { FormsModule } from '@angular/forms';
import { UnderConstructionComponent } from '../../../shared/components/under-construction/under-construction.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, UnderConstructionComponent,DatePipe,CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  undercontruction = true;
  events: Event[] = [];  // List of events
  filteredEvents: Event[] = [];
  searchQuery: string = '';  // Search filter
  statusFilter: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled' | 'All' = 'All';  // Filter by event status
  page: number = 1;
  itemsPerPage: number = 5;

  activeActions: number | null = null;  // Track active dropdown for actions

  // Define the icons as properties
  faEllipsisH = faEllipsisH;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faCalendarAlt = faCalendarAlt;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // In a real app, you would fetch this from an API
    this.events = [
      { id: 1, eventName: 'Angular Conference', description: 'A conference about Angular', startDate: new Date('2024-04-10'), endDate: new Date('2024-04-12'), eventType: 'Conference', status: 'Upcoming' },
      { id: 2, eventName: 'React Webinar', description: 'A webinar about React', startDate: new Date('2024-05-15'), endDate: new Date('2024-05-15'), eventType: 'Webinar', status: 'Upcoming' },
      { id: 3, eventName: 'JavaScript Workshop', description: 'Workshop about JavaScript', startDate: new Date('2024-06-20'), endDate: new Date('2024-06-22'), eventType: 'Workshop', status: 'Completed' },
      { id: 4, eventName: 'Vue.js Seminar', description: 'Seminar about Vue.js', startDate: new Date('2024-07-05'), endDate: new Date('2024-07-06'), eventType: 'Seminar', status: 'Ongoing' }
    ];
    this.applyFilters();
  }

  // Toggle the actions dropdown visibility for the specific event
  toggleActions(eventId: number): void {
    if (this.activeActions === eventId) {
      this.activeActions = null;  // Close dropdown if it's already open
    } else {
      this.activeActions = eventId;  // Open dropdown for this event
    }
  }

  // Open modal to add/edit event
  openAddEventModal(event?: Event): void {
    const dialogRef = this.dialog.open(AddEventModalComponent, {
      width: '600px',
      height: '600px',
      data: event || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (event) {
          const index = this.events.findIndex(e => e.id === event.id);
          if (index !== -1) {
            this.events[index] = result;
          }
        } else {
          result.id = this.events.length + 1;
          this.events.push(result);
        }
        this.applyFilters();
      }
    });
  }

  // Filter events by search query and status
  applyFilters() {
    this.filteredEvents = this.events.filter(event => {
      return (
        (event.eventName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (this.statusFilter === 'All' || event.status === this.statusFilter)
      );
    });

    // Apply pagination
    this.filteredEvents = this.filteredEvents.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
  }

  // Update event status (e.g., 'Upcoming' -> 'Ongoing')
  updateStatus(event: Event, newStatus: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled') {
    event.status = newStatus;
    this.applyFilters();
  }
  deleteEvent(event: Event): void {
    this.events = this.events.filter(e => e.id !== event.id);  // Remove event from the list
    this.applyFilters();  // Reapply filters to update the view
  }

  setPage(page: number) {
    this.page = page;
    this.applyFilters();
  }
}