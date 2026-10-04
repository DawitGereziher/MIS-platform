import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import { Participant } from '../../../core/domain/entities/Participant';
import {
  Search,
  Filter,
  UserPlus,
  Trash2,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Building,
  MapPin,
  Download,
} from 'lucide-react';

export const ParticipantListView: React.FC<{
  onOpenNewModal: () => void;
}> = ({ onOpenNewModal }) => {
  const { participants, deleteParticipant } = useMeal();
  const { permissions } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSex, setSelectedSex] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  // Filter list
  const filtered = participants.filter(p => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fayidaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery);

    const matchesRegion = selectedRegion === 'All' || p.region === selectedRegion;
    const matchesSex = selectedSex === 'All' || p.sex === selectedSex;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesRegion && matchesSex && matchesStatus;
  });

  const regions = ['All', ...Array.from(new Set(participants.map(p => p.region)))];
  const statuses = ['All', 'Employed', 'Self-Employed', 'In Training', 'Enrolled', 'Graduated'];

  const getStatusBadge = (status: Participant['status']) => {
    switch (status) {
      case 'Employed':
        return 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/20';
      case 'Self-Employed':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20';
      case 'In Training':
        return 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20';
      case 'Enrolled':
        return 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20';
      case 'Graduated':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20';
      default:
        return 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20';
    }
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Full Name', 'Fayida ID', 'Phone', 'Sex', 'Age', 'Region', 'Woreda', 'Education', 'Status', 'Cohort'];
    const rows = filtered.map(p => [
      p.id,
      `"${p.fullName}"`,
      p.fayidaId,
      p.phone,
      p.sex,
      p.age,
      p.region,
      p.woreda,
      p.education,
      p.status,
      `"${p.cohort}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `meal_participants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header & Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Participants Directory</h1>
          <p className="text-xs text-slate-500">
            Centrally registered youth beneficiaries across all programme woredas and cohorts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {permissions.canExportData && (
            <button
              onClick={handleExportCsv}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Export CSV</span>
            </button>
          )}
          {permissions.canRegisterParticipants && (
            <button
              onClick={onOpenNewModal}
              className="flex items-center space-x-2 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition"
            >
              <UserPlus className="h-4 w-4" />
              <span>Register Participant</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, Fayida ID, or phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-brand-500 focus:outline-none"
          >
            {regions.map(r => (
              <option key={r} value={r}>
                {r === 'All' ? 'All Regions' : r}
              </option>
            ))}
          </select>

          {/* Sex Filter */}
          <select
            value={selectedSex}
            onChange={e => setSelectedSex(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-brand-500 focus:outline-none"
          >
            <option value="All">All Genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-brand-500 focus:outline-none"
          >
            {statuses.map(s => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Statuses' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong>{filtered.length}</strong> of {participants.length} participants
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Participant Name</th>
                <th className="py-3 px-4">Fayida ID</th>
                <th className="py-3 px-4">Sex / Age</th>
                <th className="py-3 px-4">Region & Woreda</th>
                <th className="py-3 px-4">Education</th>
                <th className="py-3 px-4">Inclusion</th>
                <th className="py-3 px-4">Pathway Status</th>
                <th className="py-3 px-4">Cohort</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <div>{p.fullName}</div>
                    <div className="text-[11px] text-slate-400">{p.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center space-x-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-800 border border-slate-200">
                      <ShieldCheck className="h-3 w-3 text-brand-700" />
                      <span>{p.fayidaId}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span>{p.sex}</span>, <span className="text-slate-500">{p.age}y</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{p.region}</div>
                    <div className="text-[11px] text-slate-400">{p.woreda}</div>
                  </td>
                  <td className="py-3 px-4">{p.education}</td>
                  <td className="py-3 px-4">
                    {p.disability ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                        PWD ({p.disabilityType || 'Assistance'})
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getStatusBadge(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 max-w-[150px] truncate" title={p.cohort}>
                    {p.cohort}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => setSelectedParticipant(p)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {permissions.canEditParticipants && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to remove ${p.fullName}?`)) {
                              deleteParticipant(p.id);
                            }
                          }}
                          className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          title="Delete participant"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No participants found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Participant Detail Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedParticipant.fullName}</h3>
                <p className="text-xs text-slate-500">ID: {selectedParticipant.id} â¢ Registered: {selectedParticipant.registrationDate}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(selectedParticipant.status)}`}>
                {selectedParticipant.status}
              </span>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="rounded-xl bg-brand-50/60 p-3 border border-brand-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-900">National ID (Fayida):</span>
                  <span className="font-mono font-bold text-brand-700">{selectedParticipant.fayidaId}</span>
                </div>
                <div className="mt-1 text-[11px] text-brand-800/80">
                  Verified with NIDP Fayida Gateway â¢ Biometrics Authenticated
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-slate-400">Gender & Age:</span>
                  <div className="font-semibold text-slate-800">{selectedParticipant.sex}, {selectedParticipant.age} years</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-slate-400">Contact Phone:</span>
                  <div className="font-semibold text-slate-800">{selectedParticipant.phone}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-slate-400">Region & Woreda:</span>
                  <div className="font-semibold text-slate-800">{selectedParticipant.region} ({selectedParticipant.woreda})</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-slate-400">Kebele:</span>
                  <div className="font-semibold text-slate-800">{selectedParticipant.kebele}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-slate-400">Education Level:</span>
                  <div className="font-semibold text-slate-800">{selectedParticipant.education}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <span className="text-slate-400">Disability / Inclusion:</span>
                  <div className="font-semibold text-slate-800">
                    {selectedParticipant.disability ? selectedParticipant.disabilityType || 'Assistance Required' : 'None Reported'}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-slate-400">Assigned Cohort / Intervention:</span>
                <div className="font-semibold text-slate-800">{selectedParticipant.cohort}</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedParticipant(null)}
                className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
