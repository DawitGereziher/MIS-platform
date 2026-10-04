import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import { OfflineSurveyItem } from '../../../core/domain/entities/Evidence';
import { WifiOff, RefreshCw, CheckCircle2, Clock, Plus, X } from 'lucide-react';

export const OfflineQueueView: React.FC = () => {
  const { offlineQueue, addOfflineSurvey, syncOfflineQueue } = useMeal();
  const { currentUser } = useAuth();
  const [syncing, setSyncing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [respondentName, setRespondentName] = useState('');
  const [respondentPhone, setRespondentPhone] = useState('+251 9');
  const [region, setRegion] = useState('Oromia');
  const [woreda, setWoreda] = useState('Bishoftu');
  const [payloadSummary, setPayloadSummary] = useState('');

  const pendingItems = offlineQueue.filter(q => q.deviceSyncStatus === 'Pending Sync');

  const handleSyncAll = async () => {
    setSyncing(true);
    await syncOfflineQueue();
    setTimeout(() => setSyncing(false), 600);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondentName.trim()) return;

    await addOfflineSurvey({
      surveyRoundId: 'srv-2',
      surveyTitle: 'Year 1 Midline Youth Employment Survey',
      respondentName: respondentName.trim(),
      respondentPhone: respondentPhone.trim(),
      region,
      woreda: woreda.trim(),
      collectedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      enumeratorName: currentUser ? currentUser.name : 'Field Officer',
      payloadSummary: payloadSummary.trim() || 'Survey form answered offline via local PWA storage.',
    });

    setIsModalOpen(false);
    setRespondentName('');
    setPayloadSummary('');
  };

  return (
    <div className="space-y-5 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl flex items-center space-x-2">
            <WifiOff className="h-6 w-6 text-amber-600" />
            <span>Offline Field Collection Queue</span>
          </h1>
          <p className="text-xs text-slate-500">
            PWA / IndexedDB storage buffer allowing enumerators to capture data in remote woredas without internet
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Plus className="h-4 w-4 text-brand-700" />
            <span>Record Offline Survey</span>
          </button>
          <button
            onClick={handleSyncAll}
            disabled={syncing || pendingItems.length === 0}
            className="flex items-center space-x-2 rounded-lg bg-brand-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 disabled:opacity-50 transition"
          >
            <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            <span>Sync All to Central Server ({pendingItems.length})</span>
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Respondent Name</th>
                <th className="py-3 px-4">Survey Campaign</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Enumerator</th>
                <th className="py-3 px-4">Time Captured</th>
                <th className="py-3 px-4">Payload Summary</th>
                <th className="py-3 px-4 text-right">Sync Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {offlineQueue.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <div>{item.respondentName}</div>
                    <div className="text-[11px] text-slate-400">{item.respondentPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{item.surveyTitle}</td>
                  <td className="py-3 px-4">
                    <div>{item.region}</div>
                    <div className="text-[11px] text-slate-400">{item.woreda}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.enumeratorName}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{item.collectedAt}</td>
                  <td className="py-3 px-4 text-slate-600 max-w-[240px] truncate" title={item.payloadSummary}>
                    {item.payloadSummary}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.deviceSyncStatus === 'Synced' ? (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ring-1 ring-emerald-600/20">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Synced</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full ring-1 ring-amber-600/20">
                        <Clock className="h-3 w-3" />
                        <span>Pending Sync</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Simulate Offline Field Survey Capture</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Respondent Name *</label>
                  <input
                    type="text"
                    required
                    value={respondentName}
                    onChange={e => setRespondentName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={respondentPhone}
                    onChange={e => setRespondentPhone(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
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
                    <option value="Somali">Somali</option>
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

              <div>
                <label className="block font-medium text-slate-700 mb-1">Field Assessment Summary / Notes</label>
                <textarea
                  rows={3}
                  value={payloadSummary}
                  onChange={e => setPayloadSummary(e.target.value)}
                  placeholder="Completed 24 questions on household income, TVET skill utilization..."
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
                  className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-brand-800"
                >
                  Queue Offline Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
