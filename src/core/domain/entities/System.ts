export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userEmail: string;
  userName: string;
  userRole: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VERIFY' | 'LOGIN' | 'EXPORT' | 'SYNC';
  module: 'Participants' | 'Enterprises' | 'Safeguarding' | 'Finance' | 'Surveys' | 'Indicators' | 'Auth' | 'Partnerships' | 'SBCC' | 'Material Support' | 'Learning';
  description: string;
  ipAddress: string;
}

export interface GovernanceItem {
  id: string;
  title: string;
  body: 'Steering Committee' | 'Technical Advisory Group' | 'Donor Joint Review' | 'Regional Coordination Bureau';
  lastMeetingDate: string;
  status: 'Compliant' | 'Pending Resolution' | 'Requires Escalation';
  activeResolutionsCount: number;
  chairPerson: string;
}
