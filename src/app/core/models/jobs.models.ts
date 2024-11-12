export interface JobOffer {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: number;
    description: string;
    postingDate: Date;
    active: boolean;
  }

  export interface Candidature {
    id: number;
    candidateName: string;
    email: string;
    phone: string;
    jobTitle: string;
    company: string;
    coverLetter: string;
    resume: string; // URL or file path
    status: 'pending' | 'interview' | 'hired' | 'rejected'; // Application status
    appliedDate: Date;
  }

  
  
  