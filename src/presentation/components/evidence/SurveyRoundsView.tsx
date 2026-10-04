import React from 'react';
import { useMeal } from '../../context/MealContext';
import { FileSpreadsheet, Calendar, Users, CheckCircle, BarChart3 } from 'lucide-react';

export const SurveyRoundsView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { surveyRounds } = useMeal();

  return (
    <div className="space-y-5 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Surveys & Evidence Collection Rounds
          </h1>
          <p className="text-xs text-slate-500">
            Systematic baseline, midline, and endline longitudinal evaluation campaigns
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('compare')}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <BarChart3 className="h-4 w-4 text-brand-700" />
            <span>Compare Rounds</span>
          </button>
          <button
            onClick={() => onNavigate('offline')}
            className="flex items-center space-x-1.5 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800"
          >
            <span>Offline Field Queue</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {surveyRounds.map(round => {
          const progressPercent = Math.min(
            100,
            Math.round((round.completedSample / (round.targetSample || 1)) * 100)
          );

          return (
            <div
              key={round.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {round.code}
                    </span>
                    <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                      {round.type}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{round.title}</h3>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    round.status === 'Closed'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                      : 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                  }`}
                >
                  {round.status}
                </span>
              </div>

              {/* Sample Progress */}
              <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <span>Sample Coverage</span>
                  <span className="font-bold text-slate-900">
                    {round.completedSample} / {round.targetSample} completed ({progressPercent}%)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-700 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>
                    Field Window: {round.startDate} to {round.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {round.regionsIncluded.map(reg => (
                    <span key={reg} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
