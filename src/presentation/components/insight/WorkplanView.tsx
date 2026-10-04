import React from 'react';
import { CalendarCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useMeal } from '../../context/MealContext';

export const WorkplanView: React.FC = () => {
  const milestones = [
    {
      quarter: 'Q1 2026',
      milestone: 'Complete baseline survey data verification & cluster geofencing',
      lead: 'Dawit Bekele (MEAL)',
      dueDate: '2026-03-31',
      status: 'On Track',
      completion: 85,
    },
    {
      quarter: 'Q1 2026',
      milestone: 'Onboard 1,200 youth into accredited TVET technical cohorts',
      lead: 'Almaz Tadesse (PMU)',
      dueDate: '2026-03-15',
      status: 'On Track',
      completion: 92,
    },
    {
      quarter: 'Q2 2026',
      milestone: 'Launch Siinqee Bank & ACSI direct telebirr loan guarantee bridge',
      lead: 'Bethlehem Alemu (Finance)',
      dueDate: '2026-04-30',
      status: 'Under Review',
      completion: 45,
    },
    {
      quarter: 'Q2 2026',
      milestone: 'Roll out offline field collection PWA to all 48 woreda enumerators',
      lead: 'Digital Platform Delivery Team',
      dueDate: '2026-05-15',
      status: 'On Track',
      completion: 70,
    },
  ];

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Annual MEAL Workplan & Milestones
        </h1>
        <p className="text-xs text-slate-500">
          Quarterly implementation deliverables, technical milestones, and completion checkpoints
        </p>
      </div>

      <div className="space-y-3">
        {milestones.map((m, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-800">
                    {m.quarter}
                  </span>
                  <span className="text-xs text-slate-400">Due: {m.dueDate}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{m.milestone}</h3>
                <div className="text-xs text-slate-500 mt-0.5">Responsible Lead: {m.lead}</div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-800">{m.completion}%</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    m.status === 'On Track'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                      : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                  }`}
                >
                  {m.status}
                </span>
              </div>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-700 transition-all duration-500"
                style={{ width: `${m.completion}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GovernanceView: React.FC = () => {
  const { governance } = useMeal();

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Programme Governance & Steering Committees
        </h1>
        <p className="text-xs text-slate-500">
          Oversight structures, resolution tracking, and inter-agency coordination bodies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {governance.map(item => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
              {item.body}
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h3>

            <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Chairperson:</span>
                <span className="font-semibold text-slate-800">{item.chairPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Convened:</span>
                <span className="font-semibold text-slate-800">{item.lastMeetingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Resolutions:</span>
                <span className="font-bold text-brand-800">{item.activeResolutionsCount} actions</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Audit Standing:</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
