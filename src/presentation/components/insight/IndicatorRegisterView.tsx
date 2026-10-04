import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import { Indicator, RagStatus } from '../../../core/domain/entities/Evidence';
import { Activity, Edit3, CheckCircle2, AlertTriangle, Clock, TrendingUp, X } from 'lucide-react';

export const IndicatorRegisterView: React.FC = () => {
  const { indicators, updateIndicatorActual } = useMeal();
  const { permissions } = useAuth();
  const [selectedInd, setSelectedInd] = useState<Indicator | null>(null);
  const [newActual, setNewActual] = useState<number>(0);

  const handleEdit = (ind: Indicator) => {
    setSelectedInd(ind);
    setNewActual(ind.actualAchieved);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInd) return;
    await updateIndicatorActual(selectedInd.id, Number(newActual));
    setSelectedInd(null);
  };

  const getRagBadge = (rag: RagStatus) => {
    switch (rag) {
      case 'Achieved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'On Track':
        return 'bg-teal-100 text-teal-800 border-teal-300 font-semibold';
      case 'At Risk':
        return 'bg-amber-100 text-amber-800 border-amber-300 font-semibold';
      case 'Delayed':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-semibold';
    }
  };

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Logframe Indicator Performance Register
        </h1>
        <p className="text-xs text-slate-500">
          Results framework tracking targets vs achievements with dynamic RAG status
        </p>
      </div>

      <div className="space-y-4">
        {indicators.map(ind => (
          <div
            key={ind.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {ind.code}
                  </span>
                  <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                    {ind.pillar}
                  </span>
                  <span className="text-[11px] text-slate-400">â¢ Level: {ind.level}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">{ind.title}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs border ${getRagBadge(ind.ragStatus)}`}>
                  {ind.ragStatus}
                </span>
                <span className="text-sm font-extrabold text-slate-900">{ind.achievementRatePercent}%</span>
                {permissions.canViewReports && (
                  <button
                    onClick={() => handleEdit(ind)}
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                    title="Update actual value"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    ind.ragStatus === 'Achieved' || ind.ragStatus === 'On Track'
                      ? 'bg-emerald-500'
                      : ind.ragStatus === 'At Risk'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(ind.achievementRatePercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 rounded-xl bg-slate-50 p-3 text-xs">
              <div>
                <span className="text-slate-400">Baseline</span>
                <div className="font-semibold text-slate-700 mt-0.5">
                  {ind.baseline.toLocaleString()} {ind.unit}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Year 1 Target</span>
                <div className="font-semibold text-slate-700 mt-0.5">
                  {ind.targetYear1.toLocaleString()} {ind.unit}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Life of Programme Target</span>
                <div className="font-semibold text-slate-700 mt-0.5">
                  {ind.targetLifeOfProgramme.toLocaleString()} {ind.unit}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Actual Achieved</span>
                <div className="font-bold text-brand-800 mt-0.5">
                  {ind.actualAchieved.toLocaleString()} {ind.unit}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
              <span>Collection Frequency: {ind.frequency} â¢ Lead: {ind.dataCollectorRole}</span>
              <span>Updated: {ind.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Update Actual Value Modal */}
      {selectedInd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Update Indicator Progress</h3>
            <p className="text-xs text-slate-500 mt-0.5">{selectedInd.code}: {selectedInd.title}</p>

            <form onSubmit={handleSave} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  New Actual Achieved Value ({selectedInd.unit}) *
                </label>
                <input
                  type="number"
                  required
                  value={newActual}
                  onChange={e => setNewActual(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none text-sm font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Year 1 Target: {selectedInd.targetYear1.toLocaleString()} {selectedInd.unit}
                </span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInd(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-brand-800"
                >
                  Save Actual
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
