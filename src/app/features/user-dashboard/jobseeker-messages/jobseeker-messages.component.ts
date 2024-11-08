import { Component } from '@angular/core';
import { Message } from '../../../core/models/common.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faPaperPlane, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobseeker-messages',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,FormsModule],
  templateUrl: './jobseeker-messages.component.html',
  styleUrl: './jobseeker-messages.component.scss'
})
export class JobseekerMessagesComponent {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faTrashAlt = faTrashAlt;
  faPaperPlane = faPaperPlane;

  // Sample messages (this could come from a backend API)
  messages: Message[] = [
    {
      id: 1,
      sender: 'John Doe',
      subject: 'Job Opportunity',
      content: 'Hi, we have a job opening for the position of senior developer...',
      timestamp: 'Just now',
      read: false
    },
    {
      id: 2,
      sender: 'Jane Smith',
      subject: 'Interview Scheduled',
      content: 'Your interview for the Front-End Developer role has been scheduled...',
      timestamp: '1 hour ago',
      read: true
    },
    {
      id: 3,
      sender: 'Hiring Manager',
      subject: 'Application Status',
      content: 'Thank you for your application. We have received your resume...',
      timestamp: '2 days ago',
      read: false
    }
  ];

  selectedMessage: Message | null = null; // Currently selected message
  currentPage = 1;
  itemsPerPage = 3;
  totalPages = Math.ceil(this.messages.length / this.itemsPerPage);
  newMessageContent = '';

  constructor() {}

  ngOnInit(): void {
    // Initial setup can go here
  }

  // Select a message to view its content
  selectMessage(message: Message) {
    this.selectedMessage = message;
  }

  // Mark a message as read/unread
  toggleReadStatus(message: Message) {
    message.read = !message.read;
  }

  // Delete a message
  deleteMessage(message: Message) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
      this.totalPages = Math.ceil(this.messages.length / this.itemsPerPage); // Update total pages
      if (this.selectedMessage === message) {
        this.selectedMessage = null; // Clear the selected message if deleted
      }
    }
  }

  // Send a new message
  sendMessage() {
    if (this.newMessageContent.trim()) {
      const newMessage: Message = {
        id: this.messages.length + 1,
        sender: 'You',
        subject: 'New Message',
        content: this.newMessageContent,
        timestamp: 'Just now',
        read: false
      };
      this.messages.push(newMessage);
      this.newMessageContent = ''; // Reset the input after sending
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

  // Get the messages for the current page
  getCurrentMessages() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.messages.slice(startIndex, startIndex + this.itemsPerPage);
  }

}
