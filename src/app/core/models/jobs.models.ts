// export interface JobOffer {
//     id: number;
//     title: string;
//     company: string;
//     location: string;
//     salary: number;
//     description: string;
//     postingDate: Date;
//     active: boolean;
//   }

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

  export interface Job {
    id: number; 
    title: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    description: string;
    createdAt: any;
  }
  
  

  export interface JobRequirement {
    education: string;
    experience: string;
    skills: string[]; // List of skills
  }
  
  export enum WorkLocation {
    FULL_REMOTE = 'FULL_REMOTE',
    REMOTE = 'REMOTE',
    ONSITE = 'ONSITE',
  }
  
  export enum EmploymentType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    FREELANCE = 'FREELANCE',
  }
  
  export enum JobOfferStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    CLOSED = 'CLOSED',
  }
  
  export interface JobOffer {
    id: number;
    title: string;
    description: string;
    salary: string;
    location: string;
    status: JobOfferStatus;
    workLocation: WorkLocation;
    company: string;
    employmentType?: EmploymentType;
    benefits?: string[];
    responsibilities?: string[];
    applicationDeadline?: string;
    contactEmail?: string;
    requirements?: JobRequirement;
    active: boolean
  }
  