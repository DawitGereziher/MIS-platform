import React, { useState } from 'react';
import { ETHIOPIA_REGIONS_GIS, RegionGisData } from '../../../infrastructure/integrations/GeoData';
import { MapPin, Users, Building2, Landmark, TrendingUp, ShieldCheck } from 'lucide-react';

export const GisMapView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionGisData>(ETHIOPIA_REGIONS_GIS[0]);

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Geographic Information System (GIS) Evidence Map
        </h1>
        <p className="text-xs text-slate-500">
          Spatial mapping of youth employment hubs, enterprise density, and MFI disbursements across Ethiopia
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Interactive SVG / Map Container */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-700">Regional Cluster Map (Ethiopia)</span>
            <span className="text-[11px] text-slate-400">Click a regional node to inspect MEAL metrics</span>
          </div>

          {/* SVG Map of Ethiopia with regional coordinates */}
          <div className="relative h-96 w-full rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center p-4">
            {/* Ambient map grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

            <svg viewBox="0 0 800 600" className="w-full h-full">
              {/* Approximate stylized Ethiopia contour outline */}
              <path
                d="M 220,120 Q 320,60 440,90 Q 520,140 620,240 Q 690,320 660,420 Q 580,520 450,540 Q 340,510 240,460 Q 180,380 170,280 Q 160,200 220,120 Z"
                fill="#0F172A"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="4 2"
                className="opacity-70"
              />

              {/* Connecting flight / data routes between Addis and regions */}
              {ETHIOPIA_REGIONS_GIS.map(r => {
                const addis = ETHIOPIA_REGIONS_GIS.find(x => x.id === 'reg-addis')!;
                const x1 = ((addis.lng - 34) / (44 - 34)) * 600 + 100;
                const y1 = 500 - ((addis.lat - 3) / (15 - 3)) * 400;
                const x2 = ((r.lng - 34) / (44 - 34)) * 600 + 100;
                const y2 = 500 - ((r.lat - 3) / (15 - 3)) * 400;

                return (
                  <line
                    key={r.id}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#60A5FA"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    strokeOpacity="0.4"
                  />
                );
              })}

              {/* Interactive Regional Hotspot Circles */}
              {ETHIOPIA_REGIONS_GIS.map(region => {
                // Map lat/lng into SVG coordinates (lng approx 34-44, lat approx 3-15)
                const cx = ((region.lng - 34) / (44 - 34)) * 600 + 100;
                const cy = 500 - ((region.lat - 3) / (15 - 3)) * 400;
                const isSelected = selectedRegion.id === region.id;

                return (
                  <g
                    key={region.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setSelectedRegion(region)}
                  >
                    {/* Pulse ring for active selection */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="20"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? '12' : '8'}
                      fill={isSelected ? '#F59E0B' : '#2563EB'}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text
                      x={cx}
                      y={cy - 14}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="11"
                      fontWeight="bold"
                      className="select-none shadow-sm"
                    >
                      {region.name.replace(' Region', '').replace(' Administration', '')}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {ETHIOPIA_REGIONS_GIS.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  selectedRegion.id === r.id
                    ? 'bg-brand-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Regional Profile Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Selected Spatial Node</span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">{selectedRegion.name}</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                {selectedRegion.status}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Beneficiaries Mobilized</span>
                  <Users className="h-4 w-4 text-brand-700" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedRegion.participantsCount}
                </div>
                <div className="text-[11px] text-teal-700 font-medium mt-0.5">
                  Female Participation: {selectedRegion.femaleParticipationPercent}%
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Supported Enterprises (MSMEs)</span>
                  <Building2 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedRegion.enterprisesCount}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Incubated under Programme
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Total Loans Disbursed</span>
                  <Landmark className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedRegion.loansDisbursedEtb.toLocaleString()} ETB
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Channeled via regional MFIs
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Coordinates: {selectedRegion.lat.toFixed(4)}Â° N, {selectedRegion.lng.toFixed(4)}Â° E
          </div>
        </div>
      </div>
    </div>
  );
};
