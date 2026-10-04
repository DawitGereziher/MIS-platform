import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { Enterprise } from '../../../core/domain/entities/Enterprise';
import {
  Building2,
  Search,
  Plus,
  Users,
  DollarSign,
  TrendingUp,
  Tag,
  MapPin,
  X,
} from 'lucide-react';

export const EnterpriseListView: React.FC<{
  isOpenNewModal: boolean;
  onCloseNewModal: () => void;
  onOpenNewModal: () => void;
}> = ({ isOpenNewModal, onCloseNewModal, onOpenNewModal }) => {
  const { enterprises, addEnterprise } = useMeal();
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  // Form State
  const [name, setName] = useState('');
  const [sector, setSector] = useState<Enterprise['sector']>('Agribusiness');
  const [tier, setTier] = useState<Enterprise['tier']>('Micro (3-5)');
  const [ownerName, setOwnerName] = useState('');
  const [ownerSex, setOwnerSex] = useState<'Female' | 'Male'>('Female');
  const [region, setRegion] = useState('Oromia');
  const [woreda, setWoreda] = useState('Bishoftu');
  const [employeesCount, setEmployeesCount] = useState(4);
  const [youthEmployeesCount, setYouthEmployeesCount] = useState(3);
  const [femaleEmployeesCount, setFemaleEmployeesCount] = useState(2);
  const [monthlyRevenueEtb, setMonthlyRevenueEtb] = useState(150000);

  const filtered = enterprises.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      e.registrationNumber.toLowerCase().includes(search.toLowerCase());
    const matchSector = sectorFilter === 'All' || e.sector === sectorFilter;
    return matchSearch && matchSector;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addEnterprise({
      name: name.trim(),
      registrationNumber: `REG-2026-00${Math.floor(100 + Math.random() * 900)}`,
      ownerName: ownerName.trim(),
      ownerSex,
      ownerAge: 27,
      fayidaId: `ET-FAY-${Math.floor(10000000 + Math.random() * 90000000)}`,
      phone: '+251 91 123 4567',
      sector,
      tier,
      region,
      woreda: woreda.trim(),
      employeesCount: Number(employeesCount),
      youthEmployeesCount: Number(youthEmployeesCount),
      femaleEmployeesCount: Number(femaleEmployeesCount),
      monthlyRevenueEtb: Number(monthlyRevenueEtb),
      loanReceivedEtb: 100000,
      supportReceived: ['BDS Mentorship', 'Seed Capital'],
      status: 'Active',
      establishedDate: new Date().toISOString().split('T')[0],
    });

    onCloseNewModal();
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Enterprise Registry (MSMEs)
          </h1>
          <p className="text-xs text-slate-500">
            Track youth-led and partner micro, small, and medium enterprises receiving BDS and capital support
          </p>
        </div>
        <button
          onClick={onOpenNewModal}
          className="flex items-center space-x-2 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Register Enterprise</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search enterprise name, owner, or registration..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2 text-xs focus:border-brand-500 focus:outline-none"
          />
        </div>

        <select
          value={sectorFilter}
          onChange={e => setSectorFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700"
        >
          <option value="All">All Sectors</option>
          <option value="Agribusiness">Agribusiness</option>
          <option value="Textile & Garments">Textile & Garments</option>
          <option value="Leather & Footwear">Leather & Footwear</option>
          <option value="Digital & ICT">Digital & ICT</option>
          <option value="Construction">Construction</option>
          <option value="Hospitality & Tourism">Hospitality & Tourism</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Enterprise Name</th>
                <th className="py-3 px-4">Sector & Tier</th>
                <th className="py-3 px-4">Owner / Gender</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Jobs Created (Youth/Female)</th>
                <th className="py-3 px-4">Monthly Revenue</th>
                <th className="py-3 px-4">Support Provided</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <div>{e.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{e.registrationNumber}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800">{e.sector}</span>
                    <div className="text-[11px] text-slate-500">{e.tier}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800 font-medium">{e.ownerName}</div>
                    <div className="text-[11px] text-slate-400">{e.ownerSex}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{e.region}</div>
                    <div className="text-[11px] text-slate-400">{e.woreda}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900">{e.employeesCount} total</span>
                    <div className="text-[11px] text-teal-700">
                      {e.youthEmployeesCount} youth • {e.femaleEmployeesCount} female
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {e.monthlyRevenueEtb.toLocaleString()} ETB
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {e.supportReceived.map((s, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 border border-slate-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        e.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                          : e.status === 'Scaling'
                          ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/20'
                          : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Registering Enterprise */}
      {isOpenNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Register New MSME Enterprise</h2>
              <button onClick={onCloseNewModal} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Enterprise Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Oromia Agro Green Processing"
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Sector *</label>
                  <select
                    value={sector}
                    onChange={e => setSector(e.target.value as Enterprise['sector'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Agribusiness">Agribusiness</option>
                    <option value="Textile & Garments">Textile & Garments</option>
                    <option value="Leather & Footwear">Leather & Footwear</option>
                    <option value="Digital & ICT">Digital & ICT</option>
                    <option value="Construction">Construction</option>
                    <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tier / Scale</label>
                  <select
                    value={tier}
                    onChange={e => setTier(e.target.value as Enterprise['tier'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Nano (1-2)">Nano (1-2 employees)</option>
                    <option value="Micro (3-5)">Micro (3-5 employees)</option>
                    <option value="Small (6-15)">Small (6-15 employees)</option>
                    <option value="Medium (16+)">Medium (16+ employees)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Lead Owner Name *</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Owner Gender</label>
                  <select
                    value={ownerSex}
                    onChange={e => setOwnerSex(e.target.value as 'Female' | 'Male')}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
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
                    <option value="Somali">Somali</option>
                    <option value="Central Ethiopia">Central Ethiopia</option>
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

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Total Employees</label>
                  <input
                    type="number"
                    min={1}
                    value={employeesCount}
                    onChange={e => setEmployeesCount(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Youth Employees</label>
                  <input
                    type="number"
                    min={0}
                    value={youthEmployeesCount}
                    onChange={e => setYouthEmployeesCount(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Female Employees</label>
                  <input
                    type="number"
                    min={0}
                    value={femaleEmployeesCount}
                    onChange={e => setFemaleEmployeesCount(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Est. Monthly Gross Revenue (ETB)</label>
                <input
                  type="number"
                  step="1000"
                  value={monthlyRevenueEtb}
                  onChange={e => setMonthlyRevenueEtb(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onCloseNewModal}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-brand-800"
                >
                  Save Enterprise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
