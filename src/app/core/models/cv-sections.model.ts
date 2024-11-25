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

export interface Task {
  id: number;
  name: string;
}
  
export interface Experience {
  id: number,
  startDate: string;
  endDate: string;
  // town: string;
  position: string;
  company: string;
  description?: string;
  task: Task[];
}

export interface Social {
  id: number;
  name: string;
  url: string;
  iconSvg?: string;
}

export interface Reference{
  id: number;
  name: String;
  contactInfo: String;
  relation: String;
}

export interface Language{
  id: number;
  name: string;
  level: string;
}


export interface CVDetailRequest {
  userId: number;
  description:string;
  jobTitle:string;
  name:string;
  surname:string;
  birthdate:string;
  phone:string;
}