export type RagStatus = 'On Track' | 'At Risk' | 'Delayed' | 'Achieved';

export interface Indicator {
  id: string;
  code: string;
  title: string;
  pillar: 'Pillar 1: Youth Employment' | 'Pillar 2: Enterprise Ecosystem' | 'Pillar 3: Financial Inclusion' | 'Cross-Cutting: Safeguarding & Gender';
  level: 'Impact' | 'Outcome' | 'Output';
  baseline: number;
  targetYear1: number;
  targetLifeOfProgramme: number;
  actualAchieved: number;
  achievementRatePercent: number;
  unit: string;
  ragStatus: RagStatus;
  disaggregationSex: {
    female: number;
    male: number;
  };
  lastUpdated: string;
  frequency: 'Monthly' | 'Quarterly' | 'Bi-annually' | 'Annually';
  dataCollectorRole: string;
}

export type SurveyRoundType = 'Baseline Survey' | 'Midline Survey' | 'Endline Impact Assessment' | 'Rapid Market Assessment';

export interface SurveyRound {
  id: string;
  code: string;
  title: string;
  type: SurveyRoundType;
  targetSample: number;
  completedSample: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Closed' | 'Under Analysis';
  regionsIncluded: string[];
}

export interface OfflineSurveyItem {
  id: string;
  surveyRoundId: string;
  surveyTitle: string;
  respondentName: string;
  respondentPhone: string;
  region: string;
  woreda: string;
  collectedAt: string;
  enumeratorName: string;
  deviceSyncStatus: 'Pending Sync' | 'Syncing' | 'Synced' | 'Error';
  payloadSummary: string;
}
