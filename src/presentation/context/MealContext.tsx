import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultRepository as mealRepository } from '../../infrastructure/repositories/HttpApiRepository';
import { Participant, EmploymentOutcome } from '../../core/domain/entities/Participant';
import { Enterprise, TrainingCohort } from '../../core/domain/entities/Enterprise';
import { Partnership, LoanRecord, SavingsGroup, BudgetOverview } from '../../core/domain/entities/Finance';
import { SafeguardingIncident, FeedbackTicket, ActionItem } from '../../core/domain/entities/Accountability';
import { LessonLearned, KnowledgeDocument, LearningAgendaQuestion, ReflectionMeeting } from '../../core/domain/entities/Learning';
import { Indicator, SurveyRound, OfflineSurveyItem } from '../../core/domain/entities/Evidence';
import { AuditLogEntry, GovernanceItem } from '../../core/domain/entities/System';
import { useAuth } from './AuthContext';

interface MealContextType {
  loading: boolean;
  participants: Participant[];
  employmentOutcomes: EmploymentOutcome[];
  enterprises: Enterprise[];
  trainingCohorts: TrainingCohort[];
  partnerships: Partnership[];
  loans: LoanRecord[];
  savingsGroups: SavingsGroup[];
  budget: BudgetOverview | null;
  budgetLines: any[];
  safeguarding: SafeguardingIncident[];
  feedback: FeedbackTicket[];
  actions: ActionItem[];
  lessons: LessonLearned[];
  docs: KnowledgeDocument[];
  agenda: LearningAgendaQuestion[];
  meetings: ReflectionMeeting[];
  indicators: Indicator[];
  surveyRounds: SurveyRound[];
  offlineQueue: OfflineSurveyItem[];
  auditLogs: AuditLogEntry[];
  governance: GovernanceItem[];
  sbccActivities: any[];
  materialSupport: any[];

