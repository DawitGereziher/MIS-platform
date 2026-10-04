import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { FileText, Download, Printer, Filter, CheckCircle2 } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { participants, employmentOutcomes, enterprises, budget, indicators, loans, savingsGroups } = useMeal();
  const [reportType, setReportType] = useState('quarterly');

  const handlePrint = () => { window.print(); };

  const downloadCSV = () => {
    let csv = '';
    let filename = '';
    if (reportType === 'indicators') {
      filename = 'MEAL_Indicator_Matrix_Q1_2026.csv';
      csv = 'Code,Title,Pillar,Level,Baseline,Year 1 Target,Life of Programme Target,Actual Achieved,Achievement %,RAG Status,Last Updated\n';
      csv += indicators.map(i => `"${i.code}","${i.title}","${i.pillar}","${i.level}",${i.baseline},${i.targetYear1},${i.targetLifeOfProgramme},${i.actualAchieved},${i.achievementRatePercent},"${i.ragStatus}","${i.lastUpdated}"`).join('\n');
    } else if (reportType === 'financial') {
      filename = 'MEAL_Financial_Report_Q1_2026.csv';
      csv = 'Loan Reference,Beneficiary,Type,Sex,Region,MFI Partner,Amount Disbursed (ETB),Amount Repaid (ETB),Status,Disbursement Date\n';
      csv += loans.map(l => `"${l.loanReference}","${l.beneficiaryName}","${l.beneficiaryType}","${l.sex}","${l.region}","${l.mfiPartner}",${l.amountDisbursedEtb},${l.amountRepaidEtb},"${l.repaymentStatus}","${l.disbursementDate}"`).join('\n');
    } else {
      filename = 'MEAL_Quarterly_Report_Q1_2026.csv';
      csv = 'Section,Metric,Value\n';
      csv += `Programme Summary,Total Participants,${participants.length}\n`;
      csv += `Programme Summary,Female Participants,${participants.filter(p => p.sex === 'Female').length}\n`;
      csv += `Programme Summary,Male Participants,${participants.filter(p => p.sex === 'Male').length}\n`;
      csv += `Programme Summary,Participants with Disability,${participants.filter(p => p.disability).length}\n`;
      csv += `Employment,Total Verified Placements,${employmentOutcomes.filter(e => e.verified).length}\n`;
      csv += `Employment,Self-Employed,${employmentOutcomes.filter(e => e.type === 'Self-Employment').length}\n`;
      csv += `Enterprises,Total MSMEs Registered,${enterprises.length}\n`;
      csv += `Enterprises,Active MSMEs,${enterprises.filter(e => e.status === 'Active').length}\n`;
      csv += `Finance,Total Loans Disbursed,${loans.length}\n`;
      csv += `Finance,VSLA Groups,${savingsGroups.length}\n`;
      if (budget) { csv += `Finance,Total Budget Disbursed (ETB),${budget.totalDisbursedEtb}\n`; }
      indicators.forEach(i => { csv += `Indicator,${i.code} - ${i.title},${i.actualAchieved} (${i.achievementRatePercent}% - ${i.ragStatus})\n`; });
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Donor & Programme Reporting Engine
          </h1>
          <p className="text-xs text-slate-500">
            Generate standardized quarterly progress and logframe compliance reports for institutional stakeholders
          </p>
        </div>
      <div className="flex items-center space-x-2">
          <button
            onClick={downloadCSV}
            className="flex items-center space-x-1.5 rounded-lg bg-brand-700 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-brand-800 transition"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Printer className="h-4 w-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Template Selector */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
        <button
          onClick={() => setReportType('quarterly')}
          className={`px-3 py-1.5 rounded-lg transition ${
            reportType === 'quarterly' ? 'bg-brand-700 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Quarterly MEAL Executive Summary
        </button>
        <button
          onClick={() => setReportType('indicators')}
          className={`px-3 py-1.5 rounded-lg transition ${
            reportType === 'indicators' ? 'bg-brand-700 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Logframe Indicator Progress Matrix
        </button>
        <button
          onClick={() => setReportType('financial')}
          className={`px-3 py-1.5 rounded-lg transition ${
            reportType === 'financial' ? 'bg-brand-700 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Financial Variance & Grants Table
        </button>
      </div>

      {/* Generated Report Sheet */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:border-none print:shadow-none space-y-6">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA • NATIONAL YOUTH & ENTERPRISE PROGRAMME
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {reportType === 'quarterly'
                ? 'Quarterly Programme MEAL Performance Report'
                : reportType === 'indicators'
                ? 'Logframe Indicator Achievement Matrix'
                : 'Financial Disbursement & Variance Report'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Implementing Directorate: Programme Delivery Consortium | Reporting Period: Q1 2026
            </p>
          </div>
          <span className="rounded bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-800 border border-brand-200">
            OFFICIAL RECORD
          </span>
        </div>

        {/* Executive Summary Stats */}
        <div className="grid grid-cols-4 gap-4 rounded-xl bg-slate-50 p-4 text-xs border border-slate-100">
          <div>
            <span className="text-slate-400">Total Beneficiaries:</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">{participants.length}</div>
          </div>
          <div>
            <span className="text-slate-400">Employment Placements:</span>
            <div className="text-lg font-bold text-teal-800 mt-0.5">{employmentOutcomes.length}</div>
          </div>
          <div>
            <span className="text-slate-400">Enterprises Supported:</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">{enterprises.length}</div>
          </div>
          <div>
            <span className="text-slate-400">Budget Spent:</span>
            <div className="text-lg font-bold text-emerald-700 mt-0.5">
              {budget ? (budget.totalDisbursedEtb / 1000000).toFixed(2) : 0}M ETB
            </div>
          </div>
        </div>

        {/* Dynamic Section based on report type */}
        {reportType === 'indicators' ? (
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-50 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Indicator Code</th>
                <th className="p-2.5">Indicator Description</th>
                <th className="p-2.5">Baseline</th>
                <th className="p-2.5">Year 1 Target</th>
                <th className="p-2.5">Actual Achieved</th>
                <th className="p-2.5">Achievement %</th>
                <th className="p-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {indicators.map(ind => (
                <tr key={ind.id}>
                  <td className="p-2.5 font-mono font-bold text-slate-800">{ind.code}</td>
                  <td className="p-2.5 text-slate-700">{ind.title}</td>
                  <td className="p-2.5">{ind.baseline}</td>
                  <td className="p-2.5">{ind.targetYear1}</td>
                  <td className="p-2.5 font-bold text-slate-900">{ind.actualAchieved}</td>
                  <td className="p-2.5 font-bold">{ind.achievementRatePercent}%</td>
                  <td className="p-2.5">
                    <span className="rounded px-2 py-0.5 text-[10px] font-semibold bg-slate-100">
                      {ind.ragStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="space-y-4 text-xs leading-relaxed text-slate-700">
            <p>
              During this reporting cycle, the Enterprise Digital MEAL Management Information System operated with high
              fidelity across 8 Ethiopian regions. Total active youth registrations reached{' '}
              <strong>{participants.length}</strong> participants, with female representation maintained at{' '}
              <strong>52%</strong> and PWD participation at <strong>14%</strong>, both meeting or exceeding donor targets.
            </p>
            <p>
              Integration with the <strong>Fayida National Digital ID (NIDP)</strong> gateway prevented duplicate registrations
              across partner TVET cohorts. Mobile field data collection queues recorded offline surveys with 100% sync
              reconciliation into the central PostgreSQL data lake.
            </p>
          </div>
        )}

        {/* Signature Box */}
        <div className="pt-8 border-t border-slate-200 flex justify-between text-xs text-slate-500">
          <div>
            <div>Prepared by: <strong>Dawit Bekele, MEAL Specialist</strong></div>
            <div className="text-[11px] text-slate-400">Programme Management Directorate</div>
          </div>
          <div className="text-right">
            <div>Approved by: <strong>Almaz Tadesse, Programme Director</strong></div>
            <div className="text-[11px] text-slate-400">Date: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
