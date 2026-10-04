import React from 'react';
import { useMeal } from '../../context/MealContext';
import { History, Shield, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { auditLogs } = useMeal();

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20';
      case 'UPDATE':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20';
      case 'VERIFY':
        return 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/20';
      case 'DELETE':
        return 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20';
      case 'SYNC':
        return 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20';
      default:
        return 'bg-slate-50 text-slate-700 ring-1 ring-slate-600/20';
    }
  };

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl flex items-center space-x-2">
          <History className="h-6 w-6 text-slate-700" />
          <span>Immutable System Audit Trail</span>
        </h1>
        <p className="text-xs text-slate-500">
          Security and compliance audit log capturing user actions, timestamps, and IP addresses
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Timestamp (UTC+3)</th>
                <th className="py-3 px-4">Officer / User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 font-mono">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    <div>{log.userName}</div>
                    <div className="text-[11px] text-slate-400">{log.userRole}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold ${getActionBadge(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{log.module}</td>
                  <td className="py-3 px-4 text-slate-600">{log.description}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ComplianceView: React.FC = () => {
  const complianceChecklist = [
    {
      title: 'Ethiopian Personal Data Protection Proclamation Alignment',
      standard: 'Federal Legislation & INSA Guidelines',
      status: 'Fully Compliant',
      notes: 'Participant PII encrypted at rest using AES-256 and Fayida tokens hashed.',
    },
    {
      title: 'International Safeguarding & PSEA Standards',
      standard: 'Zero Tolerance Policy for Abuse',
      status: 'Fully Compliant',
      notes: 'Role-restricted access for confidential disclosures and survivor-centered triage protocols.',
    },
    {
      title: 'International Donor Financial Transparency & Anti-Fraud',
      standard: 'Grant Fiduciary Schedule & Compliance',
      status: 'Fully Compliant',
      notes: 'Revolving loan disbursements cross-referenced with partner MFI ledgers.',
    },
    {
      title: 'Enterprise Cloud Infrastructure & SLA Security',
      standard: 'Tier III Data Center Hosting',
      status: 'Active & Monitored',
      notes: 'Daily automated backup snapshots with dual geo-redundancy in Addis Ababa.',
    },
  ];

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          <span>Governance & Regulatory Compliance</span>
        </h1>
        <p className="text-xs text-slate-500">
          Verification against Ethiopian data privacy laws, INSA cybersecurity standards, and donor safeguards
        </p>
      </div>

      <div className="space-y-3">
        {complianceChecklist.map((c, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  {c.standard}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1.5">{c.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{c.notes}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{c.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