  // Mutators
  addParticipant: (p: Omit<Participant, 'id'>) => Promise<Participant>;
  deleteParticipant: (id: string) => Promise<boolean>;
  verifyEmployment: (id: string) => Promise<void>;
  addEnterprise: (e: Omit<Enterprise, 'id'>) => Promise<Enterprise>;
  addLoan: (l: Omit<LoanRecord, 'id'>) => Promise<LoanRecord>;
  addPartnership: (p: any) => Promise<any>;
  addSafeguardingIncident: (i: Omit<SafeguardingIncident, 'id'>) => Promise<SafeguardingIncident>;
  updateSafeguardingStatus: (id: string, status: SafeguardingIncident['status'], note?: string) => Promise<void>;
  addFeedbackTicket: (t: Omit<FeedbackTicket, 'id'>) => Promise<FeedbackTicket>;
  resolveFeedbackTicket: (id: string, resolution: string) => Promise<void>;
  updateActionItemStatus: (id: string, status: ActionItem['status']) => Promise<void>;
  addLesson: (l: Omit<LessonLearned, 'id'>) => Promise<LessonLearned>;
  addMeeting: (m: any) => Promise<any>;
  updateIndicatorActual: (id: string, actual: number) => Promise<void>;
  addOfflineSurvey: (item: Omit<OfflineSurveyItem, 'id' | 'deviceSyncStatus'>) => Promise<OfflineSurveyItem>;
  syncOfflineQueue: () => Promise<number>;
  addSBCCActivity: (a: any) => Promise<any>;
  addMaterialSupport: (m: any) => Promise<any>;
  addBudgetLine: (b: any) => Promise<any>;
  refreshAll: () => Promise<void>;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [employmentOutcomes, setEmploymentOutcomes] = useState<EmploymentOutcome[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [trainingCohorts, setTrainingCohorts] = useState<TrainingCohort[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loans, setLoans] = useState<LoanRecord[]>([]);
  const [savingsGroups, setSavingsGroups] = useState<SavingsGroup[]>([]);
  const [budget, setBudget] = useState<BudgetOverview | null>(null);
  const [budgetLines, setBudgetLines] = useState<any[]>([]);
  const [safeguarding, setSafeguarding] = useState<SafeguardingIncident[]>([]);
  const [feedback, setFeedback] = useState<FeedbackTicket[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [lessons, setLessons] = useState<LessonLearned[]>([]);
  const [docs, setDocs] = useState<KnowledgeDocument[]>([]);
  const [agenda, setAgenda] = useState<LearningAgendaQuestion[]>([]);
  const [meetings, setMeetings] = useState<ReflectionMeeting[]>([]);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [surveyRounds, setSurveyRounds] = useState<SurveyRound[]>([]);
  const [offlineQueue, setOfflineQueue] = useState<OfflineSurveyItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [governance, setGovernance] = useState<GovernanceItem[]>([]);
  const [sbccActivities, setSBCCActivities] = useState<any[]>([]);
  const [materialSupport, setMaterialSupport] = useState<any[]>([]);

  const refreshAll = useCallback(async () => {
    try {
      const [
        p, emp, ent, trn, part, lns, svg, bgt, sg, fb, act, lsn, dc, ag, mtg, ind, srv, off, aud, gov, bgtLines, sbcc, mats,
      ] = await Promise.all([
        mealRepository.getAll(),
        mealRepository.getEmploymentOutcomes(),
        mealRepository.getAllEnterprises(),
        mealRepository.getTrainingCohorts(),
        mealRepository.getPartnerships(),
        mealRepository.getLoans(),
        mealRepository.getSavingsGroups(),
        mealRepository.getBudgetOverview(),
        mealRepository.getSafeguardingIncidents(),
        mealRepository.getFeedbackTickets(),
        mealRepository.getActionItems(),
        mealRepository.getLessons(),
        mealRepository.getDocuments(),
        mealRepository.getAgenda(),
        mealRepository.getMeetings(),
        mealRepository.getIndicators(),
        mealRepository.getSurveyRounds(),
        mealRepository.getOfflineQueue(),
        mealRepository.getAuditLogs(),
        mealRepository.getGovernance(),
        (mealRepository as any).getBudgetLines?.() ?? Promise.resolve([]),
        (mealRepository as any).getSBCCActivities?.() ?? Promise.resolve([]),
        (mealRepository as any).getMaterialSupport?.() ?? Promise.resolve([]),
      ]);
      setParticipants(p); setEmploymentOutcomes(emp); setEnterprises(ent); setTrainingCohorts(trn);
      setPartnerships(part); setLoans(lns); setSavingsGroups(svg); setBudget(bgt);
      setSafeguarding(sg); setFeedback(fb); setActions(act); setLessons(lsn); setDocs(dc);
      setAgenda(ag); setMeetings(mtg); setIndicators(ind); setSurveyRounds(srv);
      setOfflineQueue(off); setAuditLogs(aud); setGovernance(gov);
      setBudgetLines(bgtLines || []); setSBCCActivities(sbcc || []); setMaterialSupport(mats || []);
    } catch (err) {
      console.error('Error fetching MEAL data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refreshAll(); }, [refreshAll]);

  const addParticipant = async (p: Omit<Participant, 'id'>) => {
    const created = await mealRepository.create(p);
    if (currentUser) await mealRepository.logAudit('CREATE', 'Participants', `Enrolled participant: ${created.fullName} (${created.fayidaId})`, currentUser);
    await refreshAll(); return created;
  };
  const deleteParticipant = async (id: string) => {
    const p = participants.find(x => x.id === id);
    const success = await mealRepository.delete(id);
    if (success && currentUser && p) await mealRepository.logAudit('DELETE', 'Participants', `Deleted participant: ${p.fullName}`, currentUser);
    await refreshAll(); return success;
  };
  const verifyEmployment = async (id: string) => {
    const verified = await mealRepository.verifyEmployment(id);
    if (currentUser) await mealRepository.logAudit('VERIFY', 'Participants', `Verified employment for: ${verified.participantName}`, currentUser);
    await refreshAll();
  };
  const addEnterprise = async (e: Omit<Enterprise, 'id'>) => {
    const created = await mealRepository.createEnterprise(e);
    if (currentUser) await mealRepository.logAudit('CREATE', 'Enterprises', `Registered MSME: ${created.name}`, currentUser);
    await refreshAll(); return created;
  };
  const addLoan = async (l: Omit<LoanRecord, 'id'>) => {
    const created = await mealRepository.createLoan(l);
    if (currentUser) await mealRepository.logAudit('CREATE', 'Finance', `Approved loan ${created.loanReference} for ${created.beneficiaryName}`, currentUser);
    await refreshAll(); return created;
  };
  const addPartnership = async (p: any) => {
    const created = await (mealRepository as any).createPartnership(p);
    if (currentUser) await mealRepository.logAudit('CREATE', 'Partnerships', `Added new partner: ${p.partnerName}`, currentUser);
    await refreshAll(); return created;
  };
  const addSafeguardingIncident = async (i: Omit<SafeguardingIncident, 'id'>) => {
    const created = await mealRepository.createSafeguardingIncident(i);
    if (currentUser) await mealRepository.logAudit('CREATE', 'Safeguarding', `Filed incident ${created.incidentCode}`, currentUser);
    await refreshAll(); return created;
  };
  const updateSafeguardingStatus = async (id: string, status: SafeguardingIncident['status'], note?: string) => {
    const updated = await mealRepository.updateSafeguardingStatus(id, status, note);
    if (currentUser) await mealRepository.logAudit('UPDATE', 'Safeguarding', `Updated case ${updated.incidentCode} to ${status}`, currentUser);
    await refreshAll();
  };
  const addFeedbackTicket = async (t: Omit<FeedbackTicket, 'id'>) => {
    const created = await mealRepository.createFeedbackTicket(t); await refreshAll(); return created;
  };
  const resolveFeedbackTicket = async (id: string, resolution: string) => {
    await mealRepository.resolveFeedbackTicket(id, resolution); await refreshAll();
  };
  const updateActionItemStatus = async (id: string, status: ActionItem['status']) => {
    await (mealRepository as any).updateActionItemStatus(id, status); await refreshAll();
  };
  const addLesson = async (l: Omit<LessonLearned, 'id'>) => {
    const created = await mealRepository.createLesson(l); await refreshAll(); return created;
  };
  const addMeeting = async (m: any) => {
    const created = await (mealRepository as any).addReflectionMeeting(m); await refreshAll(); return created;
  };
  const updateIndicatorActual = async (id: string, actual: number) => {
    await mealRepository.updateIndicatorActual(id, actual);
    if (currentUser) await mealRepository.logAudit('UPDATE', 'Indicators', `Updated indicator to ${actual}`, currentUser);
    await refreshAll();
  };
  const addOfflineSurvey = async (item: Omit<OfflineSurveyItem, 'id' | 'deviceSyncStatus'>) => {
    const created = await mealRepository.addOfflineSurvey(item); await refreshAll(); return created;
  };
  const syncOfflineQueue = async () => {
    const res = await mealRepository.syncOfflineQueue();
    if (currentUser && res.syncedCount > 0) await mealRepository.logAudit('SYNC', 'Surveys', `Synced ${res.syncedCount} field submissions`, currentUser);
    await refreshAll(); return res.syncedCount;
  };
  const addSBCCActivity = async (a: any) => {
    const created = await (mealRepository as any).addSBCCActivity(a);
    if (currentUser) await mealRepository.logAudit('CREATE', 'SBCC', `Logged SBCC activity: ${a.title}`, currentUser);
    await refreshAll(); return created;
  };
  const addMaterialSupport = async (m: any) => {
    const created = await (mealRepository as any).addMaterialSupport(m);
    if (currentUser) await mealRepository.logAudit('CREATE', 'Material Support', `Recorded support for: ${m.recipientName}`, currentUser);
    await refreshAll(); return created;
  };
  const addBudgetLine = async (b: any) => {
    const created = await (mealRepository as any).createBudgetLine(b); await refreshAll(); return created;
  };

  return (
    <MealContext.Provider value={{
      loading, participants, employmentOutcomes, enterprises, trainingCohorts, partnerships,
      loans, savingsGroups, budget, budgetLines, safeguarding, feedback, actions, lessons, docs,
      agenda, meetings, indicators, surveyRounds, offlineQueue, auditLogs, governance,
      sbccActivities, materialSupport,
      addParticipant, deleteParticipant, verifyEmployment, addEnterprise, addLoan, addPartnership,
      addSafeguardingIncident, updateSafeguardingStatus, addFeedbackTicket, resolveFeedbackTicket,
      updateActionItemStatus, addLesson, addMeeting, updateIndicatorActual, addOfflineSurvey,
      syncOfflineQueue, addSBCCActivity, addMaterialSupport, addBudgetLine, refreshAll,
    }}>
      {children}
    </MealContext.Provider>
  );
};

export const useMeal = (): MealContextType => {
  const context = useContext(MealContext);
  if (!context) throw new Error('useMeal must be used within a MealProvider');
  return context;
};
