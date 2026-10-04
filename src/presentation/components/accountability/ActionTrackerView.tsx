import React from 'react';
import { useMeal } from '../../context/MealContext';
import { ActionItem } from '../../../core/domain/entities/Accountability';
import { ListTodo, CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';

export const ActionTrackerView: React.FC = () => {
  const { actions, updateActionItemStatus } = useMeal();

  const getPriorityColor = (priority: ActionItem['priority']) => {
    switch (priority) {
      case 'High':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Low':
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Action Points & Decision Tracker
        </h1>
        <p className="text-xs text-slate-500">
          Remedial actions and recommendations generated from audits, review meetings, and field monitoring visits
        </p>
      </div>

      <div className="space-y-3">
        {actions.map(action => (
          <div
            key={action.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                    {action.source}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] border font-semibold ${getPriorityColor(action.priority)}`}>
                    {action.priority} Priority
                  </span>
                  <span className="text-xs text-slate-400">• {action.department}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1.5">{action.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{action.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={action.status}
                  onChange={e => updateActionItemStatus(action.id, e.target.value as ActionItem['status'])}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                    action.status === 'Completed'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Deferred">Deferred</option>
                </select>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
              <div>
                Assignee: <strong className="text-slate-800">{action.assignedTo}</strong> ({action.region})
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Due: {action.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
