import React from 'react';
import { useMeal } from '../../context/MealContext';
import { PiggyBank, Users, Landmark, CheckCircle2, AlertCircle } from 'lucide-react';

export const SavingsGroupsView: React.FC = () => {
  const { savingsGroups } = useMeal();

  const totalMembers = savingsGroups.reduce((acc, s) => acc + s.totalMembers, 0);
  const totalFemale = savingsGroups.reduce((acc, s) => acc + s.femaleMembers, 0);
  const totalMobilized = savingsGroups.reduce((acc, s) => acc + s.totalSavingsMobilizedEtb, 0);

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Village Savings and Loan Associations (VSLA)
        </h1>
        <p className="text-xs text-slate-500">
          Grassroots youth and women savings groups mobilized and linked to formal banking / SACCOs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Active VSLA Groups</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{savingsGroups.length}</div>
          <p className="text-[11px] text-teal-700 mt-0.5 font-medium">Community financial circles</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Total Group Members</div>
          <div className="mt-1 text-2xl font-bold text-brand-800">{totalMembers}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">{totalFemale} female members</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Total Savings Mobilized</div>
          <div className="mt-1 text-2xl font-bold text-emerald-600">{totalMobilized.toLocaleString()} ETB</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Grassroots capital accumulation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {savingsGroups.map(group => (
          <div
            key={group.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
                  {group.code}
                </span>
                <h3 className="mt-1.5 text-sm font-bold text-slate-900">{group.groupName}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  {group.region} • {group.woreda}
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  group.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                    : 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                }`}
              >
                {group.status}
              </span>
            </div>

            <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Members:</span>
                <span className="font-bold text-slate-800">
                  {group.totalMembers} ({group.femaleMembers} female)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Savings Mobilized:</span>
                <span className="font-bold text-emerald-700">{group.totalSavingsMobilizedEtb.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Internal Loans Circulating:</span>
                <span className="font-semibold text-slate-800">{group.loansIssuedInternalEtb.toLocaleString()} ETB</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
              <span>Formal Bank Linkage:</span>
              {group.bankLinkageEstablished ? (
                <span className="font-medium text-emerald-700 flex items-center space-x-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{group.linkedBankOrMfi}</span>
                </span>
              ) : (
                <span className="text-amber-600 font-medium">Informal / Linking Pending</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
