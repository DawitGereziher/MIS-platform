import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import { LoanRecord } from '../../../core/domain/entities/Finance';
import { Landmark, Plus, Search, ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const LoanTrackingView: React.FC = () => {
  const { loans, addLoan } = useMeal();
  const { permissions } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryType, setBeneficiaryType] = useState<LoanRecord['beneficiaryType']>('Individual Youth');
  const [sex, setSex] = useState<'Female' | 'Male'>('Female');
  const [mfiPartner, setMfiPartner] = useState('Siinqee Bank (OCSSCO)');
  const [region, setRegion] = useState('Oromia');
  const [woreda, setWoreda] = useState('Bishoftu');
  const [amountDisbursedEtb, setAmountDisbursedEtb] = useState(50000);
  const [purpose, setPurpose] = useState('Working capital and inventory equipment');

  const filtered = loans.filter(l => {
    const matchSearch =
      l.beneficiaryName.toLowerCase().includes(search.toLowerCase()) ||
      l.loanReference.toLowerCase().includes(search.toLowerCase()) ||
      l.mfiPartner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || l.repaymentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beneficiaryName.trim()) return;

    await addLoan({
      loanReference: `LN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      beneficiaryName: beneficiaryName.trim(),
      beneficiaryType,
      sex,
      fayidaId: `ET-FAY-${Math.floor(10000000 + Math.random() * 90000000)}`,
      mfiPartner,
      region,
      woreda: woreda.trim(),
      amountRequestedEtb: Number(amountDisbursedEtb),
      amountDisbursedEtb: Number(amountDisbursedEtb),
      interestRatePercent: 8.0,
      disbursementDate: new Date().toISOString().split('T')[0],
      dueDate: '2027-02-01',
      amountRepaidEtb: 0,
      repaymentStatus: 'Current',
      purpose: purpose.trim(),
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Financial Inclusion & MFI Concessionary Loans
          </h1>
          <p className="text-xs text-slate-500">
            Guaranteed revolving micro-loans channeled through partner MFIs (Siinqee, ACSI, Dedebit, Omo)
          </p>
        </div>
        {permissions.canEditFinance && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Record New Loan</span>
          </button>
        )}
      </div>

      {/* Table & Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search beneficiary, reference, or MFI partner..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2 text-xs focus:border-brand-500 focus:outline-none"
          />
        </div>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700"
        >
          <option value="All">All Repayment Statuses</option>
          <option value="Current">Current</option>
          <option value="Grace Period">Grace Period</option>
          <option value="Fully Paid">Fully Paid</option>
          <option value="Overdue (30-60d)">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Loan Ref / Beneficiary</th>
                <th className="py-3 px-4">Type / Gender</th>
                <th className="py-3 px-4">MFI Partner</th>
                <th className="py-3 px-4">Disbursed (ETB)</th>
                <th className="py-3 px-4">Repaid (ETB)</th>
                <th className="py-3 px-4">Interest Rate</th>
                <th className="py-3 px-4">Repayment Status</th>
                <th className="py-3 px-4">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(loan => (
                <tr key={loan.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <div>{loan.beneficiaryName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{loan.loanReference}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{loan.beneficiaryType}</div>
                    <div className="text-[11px] text-slate-400">{loan.sex}</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{loan.mfiPartner}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {loan.amountDisbursedEtb.toLocaleString()} ETB
                  </td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold">
                    {loan.amountRepaidEtb.toLocaleString()} ETB
                  </td>
                  <td className="py-3 px-4 font-mono">{loan.interestRatePercent}%</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        loan.repaymentStatus === 'Current' || loan.repaymentStatus === 'Fully Paid'
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                          : loan.repaymentStatus === 'Grace Period'
                          ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                          : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
                      }`}
                    >
                      {loan.repaymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 max-w-[200px] truncate" title={loan.purpose}>
                    {loan.purpose}
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
            <h2 className="text-base font-bold text-slate-900 mb-3">Record Concessionary Loan Disbursement</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Beneficiary Full Name *</label>
                <input
                  type="text"
                  required
                  value={beneficiaryName}
                  onChange={e => setBeneficiaryName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Beneficiary Type</label>
                  <select
                    value={beneficiaryType}
                    onChange={e => setBeneficiaryType(e.target.value as LoanRecord['beneficiaryType'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Individual Youth">Individual Youth</option>
                    <option value="Enterprise / Cooperative">Enterprise / Cooperative</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    value={sex}
                    onChange={e => setSex(e.target.value as 'Female' | 'Male')}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Partner MFI *</label>
                  <select
                    value={mfiPartner}
                    onChange={e => setMfiPartner(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Siinqee Bank (OCSSCO)">Siinqee Bank (OCSSCO)</option>
                    <option value="Tsedey Bank (ACSI)">Tsedey Bank (ACSI)</option>
                    <option value="Dedebit Credit & Saving (DECSI)">Dedebit Credit (DECSI)</option>
                    <option value="Omo Microfinance">Omo Microfinance</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Amount Disbursed (ETB) *</label>
                  <input
                    type="number"
                    step="5000"
                    value={amountDisbursedEtb}
                    onChange={e => setAmountDisbursedEtb(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Purpose of Loan</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-brand-800"
                >
                  Save Loan Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
