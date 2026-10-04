import React from 'react';
import { useMeal } from '../../context/MealContext';
import { DollarSign, PieChart, TrendingUp, Landmark, PiggyBank, ArrowUpRight } from 'lucide-react';

export const FinanceOverviewView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { budget, loans, savingsGroups } = useMeal();

  const totalLoans = loans.reduce((acc, curr) => acc + curr.amountDisbursedEtb, 0);
  const totalSavings = savingsGroups.reduce((acc, curr) => acc + curr.totalSavingsMobilizedEtb, 0);

  if (!budget) return null;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Financial Management & Programme Budget
        </h1>
        <p className="text-xs text-slate-500">
          Expenditure burn rates, donor allocations, and catalytic finance tracking
        </p>
      </div>

      {/* Main Budget Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Programme Allocation
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">
              {(budget.totalBudgetEtb / 1000000).toFixed(1)} Million ETB
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Disbursed: {(budget.totalDisbursedEtb / 1000000).toFixed(2)}M ETB (
              {budget.burnRatePercent}%) • Remaining: {(budget.remainingEtb / 1000000).toFixed(2)}M ETB
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('loans')}
              className="flex items-center space-x-2 rounded-xl bg-brand-50 px-4 py-2.5 text-xs font-semibold text-brand-800 border border-brand-200 hover:bg-brand-100 transition"
            >
              <Landmark className="h-4 w-4" />
              <span>Concessionary Loans</span>
            </button>
            <button
              onClick={() => onNavigate('savings')}
              className="flex items-center space-x-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-800 border border-slate-200 hover:bg-slate-200 transition"
            >
              <PiggyBank className="h-4 w-4" />
              <span>Savings Groups (VSLA)</span>
            </button>
          </div>
        </div>

        {/* Big Burn Rate Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
            <span>Overall Expenditure Burn Rate</span>
            <span className="font-bold text-brand-800">{budget.burnRatePercent}% Spent</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-600 to-teal-500 transition-all duration-500"
              style={{ width: `${budget.burnRatePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Component Breakdown Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Component Allocations & Variances</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {budget.components.map((comp, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <span className="font-semibold text-xs text-slate-800">{comp.name}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                  {comp.variancePercent}%
                </span>
              </div>
              <div className="mt-3 flex justify-between items-baseline text-xs">
                <span className="text-slate-500">Spent: {(comp.spentEtb / 1000).toLocaleString()}k ETB</span>
                <span className="text-slate-700 font-bold">
                  Allocated: {(comp.allocatedEtb / 1000).toLocaleString()}k ETB
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-700"
                  style={{ width: `${comp.variancePercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
