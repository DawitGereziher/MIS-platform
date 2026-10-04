import { User, UserRole } from '../domain/entities/User';
import { Participant, EmploymentOutcome } from '../domain/entities/Participant';
import { Enterprise, TrainingCohort } from '../domain/entities/Enterprise';
import { Partnership, LoanRecord, SavingsGroup, BudgetOverview } from '../domain/entities/Finance';
import { SafeguardingIncident, FeedbackTicket, ActionItem } from '../domain/entities/Accountability';
import { LessonLearned, KnowledgeDocument, LearningAgendaQuestion, ReflectionMeeting } from '../domain/entities/Learning';
import { Indicator, SurveyRound, OfflineSurveyItem } from '../domain/entities/Evidence';
import { AuditLogEntry, GovernanceItem } from '../domain/entities/System';

export interface IParticipantRepository {
  getAll(): Promise<Participant[]>;
  getById(id: string): Promise<Participant | null>;
  create(participant: Omit<Participant, 'id'>): Promise<Participant>;
  update(id: string, updates: Partial<Participant>): Promise<Participant>;
  delete(id: string): Promise<boolean>;
  getEmploymentOutcomes(): Promise<EmploymentOutcome[]>;
  createEmploymentOutcome(outcome: Omit<EmploymentOutcome, 'id'>): Promise<EmploymentOutcome>;
  verifyEmployment(id: string): Promise<EmploymentOutcome>;
}

export interface IEnterpriseRepository {
  getAllEnterprises(): Promise<Enterprise[]>;
  getEnterpriseById(id: string): Promise<Enterprise | null>;
  createEnterprise(enterprise: Omit<Enterprise, 'id'>): Promise<Enterprise>;
  updateEnterprise(id: string, updates: Partial<Enterprise>): Promise<Enterprise>;
  getTrainingCohorts(): Promise<TrainingCohort[]>;
  createTrainingCohort(cohort: Omit<TrainingCohort, 'id'>): Promise<TrainingCohort>;
}

export interface IFinanceRepository {
  getBudgetOverview(): Promise<BudgetOverview>;
  getLoans(): Promise<LoanRecord[]>;
  createLoan(loan: Omit<LoanRecord, 'id'>): Promise<LoanRecord>;
  getSavingsGroups(): Promise<SavingsGroup[]>;
  createSavingsGroup(group: Omit<SavingsGroup, 'id'>): Promise<SavingsGroup>;
  getPartnerships(): Promise<Partnership[]>;
  createPartnership(partner: Omit<Partnership, 'id'>): Promise<Partnership>;
}

export interface IAccountabilityRepository {
  getSafeguardingIncidents(): Promise<SafeguardingIncident[]>;
  createSafeguardingIncident(incident: Omit<SafeguardingIncident, 'id'>): Promise<SafeguardingIncident>;
  updateSafeguardingStatus(id: string, status: SafeguardingIncident['status'], actionSummary?: string): Promise<SafeguardingIncident>;
  getFeedbackTickets(): Promise<FeedbackTicket[]>;
  createFeedbackTicket(ticket: Omit<FeedbackTicket, 'id'>): Promise<FeedbackTicket>;
  resolveFeedbackTicket(id: string, resolution: string): Promise<FeedbackTicket>;
  getActionItems(): Promise<ActionItem[]>;
  updateActionItemStatus(id: string, status: ActionItem['status']): Promise<ActionItem>;
}

export interface ILearningRepository {
  getLessons(): Promise<LessonLearned[]>;
  createLesson(lesson: Omit<LessonLearned, 'id'>): Promise<LessonLearned>;
  getDocuments(): Promise<KnowledgeDocument[]>;
  getAgenda(): Promise<LearningAgendaQuestion[]>;
  getMeetings(): Promise<ReflectionMeeting[]>;
}

export interface IEvidenceRepository {
  getIndicators(): Promise<Indicator[]>;
  updateIndicatorActual(id: string, newActual: number): Promise<Indicator>;
  getSurveyRounds(): Promise<SurveyRound[]>;
  getOfflineQueue(): Promise<OfflineSurveyItem[]>;
  addOfflineSurvey(item: Omit<OfflineSurveyItem, 'id' | 'deviceSyncStatus'>): Promise<OfflineSurveyItem>;
  syncOfflineQueue(): Promise<{ syncedCount: number }>;
}

export interface ISystemRepository {
  getAuditLogs(): Promise<AuditLogEntry[]>;
  logAudit(action: AuditLogEntry['action'], module: AuditLogEntry['module'], description: string, user: User): Promise<void>;
  getGovernance(): Promise<GovernanceItem[]>;
  getUsers(): Promise<User[]>;
  registerUser(data: { name: string; email: string; pass: string; role?: UserRole; organization?: string; region?: string }): Promise<User>;
  login(email: string, pass: string): Promise<{ user: User; accessToken: string } | null>;
}
