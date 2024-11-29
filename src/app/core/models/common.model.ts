export interface User {
    email: string;
    password: string;
    role: string;
    name: string;
    surname: string;
    phone: string;
    profilePhotoUrl: string;
    username: string;
  }
  

export interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  type: string;    
  title: string;   
  message: string; 
  timestamp: string; 
  icon: any;       
  read: boolean;
}


export interface Event {
  id: number;
  eventName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  eventType: 'Conference' | 'Webinar' | 'Workshop' | 'Seminar';  // Example event types
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}


export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timeout?: number;
}