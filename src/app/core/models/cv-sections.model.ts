// education.model.ts
// export interface Education {
//   id: number;
//   startDate: Date;
//   endDate: Date;
//   town: string;
//   diplomaName: string;
//   school: string;
//   description: string;
// }

export interface Education {
  id: number;
  institution: string;
  diplomaName: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

  
export interface Experience {
  id: number,
  startDate: string;
  endDate: string;
  // town: string;
  position: string;
  company: string;
  description?: string;
}

export interface Social {
  platformName: string;
  url: string;
  description?: string;
}