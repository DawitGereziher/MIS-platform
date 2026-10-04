export type Gender = 'Female' | 'Male';
export type ParticipantStatus = 'Enrolled' | 'In Training' | 'Employed' | 'Self-Employed' | 'Graduated' | 'Dropped';
export type EducationLevel = 'None' | 'Primary' | 'Secondary' | 'TVET Graduate' | 'University Degree';

export interface Participant {
  id: string;
  fullName: string;
  fayidaId: string;
  phone: string;
  sex: Gender;
  age: number;
  education: EducationLevel;
  region: string;
  woreda: string;
  kebele: string;
  disability: boolean;
  disabilityType?: string;
  status: ParticipantStatus;
  cohort: string;
  registrationDate: string;
  enterpriseId?: string;
  assignedFieldOfficer?: string;
}

export type EmploymentType = 'Wage Employment' | 'Self-Employment' | 'Micro-Enterprise';
export type ContractType = 'Permanent' | 'Contractual (6M+)' | 'Seasonal' | 'Informal';

export interface EmploymentOutcome {
  id: string;
  participantId: string;
  participantName: string;
  sex: Gender;
  region: string;
  type: EmploymentType;
  jobTitle: string;
  employerOrBusiness: string;
  sector: 'Agribusiness' | 'Textile & Garments' | 'Digital & ICT' | 'Construction' | 'Hospitality' | 'Retail/Services';
  monthlyIncomeEtb: number;
  contractType: ContractType;
  verified: boolean;
  verificationDate?: string;
  startDate: string;
}
