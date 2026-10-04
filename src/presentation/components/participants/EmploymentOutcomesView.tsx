import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import { EmploymentOutcome, EmploymentType } from '../../../core/domain/entities/Participant';
import {
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  Building,
  Plus,
  Search,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const EmploymentOutcomesView: React.FC = () => {
  const { employmentOutcomes, verifyEmployment } = useMeal();
  const { permissions } = useAuth();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterSector, setFilterSector] = useState('All');

  const filtered = employmentOutcomes.filter(e => {
    const matchSearch =
      e.participantName.toLowerCase().includes(search.toLowerCase()) ||
      e.employerOrBusiness.toLowerCase().includes(search.toLowerCase()) ||
      e.jobTitle.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' || e.type === filterType;
    const matchSector = filterSector === 'All' || e.sector === filterSector;
    return matchSearch && matchType && matchSector;
  });

  const totalWage = employmentOutcomes.filter(e => e.type === 'Wage Employment').length;
  const totalSelf = employmentOutcomes.filter(e => e.type === 'Self-Employment' || e.type === 'Micro-Enterprise').length;
  const verifiedCount = employmentOutcomes.filter(e => e.verified).length;
  const avgIncome =
    employmentOutcomes.length > 0
      ? Math.round(
          employmentOutcomes.reduce((acc, curr) => acc + curr.monthlyIncomeEtb, 0) / employmentOutcomes.length
        )
      : 0;

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Employment Outcomes & Transitions
          </h1>
          <p className="text-xs text-slate-500">
            Tracking dignified, fulfilling wage and self-employment transitions across target sectors
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Total Placed in Work</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{employmentOutcomes.length}</div>
          <p className="text-[11px] text-teal-700 font-medium mt-0.5">Dignified jobs verified</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Wage Employment</div>
          <div className="mt-1 text-2xl font-bold text-brand-800">{totalWage}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Formal private sector contracts</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Self-Employed / MSME</div>
          <div className="mt-1 text-2xl font-bold text-blue-700">{totalSelf}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Youth enterprise owners</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Average Monthly Income</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{avgIncome.toLocaleString()} ETB</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
            {verifiedCount}/{employmentOutcomes.length} officially verified
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by participant name, job title, employer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2 text-xs focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700"
          >
            <option value="All">All Pathways</option>
            <option value="Wage Employment">Wage Employment</option>
            <option value="Self-Employment">Self-Employment</option>
            <option value="Micro-Enterprise">Micro-Enterprise</option>
          </select>

          <select
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700"
          >
            <option value="All">All Sectors</option>
            <option value="Agribusiness">Agribusiness</option>
            <option value="Textile & Garments">Textile & Garments</option>
            <option value="Digital & ICT">Digital & ICT</option>
            <option value="Construction">Construction</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Retail/Services">Retail/Services</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Beneficiary</th>
                <th className="py-3 px-4">Pathway Type</th>
                <th className="py-3 px-4">Job Title / Role</th>
                <th className="py-3 px-4">Employer / Business Unit</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Monthly Income</th>
                <th className="py-3 px-4">Contract Nature</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <div>{e.participantName}</div>
                    <div className="text-[11px] text-slate-400">{e.region}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        e.type === 'Wage Employment'
                          ? 'bg-teal-50 text-teal-800 ring-1 ring-teal-600/20'
                          : 'bg-blue-50 text-blue-800 ring-1 ring-blue-600/20'
                      }`}
                    >
                      {e.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{e.jobTitle}</td>
                  <td className="py-3 px-4 text-slate-600">{e.employerOrBusiness}</td>
                  <td className="py-3 px-4">{e.sector}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {e.monthlyIncomeEtb.toLocaleString()} ETB
                  </td>
                  <td className="py-3 px-4 text-slate-500">{e.contractType}</td>
                  <td className="py-3 px-4">
                    {e.verified ? (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ring-1 ring-emerald-600/20">
                        <CheckCircle className="h-3 w-3" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full ring-1 ring-amber-600/20">
                        <Clock className="h-3 w-3" />
                        <span>Pending Proof</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {!e.verified && permissions.canEditParticipants && (
                      <button
                        onClick={() => verifyEmployment(e.id)}
                        className="inline-flex items-center space-x-1 rounded bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-800 hover:bg-brand-100 transition"
                      >
                        <ShieldCheck className="h-3 w-3" />
                        <span>Verify</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
