import React from 'react';
import { useMeal } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Briefcase,
  Building2,
  GraduationCap,
  Handshake,
  DollarSign,
  Landmark,
  FileSpreadsheet,
  Activity,
  MessageSquareHeart,
  ListTodo,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  UserPlus,
  PlusCircle,
  FilePlus,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const DashboardView: React.FC<{
  onNavigate: (route: string) => void;
  onOpenParticipantModal: () => void;
  onOpenEnterpriseModal: () => void;
}> = ({ onNavigate, onOpenParticipantModal, onOpenEnterpriseModal }) => {
  const { currentUser, permissions } = useAuth();
  const {
    participants,
    employmentOutcomes,
    enterprises,
    trainingCohorts,
    partnerships,
    budget,
    loans,
    surveyRounds,
    indicators,
    feedback,
    actions,
    safeguarding,
  } = useMeal();

  // Demographic metrics
  const femaleCount = participants.filter(p => p.sex === 'Female').length;
  const youthCount = participants.filter(p => p.age >= 18 && p.age <= 29).length;
  const disabilityCount = participants.filter(p => p.disability).length;

  const totalLoansDisbursed = loans.reduce((acc, curr) => acc + curr.amountDisbursedEtb, 0);
  const indicatorsOnTrack = indicators.filter(i => i.ragStatus === 'On Track' || i.ragStatus === 'Achieved').length;
  const indicatorsAtRisk = indicators.filter(i => i.ragStatus === 'At Risk' || i.ragStatus === 'Delayed').length;
  const feedbackAwaiting = feedback.filter(f => f.status !== 'Resolved').length;
  const actionsOpen = actions.filter(a => a.status !== 'Completed').length;
  const safeguardingOpen = safeguarding.filter(s => s.status !== 'Resolved & Closed').length;

  // Regional distribution data
  const regionMap: Record<string, number> = {};
  participants.forEach(p => {
    regionMap[p.region] = (regionMap[p.region] || 0) + 1;
  });
  const regionalData = Object.keys(regionMap).map(reg => ({
    name: reg,
    participants: regionMap[reg],
  }));

  // Status breakdown data
  const statusCounts = {
    Employed: participants.filter(p => p.status === 'Employed').length,
    'Self-Employed': participants.filter(p => p.status === 'Self-Employed').length,
    'In Training': participants.filter(p => p.status === 'In Training').length,
    Enrolled: participants.filter(p => p.status === 'Enrolled').length,
  };

  const statusPieData = [
    { name: 'Wage Employed', value: statusCounts.Employed, color: '#0d9488' },
    { name: 'Self-Employed', value: statusCounts['Self-Employed'], color: '#0284c7' },
    { name: 'In Training', value: statusCounts['In Training'], color: '#f59e0b' },
    { name: 'Enrolled', value: statusCounts.Enrolled, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Top Banner with Greetings & Demographic Chips */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-950 via-brand-950 to-slate-900 p-6 text-white shadow-md border border-slate-800 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Welcome back, {currentUser?.name.split(' ')[0] || 'User'}
            </h1>
            <span className="rounded-full bg-brand-700/80 px-2.5 py-0.5 text-xs font-semibold text-blue-100 border border-brand-500/40">
              {currentUser?.roleLabel}
            </span>
          </div>
          <p className="mt-1 text-xs text-blue-200/80">
            NexusMEAL Enterprise MIS • Monitoring, Evaluation, Accountability & Learning Platform
          </p>
        </div>

        {/* Quick Demographic Inclusion Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur border border-white/10">
            <span className="text-xs text-blue-200">Female:</span>
            <span className="text-sm font-bold text-white">{femaleCount}</span>
            <span className="text-[10px] text-amber-300 font-semibold">
              ({((femaleCount / (participants.length || 1)) * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="flex items-center space-x-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur border border-white/10">
            <span className="text-xs text-blue-200">Youth (18-29):</span>
            <span className="text-sm font-bold text-white">{youthCount}</span>
          </div>
          <div className="flex items-center space-x-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur border border-white/10">
            <span className="text-xs text-blue-200">PWD / Disability:</span>
            <span className="text-sm font-bold text-amber-400">{disabilityCount}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2.5">
        {permissions.canRegisterParticipants && (
          <button
            onClick={onOpenParticipantModal}
            className="flex items-center space-x-2 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition"
          >
            <UserPlus className="h-4 w-4" />
            <span>Register Participant</span>
          </button>
        )}
        <button
          onClick={onOpenEnterpriseModal}
          className="flex items-center space-x-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          <PlusCircle className="h-4 w-4 text-brand-700" />
          <span>Register Enterprise</span>
        </button>
        <button
          onClick={() => onNavigate('surveys')}
          className="flex items-center space-x-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          <FilePlus className="h-4 w-4 text-brand-700" />
          <span>Record Survey Data</span>
        </button>
      </div>

      {/* 11 KPI Summary Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {/* Participants */}
        <div
          onClick={() => onNavigate('participants')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Participants</span>
            <Users className="h-4 w-4 text-brand-700 transition group-hover:scale-110" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{participants.length}</div>
          <p className="mt-1 text-[11px] text-slate-500">
            {statusCounts.Employed + statusCounts['Self-Employed']} employed ({femaleCount} female)
          </p>
        </div>

        {/* Enterprises */}
        <div
          onClick={() => onNavigate('enterprises')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Enterprises</span>
            <Building2 className="h-4 w-4 text-brand-700 transition group-hover:scale-110" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{enterprises.length}</div>
          <p className="mt-1 text-[11px] text-slate-500">Profiled MSMEs</p>
        </div>

        {/* Training */}
        <div
          onClick={() => onNavigate('training')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Training</span>
            <GraduationCap className="h-4 w-4 text-brand-700 transition group-hover:scale-110" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{trainingCohorts.length}</div>
          <p className="mt-1 text-[11px] text-slate-500">TVET cohorts delivered</p>
        </div>

        {/* Partnerships */}
        <div
          onClick={() => onNavigate('partnerships')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Partnerships</span>
            <Handshake className="h-4 w-4 text-brand-700 transition group-hover:scale-110" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{partnerships.length}</div>
          <p className="mt-1 text-[11px] text-slate-500">MoU collaborations</p>
        </div>

        {/* Budget */}
        {permissions.canViewFinance && (
          <div
            onClick={() => onNavigate('finance')}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Budget</span>
              <DollarSign className="h-4 w-4 text-emerald-600 transition group-hover:scale-110" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">5.3M</div>
            <p className="mt-1 text-[11px] text-slate-500">2.12M ETB disbursed</p>
          </div>
        )}

        {/* Loans */}
        {permissions.canViewFinance && (
          <div
            onClick={() => onNavigate('loans')}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Loans approved</span>
              <Landmark className="h-4 w-4 text-blue-600 transition group-hover:scale-110" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {(totalLoansDisbursed / 1000000).toFixed(1)}M
            </div>
            <p className="mt-1 text-[11px] text-slate-500">ETB to young clients</p>
          </div>
        )}

        {/* Survey Responses */}
        <div
          onClick={() => onNavigate('surveys')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Survey responses</span>
            <FileSpreadsheet className="h-4 w-4 text-purple-600 transition group-hover:scale-110" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {surveyRounds.reduce((acc, curr) => acc + curr.completedSample, 0)}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Across 3 survey rounds</p>
        </div>

        {/* Indicators */}
        <div
          onClick={() => onNavigate('register')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Indicators</span>
            <Activity className="h-4 w-4 text-teal-600 transition group-hover:scale-110" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{indicators.length}</div>
          <p className="mt-1 text-[11px] text-slate-500">
            {indicatorsOnTrack} on track, {indicatorsAtRisk} at risk
          </p>
        </div>

        {/* Feedback */}
        <div
          onClick={() => onNavigate('feedback')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Feedback</span>
            <MessageSquareHeart className="h-4 w-4 text-rose-500 transition group-hover:scale-110" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{feedback.length}</div>
          <p className="mt-1 text-[11px] text-slate-500">{feedbackAwaiting} awaiting response</p>
        </div>

        {/* Actions */}
        <div
          onClick={() => onNavigate('actions')}
          className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Action items</span>
            <ListTodo className="h-4 w-4 text-amber-500 transition group-hover:scale-110" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{actions.length}</div>
          <p className="mt-1 text-[11px] text-slate-500">{actionsOpen} pending items</p>
        </div>

        {/* Safeguarding */}
        {permissions.canViewSafeguarding && (
          <div
            onClick={() => onNavigate('safeguarding')}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Safeguarding</span>
              <ShieldAlert className="h-4 w-4 text-red-600 transition group-hover:scale-110" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{safeguarding.length}</div>
            <p className="mt-1 text-[11px] text-slate-500">{safeguardingOpen} open cases</p>
          </div>
        )}
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Regional Participant Distribution */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Regional Participant Coverage</h2>
              <p className="text-xs text-slate-500">Youth mobilized per Ethiopian region</p>
            </div>
            <button
              onClick={() => onNavigate('map')}
              className="flex items-center text-xs font-medium text-brand-700 hover:text-brand-800"
            >
              <span>View GIS Map</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="participants" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Participant Status Breakdown Pie Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Pathway & Employment Status</h2>
              <p className="text-xs text-slate-500">Active beneficiary outcome distribution</p>
            </div>
            <button
              onClick={() => onNavigate('employment')}
              className="flex items-center text-xs font-medium text-brand-700 hover:text-brand-800"
            >
              <span>Outcome Registry</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-0.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Indicator Logframe Performance Snapshot */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Key Logframe Indicators Progress</h2>
            <p className="text-xs text-slate-500">Programme MEAL real-time tracking against Year 1 targets</p>
          </div>
          <button
            onClick={() => onNavigate('register')}
            className="text-xs font-medium text-brand-700 hover:underline"
          >
            View all indicators
          </button>
        </div>

        <div className="space-y-3">
          {indicators.slice(0, 4).map(ind => (
            <div key={ind.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-white px-2 py-0.5 text-[11px] font-bold text-slate-700 border border-slate-200">
                    {ind.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 line-clamp-1">{ind.title}</span>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      ind.ragStatus === 'On Track' || ind.ragStatus === 'Achieved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ind.ragStatus === 'At Risk'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {ind.ragStatus}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{ind.achievementRatePercent}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    ind.ragStatus === 'On Track' || ind.ragStatus === 'Achieved'
                      ? 'bg-emerald-500'
                      : ind.ragStatus === 'At Risk'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(ind.achievementRatePercent, 100)}%` }}
                />
              </div>

              <div className="flex justify-between items-center mt-1 text-[11px] text-slate-500">
                <span>Baseline: {ind.baseline.toLocaleString()}</span>
                <span>
                  Actual: <strong className="text-slate-800">{ind.actualAchieved.toLocaleString()}</strong> / Target:{' '}
                  {ind.targetYear1.toLocaleString()} {ind.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
