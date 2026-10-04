import React, { useState } from "react";
import { useMeal } from "../../context/MealContext";
import { Handshake, Building, Calendar, Mail, Phone, Plus, X, CheckCircle, Clock } from "lucide-react";

export const PartnershipsView: React.FC = () => {
  const { partnerships, addPartnership } = useMeal() as any;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ partnerName: "", type: "Financial Institution", focusArea: "", region: "", status: "Active", mouSignedDate: "", expiryDate: "", contactPerson: "", email: "", phone: "" });

  const statusColor: Record<string, string> = {
    "Active": "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    "Under Review": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "Expired": "bg-red-50 text-red-700 ring-1 ring-red-200",
    "Inactive": "bg-slate-100 text-slate-600",
  };

  const typeColor: Record<string, string> = {
    "Financial Institution": "bg-brand-50 text-brand-700",
    "TVET Institution": "bg-violet-50 text-violet-700",
    "Government": "bg-sky-50 text-sky-700",
    "Donor / International NGO": "bg-amber-50 text-amber-700",
    "Private Sector": "bg-emerald-50 text-emerald-700",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addPartnership) addPartnership(form);
    setShowForm(false);
    setForm({ partnerName: "", type: "Financial Institution", focusArea: "", region: "", status: "Active", mouSignedDate: "", expiryDate: "", contactPerson: "", email: "", phone: "" });
  };

  const active = partnerships?.filter((p: any) => p.status === "Active").length || 0;

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Institutional & Private Sector Partnerships</h1>
          <p className="text-xs text-slate-500 mt-1">MoUs and strategic alliances with TVETs, MFIs, government ministries, and private employers</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <CheckCircle className="h-3.5 w-3.5" /><span>{active} Active MoUs</span>
          </div>
          <button onClick={() => setShowForm(true)} className="flex items-center space-x-2 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-800 transition">
            <Plus className="h-4 w-4" /><span>Add Partner</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {(partnerships || []).map((partner: any) => (
          <div key={partner.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${typeColor[partner.type] || "bg-slate-100 text-slate-600"}`}>{partner.type}</span>
                <h3 className="mt-2 text-sm font-bold text-slate-900">{partner.partnerName}</h3>
                <p className="text-xs text-slate-500">{partner.region}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor[partner.status] || "bg-slate-100 text-slate-600"}`}>{partner.status}</span>
            </div>

            <p className="mt-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <strong className="text-slate-800">Focus:</strong> {partner.focusArea}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
              {partner.contactPerson && <div className="flex items-center space-x-1"><Building className="h-3.5 w-3.5" /><span>{partner.contactPerson}</span></div>}
              {partner.email && <div className="flex items-center space-x-1 truncate"><Mail className="h-3.5 w-3.5 flex-shrink-0" /><span className="truncate">{partner.email}</span></div>}
              {partner.phone && <div className="flex items-center space-x-1"><Phone className="h-3.5 w-3.5" /><span>{partner.phone}</span></div>}
              {partner.activeProjectsCount !== undefined && (
                <div className="flex items-center space-x-1 text-brand-700 font-semibold"><Handshake className="h-3.5 w-3.5" /><span>{partner.activeProjectsCount} active projects</span></div>
              )}
            </div>

            {(partner.mouSignedDate || partner.expiryDate) && (
              <div className="mt-3 flex items-center space-x-3 text-[10px] text-slate-400 border-t border-slate-100 pt-2.5">
                {partner.mouSignedDate && <div className="flex items-center space-x-1"><Calendar className="h-3 w-3" /><span>MoU signed: {partner.mouSignedDate}</span></div>}
                {partner.expiryDate && <div className="flex items-center space-x-1"><Clock className="h-3 w-3" /><span>Expires: {partner.expiryDate}</span></div>}
              </div>
            )}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="font-bold text-slate-900">Register New Partnership</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Partner Name</label><input required value={form.partnerName} onChange={e => setForm(p => ({...p, partnerName: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none">
                    {["Financial Institution","TVET Institution","Government","Donor / International NGO","Private Sector","UN Agency"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="text-xs font-semibold text-slate-600">Region</label><input required value={form.region} onChange={e => setForm(p => ({...p, region: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Focus Area</label><textarea required value={form.focusArea} onChange={e => setForm(p => ({...p, focusArea: e.target.value}))} rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">MoU Signed Date</label><input type="date" required value={form.mouSignedDate} onChange={e => setForm(p => ({...p, mouSignedDate: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Expiry Date</label><input type="date" required value={form.expiryDate} onChange={e => setForm(p => ({...p, expiryDate: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Contact Person</label><input value={form.contactPerson} onChange={e => setForm(p => ({...p, contactPerson: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none">
                    {["Active","Under Review","Inactive","Expired"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div><label className="text-xs font-semibold text-slate-600">Email</label><input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Phone</label><input value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-xl bg-brand-700 px-5 py-2 text-sm font-bold text-white hover:bg-brand-800">Save Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
