export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentCategory =
  | 'Sexual Exploitation / Abuse (SEA)'
  | 'Child Safeguarding'
  | 'Workplace Harassment / Bullying'
  | 'Financial Fraud / Extortion'
  | 'Unsafe Working Conditions'
  | 'Discrimination / Exclusion';

export type SafeguardingStatus = 'Reported' | 'Triaged' | 'Investigation Active' | 'Action Plan Underway' | 'Resolved & Closed';

export interface SafeguardingIncident {
  id: string;
  incidentCode: string;
  title: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: SafeguardingStatus;
  reportedDate: string;
  region: string;
  woreda: string;
  isConfidential: boolean;
  assignedInvestigator: string;
  targetResolutionDate: string;
  summary: string;
  actionsTaken: string[];
}

export type FeedbackChannel = 'Toll-Free Hotline (8080)' | 'SMS Gateway' | 'Field Helpdesk / Box' | 'Community Meeting' | 'Web Portal';
export type FeedbackCategory = 'Service Quality' | 'Selection Transparency' | 'Staff Conduct' | 'Payment Delay' | 'General Inquiry';

export interface FeedbackTicket {
  id: string;
  ticketNumber: string;
  channel: FeedbackChannel;
  category: FeedbackCategory;
  senderName: string;
  isAnonymous: boolean;
  phoneOrContact?: string;
  region: string;
  dateReceived: string;
  message: string;
  status: 'New' | 'Under Review' | 'Response Dispatched' | 'Resolved';
  resolutionSummary?: string;
  slaBreach: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  source: 'MEAL Field Visit' | 'Internal Audit' | 'Donor Joint Review' | 'Quarterly Reflection';
  assignedTo: string;
  department: 'Operations' | 'Finance' | 'Field Delivery' | 'Safeguarding' | 'Partnerships';
  region: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Completed' | 'Deferred';
  completedDate?: string;
}
