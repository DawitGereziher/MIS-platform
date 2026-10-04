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
import { User, UserRole } from '../../core/domain/entities/User';
import { mealRepository as fallbackRepository } from './LocalRepository';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api';

export class HttpApiRepository implements
  IParticipantRepository,
  IEnterpriseRepository,
  IFinanceRepository,
  IAccountabilityRepository,
  ILearningRepository,
  IEvidenceRepository,
  ISystemRepository {

  private isBackendAvailable = true;

  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for snappy fallback
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      this.isBackendAvailable = true;
      return await response.json();
    } catch (e) {
      this.isBackendAvailable = false;
      return null;
    }
  }

  getApiStatus(): { connected: boolean; url: string } {
    return { connected: this.isBackendAvailable, url: API_BASE_URL };
  }

  // Participants
  async getAll(): Promise<Participant[]> {
    const data = await this.fetchApi<Participant[]>('/participants');
    return data || fallbackRepository.getAll();
  }
  async getById(id: string): Promise<Participant | null> {
    const data = await this.fetchApi<Participant>(`/participants/${id}`);
    return data || fallbackRepository.getById(id);
  }
  async create(participant: Omit<Participant, 'id'>): Promise<Participant> {
    const data = await this.fetchApi<Participant>('/participants', {
      method: 'POST',
      body: JSON.stringify(participant),
    });
    return data || fallbackRepository.create(participant);
  }
  async update(id: string, updates: Partial<Participant>): Promise<Participant> {
    return fallbackRepository.update(id, updates);
  }
  async delete(id: string): Promise<boolean> {
    const res = await this.fetchApi<{ success: boolean }>(`/participants/${id}`, { method: 'DELETE' });
    if (res) return res.success;
    return fallbackRepository.delete(id);
  }
  async getEmploymentOutcomes(): Promise<EmploymentOutcome[]> {
    const data = await this.fetchApi<EmploymentOutcome[]>('/participants/employment');
    return data || fallbackRepository.getEmploymentOutcomes();
  }
  async createEmploymentOutcome(outcome: Omit<EmploymentOutcome, 'id'>): Promise<EmploymentOutcome> {
    return fallbackRepository.createEmploymentOutcome(outcome);
  }
  async verifyEmployment(id: string): Promise<EmploymentOutcome> {
    const data = await this.fetchApi<EmploymentOutcome>(`/participants/employment/${id}/verify`, { method: 'POST' });
    return data || fallbackRepository.verifyEmployment(id);
  }

  // Enterprises & Training
  async getAllEnterprises(): Promise<Enterprise[]> {
    const data = await this.fetchApi<Enterprise[]>('/enterprises');
    return data || fallbackRepository.getAllEnterprises();
  }
  async getEnterpriseById(id: string): Promise<Enterprise | null> {
    return fallbackRepository.getEnterpriseById(id);
  }
  async createEnterprise(enterprise: Omit<Enterprise, 'id'>): Promise<Enterprise> {
    const data = await this.fetchApi<Enterprise>('/enterprises', {
      method: 'POST',
      body: JSON.stringify(enterprise),
    });
    return data || fallbackRepository.createEnterprise(enterprise);
  }
  async updateEnterprise(id: string, updates: Partial<Enterprise>): Promise<Enterprise> {
    return fallbackRepository.updateEnterprise(id, updates);
  }
  async getTrainingCohorts(): Promise<TrainingCohort[]> {
    const data = await this.fetchApi<TrainingCohort[]>('/enterprises/training/cohorts');
    return data || fallbackRepository.getTrainingCohorts();
  }
  async createTrainingCohort(cohort: Omit<TrainingCohort, 'id'>): Promise<TrainingCohort> {
    return fallbackRepository.createTrainingCohort(cohort);
  }

  // Finance
  async getBudgetOverview(): Promise<BudgetOverview> {
    const data = await this.fetchApi<BudgetOverview>('/finance/budget');
    return data || fallbackRepository.getBudgetOverview();
  }
  async getLoans(): Promise<LoanRecord[]> {
    const data = await this.fetchApi<LoanRecord[]>('/finance/loans');
    return data || fallbackRepository.getLoans();
  }
  async createLoan(loan: Omit<LoanRecord, 'id'>): Promise<LoanRecord> {
    const data = await this.fetchApi<LoanRecord>('/finance/loans', {
      method: 'POST',
      body: JSON.stringify(loan),
    });
    return data || fallbackRepository.createLoan(loan);
  }
  async getSavingsGroups(): Promise<SavingsGroup[]> {
    const data = await this.fetchApi<SavingsGroup[]>('/finance/savings');
    return data || fallbackRepository.getSavingsGroups();
  }
  async createSavingsGroup(group: Omit<SavingsGroup, 'id'>): Promise<SavingsGroup> {
    return fallbackRepository.createSavingsGroup(group);
  }
  async getPartnerships(): Promise<Partnership[]> {
    return fallbackRepository.getPartnerships();
  }
  async createPartnership(partner: Omit<Partnership, 'id'>): Promise<Partnership> {
    return fallbackRepository.createPartnership(partner);
  }

  // Accountability
  async getSafeguardingIncidents(): Promise<SafeguardingIncident[]> {
    const data = await this.fetchApi<SafeguardingIncident[]>('/accountability/safeguarding');
    return data || fallbackRepository.getSafeguardingIncidents();
  }
  async createSafeguardingIncident(incident: Omit<SafeguardingIncident, 'id'>): Promise<SafeguardingIncident> {
    const data = await this.fetchApi<SafeguardingIncident>('/accountability/safeguarding', {
      method: 'POST',
      body: JSON.stringify(incident),
    });
    return data || fallbackRepository.createSafeguardingIncident(incident);
  }
  async updateSafeguardingStatus(id: string, status: SafeguardingIncident['status'], actionSummary?: string): Promise<SafeguardingIncident> {
    const data = await this.fetchApi<SafeguardingIncident>(`/accountability/safeguarding/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note: actionSummary }),
    });
    return data || fallbackRepository.updateSafeguardingStatus(id, status, actionSummary);
  }
  async getFeedbackTickets(): Promise<FeedbackTicket[]> {
    const data = await this.fetchApi<FeedbackTicket[]>('/accountability/feedback');
    return data || fallbackRepository.getFeedbackTickets();
  }
  async createFeedbackTicket(ticket: Omit<FeedbackTicket, 'id'>): Promise<FeedbackTicket> {
    const data = await this.fetchApi<FeedbackTicket>('/accountability/feedback', {
      method: 'POST',
      body: JSON.stringify(ticket),
    });
    return data || fallbackRepository.createFeedbackTicket(ticket);
  }
  async resolveFeedbackTicket(id: string, resolution: string): Promise<FeedbackTicket> {
    const data = await this.fetchApi<FeedbackTicket>(`/accountability/feedback/${id}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ resolution }),
    });
    return data || fallbackRepository.resolveFeedbackTicket(id, resolution);
  }
  async getActionItems(): Promise<ActionItem[]> {
    return fallbackRepository.getActionItems();
  }
  async updateActionItemStatus(id: string, status: ActionItem['status']): Promise<ActionItem> {
    return fallbackRepository.updateActionItemStatus(id, status);
  }

  // Learning
  async getLessons(): Promise<LessonLearned[]> {
    return fallbackRepository.getLessons();
  }
  async createLesson(lesson: Omit<LessonLearned, 'id'>): Promise<LessonLearned> {
    return fallbackRepository.createLesson(lesson);
  }
  async getDocuments(): Promise<KnowledgeDocument[]> {
    return fallbackRepository.getDocuments();
  }
  async getAgenda(): Promise<LearningAgendaQuestion[]> {
    return fallbackRepository.getAgenda();
  }
  async getMeetings(): Promise<ReflectionMeeting[]> {
    return fallbackRepository.getMeetings();
  }

  // Evidence
  async getIndicators(): Promise<Indicator[]> {
    const data = await this.fetchApi<Indicator[]>('/evidence/indicators');
    return data || fallbackRepository.getIndicators();
  }
  async updateIndicatorActual(id: string, newActual: number): Promise<Indicator> {
    const data = await this.fetchApi<Indicator>(`/evidence/indicators/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ actual: newActual }),
    });
    return data || fallbackRepository.updateIndicatorActual(id, newActual);
  }
  async getSurveyRounds(): Promise<SurveyRound[]> {
    const data = await this.fetchApi<SurveyRound[]>('/evidence/surveys');
    return data || fallbackRepository.getSurveyRounds();
  }
  async getOfflineQueue(): Promise<OfflineSurveyItem[]> {
    return fallbackRepository.getOfflineQueue();
  }
  async addOfflineSurvey(item: Omit<OfflineSurveyItem, 'id' | 'deviceSyncStatus'>): Promise<OfflineSurveyItem> {
    return fallbackRepository.addOfflineSurvey(item);
  }
  async syncOfflineQueue(): Promise<{ syncedCount: number }> {
    const queue = await fallbackRepository.getOfflineQueue();
    const pending = queue.filter(q => q.deviceSyncStatus === 'Pending Sync');
    if (pending.length > 0) {
      await this.fetchApi('/evidence/sync', {
        method: 'POST',
        body: JSON.stringify({ items: pending }),
      });
    }
    return fallbackRepository.syncOfflineQueue();
  }

  // System
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    const data = await this.fetchApi<AuditLogEntry[]>('/system/audit');
    return data || fallbackRepository.getAuditLogs();
  }
  async logAudit(action: AuditLogEntry['action'], module: AuditLogEntry['module'], description: string, user: User): Promise<void> {
    return fallbackRepository.logAudit(action, module, description, user);
  }
  async getGovernance(): Promise<GovernanceItem[]> {
    return fallbackRepository.getGovernance();
  }
  async getUsers(): Promise<User[]> {
    const data = await this.fetchApi<User[]>('/auth/users');
    return data || fallbackRepository.getUsers();
  }
  async registerUser(data: { name: string; email: string; pass: string; role?: UserRole; organization?: string; region?: string }): Promise<User> {
    const res = await this.fetchApi<{ success: boolean; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res && res.user) {
      return res.user;
    }
    return fallbackRepository.registerUser(data);
  }

  async login(email: string, pass: string): Promise<{ user: User; accessToken: string } | null> {
    const res = await this.fetchApi<{ user: User; accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, pass }),
    });
    if (res && res.user) {
      return res;
    }
    return fallbackRepository.login(email, pass);
  }

  async getBudgetLines(): Promise<any[]> {
    const data = await this.fetchApi<any[]>('/budget/lines');
    return data || (fallbackRepository as any).getBudgetLines();
  }
  async createBudgetLine(b: any): Promise<any> {
    const data = await this.fetchApi<any>('/budget/lines', { method: 'POST', body: JSON.stringify(b) });
    return data || (fallbackRepository as any).createBudgetLine(b);
  }
  async getSBCCActivities(): Promise<any[]> {
    const data = await this.fetchApi<any[]>('/sbcc');
    return data || (fallbackRepository as any).getSBCCActivities();
  }
  async addSBCCActivity(a: any): Promise<any> {
    const data = await this.fetchApi<any>('/sbcc', { method: 'POST', body: JSON.stringify(a) });
    return data || (fallbackRepository as any).addSBCCActivity(a);
  }
  async getMaterialSupport(): Promise<any[]> {
    const data = await this.fetchApi<any[]>('/materials');
    return data || (fallbackRepository as any).getMaterialSupport();
  }
  async addMaterialSupport(m: any): Promise<any> {
    const data = await this.fetchApi<any>('/materials', { method: 'POST', body: JSON.stringify(m) });
    return data || (fallbackRepository as any).addMaterialSupport(m);
  }
  async addReflectionMeeting(m: any): Promise<any> {
    const data = await this.fetchApi<any>('/learning/meetings', { method: 'POST', body: JSON.stringify(m) });
    return data || (fallbackRepository as any).addReflectionMeeting(m);
  }
}

export const defaultRepository = new HttpApiRepository();
