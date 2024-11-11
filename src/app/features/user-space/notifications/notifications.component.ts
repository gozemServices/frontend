import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faCheckCircle, faEnvelope, faExclamationTriangle, faInfoCircle, faList, faTh, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../../../core/models/common.model';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  faTh = faTh;    // Grid view icon
  faList = faList; // List view icon
  faCheckCircle = faCheckCircle; // Mark as read icon
  faTrashAlt = faTrashAlt; // Trash icon for delete

  // Sample notifications (this could be fetched from an API)
  notifications: Notification[] = [
    {
      type: 'success',
      title: 'Job Application Accepted',
      message: 'Your application for the position of Senior Developer has been accepted. Congratulations!',
      timestamp: 'Just now',
      icon: faCheckCircle,
      read: false
    },
    {
      type: 'error',
      title: 'Job Application Rejected',
      message: 'Unfortunately, your application for the Junior Designer role was not successful.',
      timestamp: '2 hours ago',
      icon: faTimesCircle,
      read: false
    },
    {
      type: 'info',
      title: 'Interview Scheduled',
      message: 'Your interview for the Front-End Developer position has been scheduled for tomorrow at 10 AM.',
      timestamp: '1 day ago',
      icon: faInfoCircle,
      read: false
    },
    {
      type: 'warning',
      title: 'Pending Application Review',
      message: 'Your application for the Marketing Manager position is still under review. Please be patient.',
      timestamp: '3 days ago',
      icon: faExclamationTriangle,
      read: false
    },
    {
      type: 'new',
      title: 'New Job Posted',
      message: 'A new job has been posted for the role of Senior Data Analyst. Check it out!',
      timestamp: '5 minutes ago',
      icon: faBell,
      read: false
    },
    {
      type: 'message',
      title: 'New Message',
      message: 'You have received a new message from Jane Smith regarding your application.',
      timestamp: '1 hour ago',
      icon: faEnvelope,
      read: false
    }
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 3;
  totalPages = Math.ceil(this.notifications.length / this.itemsPerPage);

  // View mode: 'grid' or 'flex'
  currentView: 'grid' | 'flex' = 'grid';  // Default to grid view

  constructor() {}

  ngOnInit(): void {
    // Initial fetch or logic for loading notifications can go here
  }

  // Method to toggle between grid and flex views
  toggleView(view: 'grid' | 'flex') {
    this.currentView = view;
  }

  // Get notification classes dynamically based on notification type
  getNotificationClasses(notification: Notification) {
    const baseClass = notification.read ? 'bg-gray-200 opacity-75' : 'bg-white';
    switch (notification.type) {
      case 'success':
        return `${baseClass} border-l-4 border-green-500`;
      case 'error':
        return `${baseClass} border-l-4 border-red-500`;
      case 'info':
        return `${baseClass} border-l-4 border-blue-500`;
      case 'warning':
        return `${baseClass} border-l-4 border-yellow-500`;
      case 'new':
        return `${baseClass} border-l-4 border-[#AF4E64]`;
      case 'message':
        return `${baseClass} border-l-4 border-gray-500`;
      default:
        return baseClass;
    }
  }

  // Mark a notification as read
  markAsRead(notification: Notification) {
    notification.read = true;  // Mark as read
  }

  // Delete a notification
  deleteNotification(notification: Notification) {
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
      this.notifications.splice(index, 1);  // Remove the notification
      this.totalPages = Math.ceil(this.notifications.length / this.itemsPerPage);  // Recalculate total pages
    }
  }

  // Pagination methods
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}