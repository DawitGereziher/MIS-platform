import React, { useState } from "react";
import { useMeal } from "../../context/MealContext";
import { Radio, Users, Plus, X, TrendingUp, MapPin, Calendar, Target } from "lucide-react";

export const SBCCTrackerView: React.FC = () => {
  const { sbccActivities = [], addSBCCActivity } = useMeal() as any;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Community Workshop", theme: "", region: "", woreda: "", targetAudience: "", targetReach: "", channel: "", date: "", status: "Planned", facilitator: "" });

  const totalReach = sbccActivities.reduce((s: number, a: any) => s + (a.actualReach || 0), 0);
  const femaleReach = sbccActivities.reduce((s: number, a: any) => s + (a.femaleReach || 0), 0);
  const completed = sbccActivities.filter((a: any) => a.status === "Completed").length;
  const planned = sbccActivities.filter((a: any) => a.status === "Planned").length;

  const statusColor: Record<string, string> = {
    "Completed": "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    "In Progress": "bg-brand-50 text-brand-700 ring-1 ring-brand-200",
    "Planned": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addSBCCActivity) {
      addSBCCActivity({ ...form, targetReach: Number(form.targetReach), actualReach: 0, femaleReach: 0, maleReach: 0 });
    }
    setShowForm(false);
    setForm({ title: "", type: "Community Workshop", theme: "", region: "", woreda: "", targetAudience: "", targetReach: "", channel: "", date: "", status: "Planned", facilitator: "" });
  };

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">SBCC Campaigns & Activities Tracker</h1>
          <p className="text-xs text-slate-500 mt-1">Social & Behaviour Change Communication tracking for gender norms, financial literacy, disability inclusion & economic empowerment</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center space-x-2 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-800 transition">
          <Plus className="h-4 w-4" /> <span>Log Activity</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Reach", value: totalReach.toLocaleString(), icon: Users, color: "brand" },
          { label: "Female Reach", value: femaleReach.toLocaleString(), icon: TrendingUp, color: "violet" },
          { label: "Completed", value: completed, icon: Target, color: "emerald" },
          { label: "Planned", value: planned, icon: Calendar, color: "amber" },
        ].map((k, i) => {
          const Icon = k.icon;
          const c: Record<string, string> = { brand: "bg-brand-50 text-brand-700", violet: "bg-violet-50 text-violet-700", emerald: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700" };
          return (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${c[k.color]}`}><Icon className="h-4 w-4" /></div>
              <div className="text-xl font-bold text-slate-900">{k.value}</div>
              <div className="text-xs text-slate-500">{k.label}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {sbccActivities.map((act: any) => {
          const reachPct = act.targetReach > 0 ? Math.min(Math.round((act.actualReach / act.targetReach) * 100), 100) : 0;
          const femalePct = act.actualReach > 0 ? Math.round((act.femaleReach / act.actualReach) * 100) : 0;
          return (
            <div key={act.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{act.code || "SBCC"}</span>
                    <span className="rounded bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">{act.type}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor[act.status] || "bg-slate-100 text-slate-600"}`}>{act.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{act.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Theme: {act.theme}</p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <div className="flex items-center space-x-1"><MapPin className="h-3 w-3" /><span>{act.region}{act.woreda ? `, ${act.woreda}` : ""}</span></div>
                  <div className="flex items-center space-x-1 mt-0.5"><Calendar className="h-3 w-3" /><span>{act.date}</span></div>
                  <div className="flex items-center space-x-1 mt-0.5"><Radio className="h-3 w-3" /><span>{act.channel}</span></div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Reach vs Target</span><span className="font-bold text-slate-800">{(act.actualReach || 0).toLocaleString()} / {(act.targetReach || 0).toLocaleString()}</span></div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-brand-600 rounded-full" style={{ width: `${reachPct}%` }} /></div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{reachPct}% of target reached</div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Female Reach</span><span className="font-bold text-violet-700">{femalePct}%</span></div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full" style={{ width: `${femalePct}%` }} /></div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{(act.femaleReach || 0).toLocaleString()} women reached</div>
                </div>
              </div>

              {act.targetAudience && (
                <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 border border-slate-100">
                  <span className="font-semibold text-slate-700">Target audience: </span>{act.targetAudience}
                </div>
              )}

              {act.behaviourChangeIndicators && act.behaviourChangeIndicators.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {act.behaviourChangeIndicators.map((ind: string, i: number) => (
                    <span key={i} className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200">{ind}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="font-bold text-slate-900">Log New SBCC Activity</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Title</label><input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none">
                    {["Community Workshop", "Mass Media Campaign", "Community Dialogue", "School Programme", "Training of Trainers"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="text-xs font-semibold text-slate-600">Theme</label><input required value={form.theme} onChange={e => setForm(p => ({ ...p, theme: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Region</label><input required value={form.region} onChange={e => setForm(p => ({ ...p, region: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Woreda</label><input value={form.woreda} onChange={e => setForm(p => ({ ...p, woreda: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Channel</label><input required value={form.channel} onChange={e => setForm(p => ({ ...p, channel: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Date</label><input type="date" required value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Target Reach</label><input type="number" required value={form.targetReach} onChange={e => setForm(p => ({ ...p, targetReach: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none">
                    {["Planned", "In Progress", "Completed"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Target Audience</label><input value={form.targetAudience} onChange={e => setForm(p => ({ ...p, targetAudience: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Facilitator</label><input value={form.facilitator} onChange={e => setForm(p => ({ ...p, facilitator: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-xl bg-brand-700 px-5 py-2 text-sm font-bold text-white hover:bg-brand-800">Log Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
