import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import { SafeguardingIncident, IncidentSeverity } from '../../../core/domain/entities/Accountability';
import { ShieldAlert, AlertTriangle, CheckCircle, Clock, Lock, Plus, X } from 'lucide-react';

export const SafeguardingCaseView: React.FC = () => {
  const { safeguarding, updateSafeguardingStatus, addSafeguardingIncident } = useMeal();
  const { permissions } = useAuth();

  const [selectedCase, setSelectedCase] = useState<SafeguardingIncident | null>(null);
  const [newActionNote, setNewActionNote] = useState('');
  const [newStatus, setNewStatus] = useState<SafeguardingIncident['status']>('Action Plan Underway');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New incident state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SafeguardingIncident['category']>('Unsafe Working Conditions');
  const [severity, setSeverity] = useState<IncidentSeverity>('Medium');
  const [region, setRegion] = useState('Oromia');
  const [woreda, setWoreda] = useState('Bishoftu');
  const [isConfidential, setIsConfidential] = useState(false);
  const [summary, setSummary] = useState('');

  const getSeverityBadge = (sev: IncidentSeverity) => {
    switch (sev) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300 font-bold';
      case 'High':
        return 'bg-rose-100 text-rose-800 border-rose-200 font-semibold';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low':
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;
    await updateSafeguardingStatus(selectedCase.id, newStatus, newActionNote.trim() || undefined);
    setSelectedCase(null);
    setNewActionNote('');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    await addSafeguardingIncident({
      incidentCode: `SG-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      category,
      severity,
      status: 'Reported',
      reportedDate: new Date().toISOString().split('T')[0],
      region,
      woreda: woreda.trim(),
      isConfidential,
      assignedInvestigator: 'MEAL Lead Safeguarding Officer',
      targetResolutionDate: '2026-03-31',
      summary: summary.trim(),
      actionsTaken: ['Initial intake logged into confidential repository.'],
    });

    setIsModalOpen(false);
    setTitle('');
    setSummary('');
  };

  return (
    <div className="space-y-5 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl flex items-center space-x-2">
            <ShieldAlert className="h-6 w-6 text-red-600" />
            <span>Safeguarding & PSEA Case Management</span>
          </h1>
          <p className="text-xs text-slate-500">
            Encrypted, role-restricted incident tracking complying with International Safeguarding & Ethiopian Legal frameworks
          </p>
        </div>
        {permissions.canManageSafeguarding && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 rounded-lg bg-red-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-800 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Log Safeguarding Incident</span>
          </button>
        )}
      </div>

      {/* Case List */}
      <div className="space-y-3">
        {safeguarding.map(item => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-300"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-slate-700">{item.incidentCode}</span>
                  {item.isConfidential && (
                    <span className="inline-flex items-center space-x-1 rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                      <Lock className="h-3 w-3" />
                      <span>CONFIDENTIAL</span>
                    </span>
                  )}
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] border ${getSeverityBadge(item.severity)}`}>
                    {item.severity} Severity
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1.5">{item.title}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Category: <strong className="text-slate-700">{item.category}</strong> â¢ Location:{' '}
                  {item.region} ({item.woreda})
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    item.status === 'Resolved & Closed'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                      : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                  }`}
                >
                  {item.status}
                </span>
                {permissions.canManageSafeguarding && item.status !== 'Resolved & Closed' && (
                  <button
                    onClick={() => {
                      setSelectedCase(item);
                      setNewStatus(item.status);
                    }}
                    className="rounded bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800 hover:bg-brand-100"
                  >
                    Manage
                  </button>
                )}
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {item.summary}
            </p>

            {/* Actions Taken Audit Trail */}
            <div className="mt-3 text-xs border-t border-slate-100 pt-3">
              <span className="font-semibold text-slate-700">Actions Taken & Evidence:</span>
              <ul className="mt-1.5 space-y-1 list-disc list-inside text-slate-600 text-[11px]">
                {item.actionsTaken.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Status Update Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Manage Case Workflow</h3>
            <p className="text-xs text-slate-500 mt-0.5">{selectedCase.incidentCode} â¢ {selectedCase.category}</p>

            <form onSubmit={handleUpdate} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Status Workflow Progression</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as SafeguardingIncident['status'])}
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                >
                  <option value="Reported">Reported</option>
                  <option value="Triaged">Triaged</option>
                  <option value="Investigation Active">Investigation Active</option>
                  <option value="Action Plan Underway">Action Plan Underway</option>
                  <option value="Resolved & Closed">Resolved & Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Record Remedial Action or Inspection Finding</label>
                <textarea
                  rows={3}
                  value={newActionNote}
                  onChange={e => setNewActionNote(e.target.value)}
                  placeholder="e.g. Warning letter issued, survivor accommodation provided..."
                  className="w-full rounded-lg border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-red-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-red-800"
                >
                  Update Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">File Safeguarding / Incident Report</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Incident Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Summary of incident..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as SafeguardingIncident['category'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Unsafe Working Conditions">Unsafe Working Conditions</option>
                    <option value="Workplace Harassment / Bullying">Workplace Harassment / Bullying</option>
                    <option value="Sexual Exploitation / Abuse (SEA)">Sexual Exploitation / Abuse (SEA)</option>
                    <option value="Child Safeguarding">Child Safeguarding</option>
                    <option value="Financial Fraud / Extortion">Financial Fraud / Extortion</option>
                    <option value="Discrimination / Exclusion">Discrimination / Exclusion</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Severity Risk</label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value as IncidentSeverity)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Region</label>
                  <select
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Oromia">Oromia</option>
                    <option value="Amhara">Amhara</option>
                    <option value="Sidama">Sidama</option>
                    <option value="Addis Ababa">Addis Ababa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Woreda</label>
                  <input
                    type="text"
                    required
                    value={woreda}
                    onChange={e => setWoreda(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 rounded-lg bg-slate-50 p-2.5">
                <input
                  type="checkbox"
                  id="conf"
                  checked={isConfidential}
                  onChange={e => setIsConfidential(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="conf" className="text-xs text-slate-700 font-medium">
                  Mark as Strict Confidential (Restricted to Lead Safeguarding Investigators)
                </label>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Detailed Narrative & Facts *</label>
                <textarea
                  required
                  rows={3}
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  placeholder="Provide objective overview without revealing sensitive victim details if anonymous..."
                  className="w-full rounded-lg border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-red-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-red-800"
                >
                  Submit Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
