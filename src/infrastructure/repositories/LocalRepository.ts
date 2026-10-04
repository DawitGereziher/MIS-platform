import {
  IParticipantRepository,
  IEnterpriseRepository,
  IFinanceRepository,
  IAccountabilityRepository,
  ILearningRepository,
  IEvidenceRepository,
  ISystemRepository,
} from '../../core/ports/IRepositories';
import { Participant, EmploymentOutcome } from '../../core/domain/entities/Participant';
import { Enterprise, TrainingCohort } from '../../core/domain/entities/Enterprise';
import { Partnership, LoanRecord, SavingsGroup, BudgetOverview } from '../../core/domain/entities/Finance';
import { SafeguardingIncident, FeedbackTicket, ActionItem } from '../../core/domain/entities/Accountability';
import { LessonLearned, KnowledgeDocument, LearningAgendaQuestion, ReflectionMeeting } from '../../core/domain/entities/Learning';
import { Indicator, SurveyRound, OfflineSurveyItem } from '../../core/domain/entities/Evidence';
import { AuditLogEntry, GovernanceItem } from '../../core/domain/entities/System';
import { User, UserRole, DEMO_USERS } from '../../core/domain/entities/User';

import {
  INITIAL_PARTICIPANTS,
  INITIAL_EMPLOYMENT_OUTCOMES,
  INITIAL_ENTERPRISES,
  INITIAL_TRAINING_COHORTS,
  INITIAL_PARTNERSHIPS,
  INITIAL_LOANS,
  INITIAL_SAVINGS_GROUPS,
  INITIAL_BUDGET,
  INITIAL_SAFEGUARDING_INCIDENTS,
  INITIAL_FEEDBACK_TICKETS,
  INITIAL_ACTION_ITEMS,
  INITIAL_LESSONS_LEARNED,
  INITIAL_KNOWLEDGE_DOCS,
  INITIAL_LEARNING_AGENDA,
  INITIAL_REFLECTION_MEETINGS,
  INITIAL_INDICATORS,
  INITIAL_SURVEY_ROUNDS,
  INITIAL_OFFLINE_SURVEYS,
  INITIAL_AUDIT_LOGS,
  INITIAL_GOVERNANCE,
} from '../seed/initialData';

// Helper to persist & load from localStorage
function getOrInit<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`nexus_meal_${key}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn(`Could not read localStorage for ${key}`, e);
  }
  return defaultValue;
}

function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`nexus_meal_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn(`Could not write to localStorage for ${key}`, e);
  }
}

