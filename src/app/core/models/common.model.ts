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