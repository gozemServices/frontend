// education.model.ts
export interface Education {
  startDate: Date;
  endDate: Date;
  town: string;
  diplomaName: string;
  school: string;
  description: string;
}
  
export interface Experience {
  startDate: string;
  endDate: string;
  town: string;
  jobTitle: string;
  companyName: string;
  description?: string;
}

export interface Social {
  platformName: string;
  url: string;
  description?: string;
}