export interface Partnership {
  id: string;
  partnerName: string;
  type: 'TVET Institute' | 'Microfinance Institution' | 'Private Employer' | 'Government Bureau' | 'NGO / CSO';
  region: string;
  contactPerson: string;
  email: string;
  phone: string;
  mouSignedDate: string;
  expiryDate: string;
  focusArea: string;
  activeProjectsCount: number;
  status: 'Active' | 'Under Review' | 'Renewal Due' | 'Terminated';
}

export interface LoanRecord {
  id: string;
  loanReference: string;
  beneficiaryName: string;
  beneficiaryType: 'Individual Youth' | 'Enterprise / Cooperative';
  sex: 'Female' | 'Male';
  fayidaId: string;
  mfiPartner: string; // e.g. 'Oromia Credit & Saving (OCSSCO)', 'Amhara Credit (ACSI)', 'Dedebit Credit'
  region: string;
  woreda: string;
  amountRequestedEtb: number;
  amountDisbursedEtb: number;
  interestRatePercent: number;
  disbursementDate: string;
  dueDate: string;
  amountRepaidEtb: number;
  repaymentStatus: 'Current' | 'Fully Paid' | 'Grace Period' | 'Overdue (30-60d)' | 'Defaulted';
  purpose: string;
}

export interface SavingsGroup {
  id: string;
  groupName: string;
  code: string;
  region: string;
  woreda: string;
  totalMembers: number;
  femaleMembers: number;
  youthMembers: number;
  establishedDate: string;
  totalSavingsMobilizedEtb: number;
  loansIssuedInternalEtb: number;
  bankLinkageEstablished: boolean;
  linkedBankOrMfi?: string;
  status: 'Active' | 'Graduating to SACCO' | 'Dormant';
}

export interface BudgetOverview {
  totalBudgetEtb: number;
  totalDisbursedEtb: number;
  totalCommittedEtb: number;
  remainingEtb: number;
  burnRatePercent: number;
  components: {
    name: string;
    allocatedEtb: number;
    spentEtb: number;
    variancePercent: number;
  }[];
}
