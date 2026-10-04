import React from "react";
import { useMeal } from "../../context/MealContext";
import { Users, TrendingUp, Briefcase, PiggyBank, GraduationCap, Shield, AlertCircle } from "lucide-react";

export const WomenEmpowermentView: React.FC = () => {
  const { participants, employmentOutcomes, loans, savingsGroups, trainingCohorts, safeguarding } = useMeal();

  const totalFemale = participants.filter(p => p.sex === "Female").length;
  const totalParticipants = participants.length;
  const femaleEmployed = employmentOutcomes.filter(e => e.sex === "Female" && e.verified).length;
  const femaleLoans = loans.filter(l => l.sex === "Female").length;
  const totalFemaleInVSLA = savingsGroups.reduce((s, g) => s + (g.femaleMembers || 0), 0);
  const femaleEnrolled = trainingCohorts.reduce((s, c) => s + (c.enrolledFemale || 0), 0);
  const femaleGraduated = trainingCohorts.reduce((s, c) => s + (c.graduatedFemale || 0), 0);
  const totalEnrolled = trainingCohorts.reduce((s, c) => s + (c.enrolledTotal || 0), 0);
  const safeguardingGBV = safeguarding.filter(s => s.category?.toLowerCase().includes("gbv") || s.category?.toLowerCase().includes("gender")).length;

  const kpis = [
    { label: "Female Participants", value: totalFemale, total: totalParticipants, icon: Users, color: "brand", pct: totalParticipants ? Math.round((totalFemale / totalParticipants) * 100) : 0, note: "% of total programme enrolment" },
    { label: "Women in Dignified Work", value: femaleEmployed, total: employmentOutcomes.length, icon: Briefcase, color: "emerald", pct: employmentOutcomes.length ? Math.round((femaleEmployed / employmentOutcomes.length) * 100) : 0, note: "% of verified employment" },
    { label: "Female TVET Enrolment", value: femaleEnrolled, total: totalEnrolled, icon: GraduationCap, color: "violet", pct: totalEnrolled ? Math.round((femaleEnrolled / totalEnrolled) * 100) : 0, note: "% of total TVET seats" },
    { label: "Women Loan Beneficiaries", value: femaleLoans, total: loans.length, icon: TrendingUp, color: "amber", pct: loans.length ? Math.round((femaleLoans / loans.length) * 100) : 0, note: "% of total loan disbursements" },
    { label: "Women in VSLA Circles", value: totalFemaleInVSLA, total: savingsGroups.reduce((s, g) => s + (g.totalMembers || 0), 0), icon: PiggyBank, color: "sky", pct: savingsGroups.reduce((s, g) => s + (g.totalMembers || 0), 0) ? Math.round((totalFemaleInVSLA / savingsGroups.reduce((s, g) => s + (g.totalMembers || 0), 0)) * 100) : 0, note: "% of total VSLA membership" },
    { label: "GBV / Gender Cases Filed", value: safeguardingGBV, total: safeguarding.length, icon: Shield, color: "red", pct: safeguarding.length ? Math.round((safeguardingGBV / safeguarding.length) * 100) : 0, note: "% of all safeguarding incidents" },
  ];

  const femaleParticipantsByRegion = participants
    .filter(p => p.sex === "Female")
    .reduce((acc: Record<string, number>, p) => { acc[p.region] = (acc[p.region] || 0) + 1; return acc; }, {});

  const regionEntries = Object.entries(femaleParticipantsByRegion).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-2xl bg-gradient-to-r from-brand-700 to-violet-700 p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 opacity-80" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Rural Young Women Empowerment Tracker</h1>
            <p className="text-sm opacity-80 mt-0.5">Gender-disaggregated KPIs across employment, training, finance & safeguarding • Cross-Cutting Gender & Social Inclusion Pillar</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const colorMap: Record<string, string> = {
            brand: "bg-brand-50 text-brand-700 ring-brand-200",
            emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
            violet: "bg-violet-50 text-violet-700 ring-violet-200",
            amber: "bg-amber-50 text-amber-700 ring-amber-200",
            sky: "bg-sky-50 text-sky-700 ring-sky-200",
            red: "bg-red-50 text-red-700 ring-red-200",
          };
          const barColor: Record<string, string> = {
            brand: "bg-brand-600", emerald: "bg-emerald-500", violet: "bg-violet-500",
            amber: "bg-amber-500", sky: "bg-sky-500", red: "bg-red-500",
          };
          return (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`rounded-xl p-2.5 ring-1 ${colorMap[kpi.color]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-slate-900">{kpi.value.toLocaleString()}</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{kpi.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{kpi.note}</p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Programme share</span>
                  <span className="font-bold text-slate-700">{kpi.pct}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${barColor[kpi.color]} transition-all duration-700`} style={{ width: `${Math.min(kpi.pct, 100)}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Female Participants by Region</h2>
          <div className="space-y-2.5">
            {regionEntries.map(([region, count]) => {
              const pct = Math.round((count / totalFemale) * 100);
              return (
                <div key={region}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">{region}</span>
                    <span className="font-bold text-slate-900">{count} women ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4">TVET Training Gender Balance</h2>
          <div className="space-y-3">
            {trainingCohorts.map(c => {
              const femalePct = c.enrolledTotal ? Math.round(((c.enrolledFemale || 0) / c.enrolledTotal) * 100) : 0;
              return (
                <div key={c.id} className="rounded-xl bg-slate-50 p-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-800 truncate max-w-[60%]">{c.title}</span>
                    <span className="text-brand-700 font-bold">{femalePct}% female</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                    <div className="h-full bg-brand-600 rounded-l-full" style={{ width: `${femalePct}%` }} />
                    <div className="h-full bg-slate-300 flex-1 rounded-r-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>{c.enrolledFemale || 0} female enrolled</span>
                    <span>{c.enrolledTotal} total</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-900">Gender Parity Target: = 60% Female Participation</p>
          <p className="text-xs text-amber-700 mt-0.5">Programme Commitment • Aligned with Gender Equality & Social Inclusion (GESI) Standards and ILO Decent Work Agenda</p>
        </div>
      </div>
    </div>
  );
};
