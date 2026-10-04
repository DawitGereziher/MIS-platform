import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export const CompareRoundsView: React.FC = () => {
  const comparisonData = [
    {
      metric: 'Avg Income (ETB)',
      Baseline: 2400,
      Midline: 8200,
      TargetEndline: 12000,
    },
    {
      metric: 'Formal Employment (%)',
      Baseline: 18,
      Midline: 62,
      TargetEndline: 80,
    },
    {
      metric: 'Female Share (%)',
      Baseline: 35,
      Midline: 52,
      TargetEndline: 55,
    },
    {
      metric: 'Bank/MFI Linked (%)',
      Baseline: 12,
      Midline: 68,
      TargetEndline: 90,
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Longitudinal Survey Comparison (Rounds 1 - 3)
        </h1>
        <p className="text-xs text-slate-500">
          Tracking impact progression from Baseline (2025) through Midline (2026) to Endline Targets
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-2">Longitudinal Outcome Comparison</h2>
        <p className="text-xs text-slate-500 mb-6">
          Comparing key socio-economic indicators across survey evaluation intervals
        </p>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="metric" fontSize={12} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
              <YAxis fontSize={12} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
              <Bar dataKey="Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Midline" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="TargetEndline" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
