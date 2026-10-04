export interface LessonLearned {
  id: string;
  code: string;
  title: string;
  thematicArea: 'Youth Mobilization' | 'Private Sector Placement' | 'Gender Inclusion' | 'Digital Literacy' | 'MFI Linkage';
  context: string;
  challengeFaced: string;
  lessonExtracted: string;
  practicalRecommendation: string;
  submittedBy: string;
  region: string;
  dateDocumented: string;
  validationStatus: 'Peer Reviewed' | 'Approved for Scaling' | 'Draft';
  tags: string[];
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'Policy & Manual' | 'Case Study' | 'Evaluation Report' | 'Training Curriculum' | 'Factsheet';
  author: string;
  publishedDate: string;
  fileSizeMb: number;
  fileFormat: 'PDF' | 'DOCX' | 'XLSX' | 'PPTX';
  downloadCount: number;
  description: string;
}

export interface LearningAgendaQuestion {
  id: string;
  pillar: 'Enterprise Scalability' | 'Youth Retention' | 'Financial Health' | 'Safeguarding Culture';
  questionText: string;
  leadInvestigator: string;
  status: 'Formulation' | 'Data Gathering' | 'Analysis & Synthesis' | 'Disseminated';
  evidenceCollectedSummary: string;
  lastUpdated: string;
}

export interface ReflectionMeeting {
  id: string;
  title: string;
  type: 'Quarterly MEAL Review' | 'Regional Field Reflection' | 'Annual Programme Learning Forum';
  date: string;
  venue: string;
  participantsCount: number;
  keyInsights: string[];
  keyActionsAgreed: string[];
}
