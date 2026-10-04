import React from 'react';
import { useMeal } from '../../context/MealContext';
import { HelpCircle, Calendar, User, Search, ArrowRight } from 'lucide-react';

export const LearningAgendaView: React.FC = () => {
  const { agenda } = useMeal();

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Programme Learning Agenda
        </h1>
        <p className="text-xs text-slate-500">
          Strategic research and evidence questions guiding adaptive programme delivery and policy dialogue
        </p>
      </div>

      <div className="space-y-4">
        {agenda.map(q => (
          <div
            key={q.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                  {q.pillar}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">"{q.questionText}"</h3>
              </div>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                {q.status}
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-3.5 border border-slate-100 text-xs">
              <strong className="text-slate-800">Evidence Synthesized to Date:</strong>
              <p className="mt-1 text-slate-600 leading-relaxed">{q.evidenceCollectedSummary}</p>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Lead Investigator: <strong className="text-slate-700">{q.leadInvestigator}</strong></span>
              <span>Updated: {q.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ReflectionMeetingsView: React.FC = () => {
  const { meetings } = useMeal();

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Quarterly & Annual Reflection Meetings
        </h1>
        <p className="text-xs text-slate-500">
          Multistakeholder review forums, participatory evaluations, and documented strategic adaptations
        </p>
      </div>

      <div className="space-y-4">
        {meetings.map(m => (
          <div
            key={m.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
                  {m.type}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">{m.title}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Venue: {m.venue} • {m.participantsCount} delegates attended
                </div>
              </div>
              <span className="font-mono text-xs font-semibold text-slate-500">{m.date}</span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-brand-50/50 p-3.5 border border-brand-100">
                <strong className="text-brand-900">Key Analytical Insights:</strong>
                <ul className="mt-1.5 space-y-1 list-disc list-inside text-brand-950">
                  {m.keyInsights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <strong className="text-slate-800">Agreed Strategic Adaptations:</strong>
                <ul className="mt-1.5 space-y-1 list-disc list-inside text-slate-700">
                  {m.keyActionsAgreed.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