class LocalMealRepository implements
  IParticipantRepository,
  IEnterpriseRepository,
  IFinanceRepository,
  IAccountabilityRepository,
  ILearningRepository,
  IEvidenceRepository,
  ISystemRepository {

  private participants = getOrInit<Participant[]>('participants', INITIAL_PARTICIPANTS);
  private employmentOutcomes = getOrInit<EmploymentOutcome[]>('employment', INITIAL_EMPLOYMENT_OUTCOMES);
  private enterprises = getOrInit<Enterprise[]>('enterprises', INITIAL_ENTERPRISES);
  private trainingCohorts = getOrInit<TrainingCohort[]>('training', INITIAL_TRAINING_COHORTS);
  private partnerships = getOrInit<Partnership[]>('partnerships', INITIAL_PARTNERSHIPS);
  private loans = getOrInit<LoanRecord[]>('loans', INITIAL_LOANS);
  private savingsGroups = getOrInit<SavingsGroup[]>('savings', INITIAL_SAVINGS_GROUPS);
  private budget = getOrInit<BudgetOverview>('budget', INITIAL_BUDGET);
  private safeguarding = getOrInit<SafeguardingIncident[]>('safeguarding', INITIAL_SAFEGUARDING_INCIDENTS);
  private feedback = getOrInit<FeedbackTicket[]>('feedback', INITIAL_FEEDBACK_TICKETS);
  private actions = getOrInit<ActionItem[]>('actions', INITIAL_ACTION_ITEMS);
  private lessons = getOrInit<LessonLearned[]>('lessons', INITIAL_LESSONS_LEARNED);
  private docs = getOrInit<KnowledgeDocument[]>('docs', INITIAL_KNOWLEDGE_DOCS);
  private agenda = getOrInit<LearningAgendaQuestion[]>('agenda', INITIAL_LEARNING_AGENDA);
  private meetings = getOrInit<ReflectionMeeting[]>('meetings', INITIAL_REFLECTION_MEETINGS);
  private indicators = getOrInit<Indicator[]>('indicators', INITIAL_INDICATORS);
  private surveyRounds = getOrInit<SurveyRound[]>('surveys', INITIAL_SURVEY_ROUNDS);
  private offlineQueue = getOrInit<OfflineSurveyItem[]>('offlineQueue', INITIAL_OFFLINE_SURVEYS);
  private auditLogs = getOrInit<AuditLogEntry[]>('auditLogs', INITIAL_AUDIT_LOGS);
  private governance = getOrInit<GovernanceItem[]>('governance', INITIAL_GOVERNANCE);

  // Participants
  async getAll(): Promise<Participant[]> {
    return [...this.participants];
  }
  async getById(id: string): Promise<Participant | null> {
    return this.participants.find(p => p.id === id) || null;
  }
  async create(data: Omit<Participant, 'id'>): Promise<Participant> {
    const newParticipant: Participant = {
      ...data,
      id: `p-${Date.now()}`,
    };
    this.participants.unshift(newParticipant);
    save('participants', this.participants);
    return newParticipant;
  }
  async update(id: string, updates: Partial<Participant>): Promise<Participant> {
    const idx = this.participants.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Participant not found');
    this.participants[idx] = { ...this.participants[idx], ...updates };
    save('participants', this.participants);
    return this.participants[idx];
  }
  async delete(id: string): Promise<boolean> {
    const prevLen = this.participants.length;
    this.participants = this.participants.filter(p => p.id !== id);
    save('participants', this.participants);
    return this.participants.length < prevLen;
  }
  async getEmploymentOutcomes(): Promise<EmploymentOutcome[]> {
    return [...this.employmentOutcomes];
  }
  async createEmploymentOutcome(outcome: Omit<EmploymentOutcome, 'id'>): Promise<EmploymentOutcome> {
    const newOutcome: EmploymentOutcome = {
      ...outcome,
      id: `emp-${Date.now()}`,
    };
    this.employmentOutcomes.unshift(newOutcome);
    save('employment', this.employmentOutcomes);
    return newOutcome;
  }
  async verifyEmployment(id: string): Promise<EmploymentOutcome> {
    const item = this.employmentOutcomes.find(e => e.id === id);
    if (!item) throw new Error('Employment record not found');
    item.verified = true;
    item.verificationDate = new Date().toISOString().split('T')[0];
    save('employment', this.employmentOutcomes);
    return item;
  }

  // Enterprises
  async getAllEnterprises(): Promise<Enterprise[]> {
    return [...this.enterprises];
  }
  async getEnterpriseById(id: string): Promise<Enterprise | null> {
    return this.enterprises.find(e => e.id === id) || null;
  }
  async createEnterprise(data: Omit<Enterprise, 'id'>): Promise<Enterprise> {
    const newEnt: Enterprise = { ...data, id: `ent-${Date.now()}` };
    this.enterprises.unshift(newEnt);
    save('enterprises', this.enterprises);
    return newEnt;
  }
  async updateEnterprise(id: string, updates: Partial<Enterprise>): Promise<Enterprise> {
    const idx = this.enterprises.findIndex(e => e.id === id);
    if (idx === -1) throw new Error('Enterprise not found');
    this.enterprises[idx] = { ...this.enterprises[idx], ...updates };
    save('enterprises', this.enterprises);
    return this.enterprises[idx];
  }
  async getTrainingCohorts(): Promise<TrainingCohort[]> {
    return [...this.trainingCohorts];
  }
  async createTrainingCohort(cohort: Omit<TrainingCohort, 'id'>): Promise<TrainingCohort> {
    const newCohort: TrainingCohort = { ...cohort, id: `tr-${Date.now()}` };
    this.trainingCohorts.unshift(newCohort);
    save('training', this.trainingCohorts);
    return newCohort;
  }

  // Finance
  async getBudgetOverview(): Promise<BudgetOverview> {
    return { ...this.budget };
  }
  async getLoans(): Promise<LoanRecord[]> {
    return [...this.loans];
  }
  async createLoan(loan: Omit<LoanRecord, 'id'>): Promise<LoanRecord> {
    const newLoan: LoanRecord = { ...loan, id: `ln-${Date.now()}` };
    this.loans.unshift(newLoan);
    save('loans', this.loans);
    return newLoan;
  }
  async getSavingsGroups(): Promise<SavingsGroup[]> {
    return [...this.savingsGroups];
  }
  async createSavingsGroup(group: Omit<SavingsGroup, 'id'>): Promise<SavingsGroup> {
    const newGroup: SavingsGroup = { ...group, id: `svg-${Date.now()}` };
    this.savingsGroups.unshift(newGroup);
    save('savings', this.savingsGroups);
    return newGroup;
  }
  async getPartnerships(): Promise<Partnership[]> {
    return [...this.partnerships];
  }
  async createPartnership(partner: Omit<Partnership, 'id'>): Promise<Partnership> {
    const newPartner: Partnership = { ...partner, id: `part-${Date.now()}` };
    this.partnerships.unshift(newPartner);
    save('partnerships', this.partnerships);
    return newPartner;
  }

  // Accountability
  async getSafeguardingIncidents(): Promise<SafeguardingIncident[]> {
    return [...this.safeguarding];
  }
  async createSafeguardingIncident(incident: Omit<SafeguardingIncident, 'id'>): Promise<SafeguardingIncident> {
    const newIncident: SafeguardingIncident = {
      ...incident,
      id: `sg-${Date.now()}`,
    };
    this.safeguarding.unshift(newIncident);
    save('safeguarding', this.safeguarding);
    return newIncident;
  }
  async updateSafeguardingStatus(id: string, status: SafeguardingIncident['status'], actionSummary?: string): Promise<SafeguardingIncident> {
    const item = this.safeguarding.find(s => s.id === id);
    if (!item) throw new Error('Incident not found');
    item.status = status;
    if (actionSummary) {
      item.actionsTaken.push(actionSummary);
    }
    save('safeguarding', this.safeguarding);
    return item;
  }
  async getFeedbackTickets(): Promise<FeedbackTicket[]> {
    return [...this.feedback];
  }
  async createFeedbackTicket(ticket: Omit<FeedbackTicket, 'id'>): Promise<FeedbackTicket> {
    const newTicket: FeedbackTicket = { ...ticket, id: `fb-${Date.now()}` };
    this.feedback.unshift(newTicket);
    save('feedback', this.feedback);
    return newTicket;
  }
  async resolveFeedbackTicket(id: string, resolution: string): Promise<FeedbackTicket> {
    const item = this.feedback.find(f => f.id === id);
    if (!item) throw new Error('Feedback not found');
    item.status = 'Resolved';
    item.resolutionSummary = resolution;
    save('feedback', this.feedback);
    return item;
  }
  async getActionItems(): Promise<ActionItem[]> {
    return [...this.actions];
  }
  async updateActionItemStatus(id: string, status: ActionItem['status']): Promise<ActionItem> {
    const item = this.actions.find(a => a.id === id);
    if (!item) throw new Error('Action item not found');
    item.status = status;
    if (status === 'Completed') {
      item.completedDate = new Date().toISOString().split('T')[0];
    }
    save('actions', this.actions);
    return item;
  }

  // Learning
  async getLessons(): Promise<LessonLearned[]> {
    return [...this.lessons];
  }
  async createLesson(lesson: Omit<LessonLearned, 'id'>): Promise<LessonLearned> {
    const newLesson: LessonLearned = { ...lesson, id: `lsn-${Date.now()}` };
    this.lessons.unshift(newLesson);
    save('lessons', this.lessons);
    return newLesson;
  }
  async getDocuments(): Promise<KnowledgeDocument[]> {
    return [...this.docs];
  }
  async getAgenda(): Promise<LearningAgendaQuestion[]> {
    return [...this.agenda];
  }
  async getMeetings(): Promise<ReflectionMeeting[]> {
    return [...this.meetings];
  }

  // Evidence
  async getIndicators(): Promise<Indicator[]> {
    return [...this.indicators];
  }
  async updateIndicatorActual(id: string, newActual: number): Promise<Indicator> {
    const item = this.indicators.find(i => i.id === id);
    if (!item) throw new Error('Indicator not found');
    item.actualAchieved = newActual;
    item.achievementRatePercent = Number(((newActual / item.targetYear1) * 100).toFixed(1));
    item.ragStatus = item.achievementRatePercent >= 90 ? 'Achieved' : item.achievementRatePercent >= 75 ? 'On Track' : item.achievementRatePercent >= 50 ? 'At Risk' : 'Delayed';
    item.lastUpdated = new Date().toISOString().split('T')[0];
    save('indicators', this.indicators);
    return item;
  }
  async getSurveyRounds(): Promise<SurveyRound[]> {
    return [...this.surveyRounds];
  }
  async getOfflineQueue(): Promise<OfflineSurveyItem[]> {
    return [...this.offlineQueue];
  }
  async addOfflineSurvey(item: Omit<OfflineSurveyItem, 'id' | 'deviceSyncStatus'>): Promise<OfflineSurveyItem> {
    const newItem: OfflineSurveyItem = {
      ...item,
      id: `off-${Date.now()}`,
      deviceSyncStatus: 'Pending Sync',
    };
    this.offlineQueue.unshift(newItem);
    save('offlineQueue', this.offlineQueue);
    return newItem;
  }
  async syncOfflineQueue(): Promise<{ syncedCount: number }> {
    let count = 0;
    this.offlineQueue.forEach(item => {
      if (item.deviceSyncStatus === 'Pending Sync') {
        item.deviceSyncStatus = 'Synced';
        count++;
      }
    });
    save('offlineQueue', this.offlineQueue);
    return { syncedCount: count };
  }

  // System
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    return [...this.auditLogs];
  }
  async logAudit(action: AuditLogEntry['action'], module: AuditLogEntry['module'], description: string, user: User): Promise<void> {
    const newLog: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      action,
      module,
      description,
      ipAddress: '197.156.104.' + Math.floor(Math.random() * 200 + 10),
    };
    this.auditLogs.unshift(newLog);
    save('auditLogs', this.auditLogs);
  }
  async getGovernance(): Promise<GovernanceItem[]> {
    return [...this.governance];
  }
  async getUsers(): Promise<User[]> {
    const custom: User[] = JSON.parse(localStorage.getItem('nexus_registered_users') || '[]');
    return [...Object.values(DEMO_USERS), ...custom];
  }
  async registerUser(data: { name: string; email: string; pass: string; role?: UserRole; organization?: string; region?: string }): Promise<User> {
    const role: UserRole = data.role || 'field_officer';
    const roleLabels: Record<UserRole, string> = {
      super_admin: 'Super Admin',
      programme_manager: 'Programme Manager',
      monitoring_officer: 'Monitoring Officer',
      partner_officer: 'Partner Officer',
      field_officer: 'Field Officer',
      finance_officer: 'Finance Officer',
      donor_viewer: 'Donor Viewer',
    };
    const newUser: User = {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      role,
      roleLabel: roleLabels[role] || 'Field Officer',
      organization: data.organization || 'Programme Partner',
      region: data.region || 'Addis Ababa',
    };
    const currentUsers: User[] = JSON.parse(localStorage.getItem('nexus_registered_users') || '[]');
    currentUsers.push(newUser);
    localStorage.setItem('nexus_registered_users', JSON.stringify(currentUsers));

    const credentials: Record<string, string> = JSON.parse(localStorage.getItem('nexus_registered_credentials') || '{}');
    credentials[data.email.trim().toLowerCase()] = data.pass;
    localStorage.setItem('nexus_registered_credentials', JSON.stringify(credentials));

    return newUser;
  }

  async login(email: string, pass: string): Promise<{ user: User; accessToken: string } | null> {
    const cleanEmail = email.trim().toLowerCase();
    const allUsers = await this.getUsers();
    const userMatch = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!userMatch) return null;

    const credentials: Record<string, string> = JSON.parse(localStorage.getItem('nexus_registered_credentials') || '{}');
    const storedPassword = credentials[cleanEmail] || 'MealDemo@2026';
    if (pass !== storedPassword) {
      return null;
    }

    return {
      user: userMatch,
      accessToken: `local-jwt-${userMatch.role}-${Date.now()}`,
    };
  }

  // New tracker methods (local fallback for new modules)
  async getBudgetLines(): Promise<any[]> { return []; }
  async createBudgetLine(b: any): Promise<any> { return { id: 'bgt-' + Date.now(), ...b }; }
  async getGovernanceBodies(): Promise<any[]> { return [...this.governance]; }
  async getSBCCActivities(): Promise<any[]> { return (this as any)._sbcc || []; }
  async addSBCCActivity(a: any): Promise<any> { if (!(this as any)._sbcc) (this as any)._sbcc = []; const n = { id: 'sbcc-' + Date.now(), ...a }; (this as any)._sbcc.unshift(n); return n; }
  async getMaterialSupport(): Promise<any[]> { return (this as any)._materials || []; }
  async addMaterialSupport(m: any): Promise<any> { if (!(this as any)._materials) (this as any)._materials = []; const n = { id: 'ms-' + Date.now(), ...m }; (this as any)._materials.unshift(n); return n; }
  async addReflectionMeeting(m: any): Promise<any> { const n = { id: 'rm-' + Date.now(), ...m }; this.meetings.unshift(n as any); save('meetings', this.meetings); return n; }
}

// Singleton repository instance for the application
export const mealRepository = new LocalMealRepository();