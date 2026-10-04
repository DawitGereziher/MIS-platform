import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { DashboardView } from "../overview/DashboardView";
import { ParticipantListView } from "../participants/ParticipantListView";
import { ParticipantFormModal } from "../participants/ParticipantFormModal";
import { EmploymentOutcomesView } from "../participants/EmploymentOutcomesView";
import { WomenEmpowermentView } from "../participants/WomenEmpowermentView";
import { EnterpriseListView } from "../enterprises/EnterpriseListView";
import { MaterialSupportView } from "../enterprises/MaterialSupportView";
import { TrainingCohortView } from "../training/TrainingCohortView";
import { PartnershipsView } from "../partnerships/PartnershipsView";
import { FinanceOverviewView } from "../finance/FinanceOverviewView";
import { LoanTrackingView } from "../finance/LoanTrackingView";
import { SavingsGroupsView } from "../finance/SavingsGroupsView";
import { GovernanceView } from "../insight/WorkplanView";
import { FeedbackCrmView } from "../accountability/FeedbackCrmView";
import { SafeguardingCaseView } from "../accountability/SafeguardingCaseView";
import { ActionTrackerView } from "../accountability/ActionTrackerView";
import { SBCCTrackerView } from "../accountability/SBCCTrackerView";
import { LessonsLearnedView } from "../learning/LessonsLearnedView";
import { KnowledgeLibraryView } from "../learning/KnowledgeLibraryView";
import { LearningAgendaView, ReflectionMeetingsView } from "../learning/LearningAgendaView";
import { SurveyRoundsView } from "../evidence/SurveyRoundsView";
import { GisMapView } from "../evidence/GisMapView";
import { CompareRoundsView } from "../evidence/CompareRoundsView";
import { OfflineQueueView } from "../evidence/OfflineQueueView";
import { IndicatorRegisterView } from "../insight/IndicatorRegisterView";
import { WorkplanView } from "../insight/WorkplanView";
import { ReportsView } from "../insight/ReportsView";
import { AdminUsersView } from "../insight/AdminUsersView";
import { AuditTrailView } from "../insight/AuditTrailView";
import { ComplianceView } from "../insight/ComplianceView";

export const AppShell: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeRoute) {
      case "dashboard":
        return <DashboardView onNavigate={setActiveRoute} onOpenParticipantModal={() => setIsParticipantModalOpen(true)} onOpenEnterpriseModal={() => setIsEnterpriseModalOpen(true)} />;
      case "participants":
        return <ParticipantListView onOpenNewModal={() => setIsParticipantModalOpen(true)} />;
      case "employment":
        return <EmploymentOutcomesView />;
      case "women":
        return <WomenEmpowermentView />;
      case "enterprises":
        return <EnterpriseListView isOpenNewModal={isEnterpriseModalOpen} onCloseNewModal={() => setIsEnterpriseModalOpen(false)} onOpenNewModal={() => setIsEnterpriseModalOpen(true)} />;
      case "materials":
        return <MaterialSupportView />;
      case "training":
        return <TrainingCohortView />;
      case "partnerships":
        return <PartnershipsView />;
      case "finance":
        return <FinanceOverviewView onNavigate={setActiveRoute} />;
      case "loans":
        return <LoanTrackingView />;
      case "savings":
        return <SavingsGroupsView />;
      case "governance":
        return <GovernanceView />;
      case "feedback":
        return <FeedbackCrmView />;
      case "safeguarding":
        return <SafeguardingCaseView />;
      case "actions":
        return <ActionTrackerView />;
      case "sbcc":
        return <SBCCTrackerView />;
      case "learning":
        return <LessonsLearnedView />;
      case "knowledge":
        return <KnowledgeLibraryView />;
      case "agenda":
        return <LearningAgendaView />;
      case "meetings":
        return <ReflectionMeetingsView />;
      case "surveys":
        return <SurveyRoundsView onNavigate={setActiveRoute} />;
      case "map":
        return <GisMapView />;
      case "compare":
        return <CompareRoundsView />;
      case "offline":
        return <OfflineQueueView />;
      case "monitoring":
      case "register":
        return <IndicatorRegisterView />;
      case "workplan":
        return <WorkplanView />;
      case "reports":
        return <ReportsView />;
      case "admin":
        return <AdminUsersView />;
      case "audit":
        return <AuditTrailView />;
      case "compliance":
        return <ComplianceView />;
      default:
        return <DashboardView onNavigate={setActiveRoute} onOpenParticipantModal={() => setIsParticipantModalOpen(true)} onOpenEnterpriseModal={() => setIsEnterpriseModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header activeRoute={activeRoute} onNavigate={setActiveRoute} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeRoute={activeRoute} onNavigate={setActiveRoute} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderActiveView()}</div>
        </main>
      </div>
      <ParticipantFormModal isOpen={isParticipantModalOpen} onClose={() => setIsParticipantModalOpen(false)} />
    </div>
  );
};
