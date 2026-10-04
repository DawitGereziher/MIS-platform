import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { TrainingCohort } from '../../../core/domain/entities/Enterprise';
import {
  GraduationCap,
  Calendar,
  Building,
  Users,
  CheckCircle,
  Clock,
  Award,
  Search,
} from 'lucide-react';

export const TrainingCohortView: React.FC = () => {
  const { trainingCohorts } = useMeal();
  const [search, setSearch] = useState('');

  const filtered = trainingCohorts.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.provider.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const totalEnrolled = trainingCohorts.reduce((acc, c) => acc + c.enrolledTotal, 0);
  const totalFemale = trainingCohorts.reduce((acc, c) => acc + c.enrolledFemale, 0);
  const totalGraduated = trainingCohorts.reduce((acc, c) => acc + c.graduatedTotal, 0);

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Training & Workforce Development
        </h1>
        <p className="text-xs text-slate-500">
          TVET institute cohorts, market-driven curricula, attendance, and graduation metrics
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Total Cohorts</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{trainingCohorts.length}</div>
          <p className="text-[11px] text-teal-700 font-medium mt-0.5">Active across TVETs</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Enrolled Trainees</div>
          <div className="mt-1 text-2xl font-bold text-brand-800">{totalEnrolled}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {totalFemale} female ({((totalFemale / (totalEnrolled || 1)) * 100).toFixed(0)}%)
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Graduates Certified</div>
          <div className="mt-1 text-2xl font-bold text-emerald-600">{totalGraduated}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Accredited by MOLS/TVET</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-medium text-slate-500">Avg. Attendance Rate</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">93.4%</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Exceeds 90% benchmark</p>
        </div>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map(cohort => (
          <div
            key={cohort.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
                  {cohort.code}
                </span>
                <h3 className="mt-1.5 text-sm font-bold text-slate-900">{cohort.title}</h3>
                <div className="mt-1 flex items-center space-x-1.5 text-xs text-slate-500">
                  <Building className="h-3.5 w-3.5 text-slate-400" />
                  <span>{cohort.provider}</span>
                  <span>•</span>
                  <span>{cohort.region}</span>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  cohort.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                    : cohort.status === 'In Progress'
                    ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                    : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                }`}
              >
                {cohort.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-xs">
              <div>
                <span className="text-slate-400">Total Enrolled</span>
                <div className="font-bold text-slate-900 mt-0.5">{cohort.enrolledTotal}</div>
                <div className="text-[10px] text-teal-700">{cohort.enrolledFemale} female</div>
              </div>
              <div>
                <span className="text-slate-400">Graduates</span>
                <div className="font-bold text-slate-900 mt-0.5">{cohort.graduatedTotal}</div>
                <div className="text-[10px] text-emerald-700">{cohort.graduatedFemale} female</div>
              </div>
              <div>
                <span className="text-slate-400">Attendance</span>
                <div className="font-bold text-slate-900 mt-0.5">{cohort.attendanceRatePercent}%</div>
                <div className="text-[10px] text-slate-500">{cohort.curriculumHours} hours</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
              <div className="flex items-center space-x-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {cohort.startDate} to {cohort.endDate}
                </span>
              </div>
              <span className="font-medium text-brand-700">{cohort.sector}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
