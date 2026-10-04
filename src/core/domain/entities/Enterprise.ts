export type EnterpriseSector =
  | 'Agribusiness'
  | 'Textile & Garments'
  | 'Leather & Footwear'
  | 'Digital & ICT'
  | 'Construction'
  | 'Hospitality & Tourism'
  | 'Renewable Energy'
  | 'Trade & Services';

export type EnterpriseTier = 'Nano (1-2)' | 'Micro (3-5)' | 'Small (6-15)' | 'Medium (16+)';

export interface Enterprise {
  id: string;
  name: string;
  registrationNumber: string;
  ownerName: string;
  ownerSex: 'Female' | 'Male';
  ownerAge: number;
  fayidaId: string;
  phone: string;
  sector: EnterpriseSector;
  tier: EnterpriseTier;
  region: string;
  woreda: string;
  employeesCount: number;
  youthEmployeesCount: number;
  femaleEmployeesCount: number;
  monthlyRevenueEtb: number;
  loanReceivedEtb: number;
  supportReceived: string[]; // e.g. ['Seed Capital', 'Business Mentorship', 'BDS']
  status: 'Active' | 'Scaling' | 'Struggling' | 'Closed';
  establishedDate: string;
}

export interface TrainingCohort {
  id: string;
  code: string;
  title: string;
  provider: string; // e.g., 'Tegbare-Id TVET Institute'
  sector: EnterpriseSector;
  region: string;
  woreda: string;
  startDate: string;
  endDate: string;
  enrolledTotal: number;
  enrolledFemale: number;
  graduatedTotal: number;
  graduatedFemale: number;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Delayed';
  attendanceRatePercent: number;
  curriculumHours: number;
}
