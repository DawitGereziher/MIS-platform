import React, { useState } from "react";
import { useMeal } from "../../context/MealContext";
import { Package, Plus, X, CheckCircle, Clock, MapPin, Calendar, DollarSign } from "lucide-react";

export const MaterialSupportView: React.FC = () => {
  const { materialSupport = [], addMaterialSupport } = useMeal() as any;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ recipientName: "", recipientType: "Enterprise (Small)", supportType: "Productive Equipment", itemDescription: "", quantity: "", unitCostEtb: "", region: "", woreda: "", supplier: "", distributionDate: "", status: "Distributed", purpose: "" });

  const totalValue = materialSupport.reduce((s: number, m: any) => s + (Number(m.totalValueEtb) || (m.quantity * m.unitCostEtb) || 0), 0);
  const verified = materialSupport.filter((m: any) => m.verified).length;
  const distributed = materialSupport.filter((m: any) => m.status === "Distributed").length;

  const statusColor: Record<string, string> = {
    "Distributed": "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    "In Transit": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "Pending": "bg-slate-100 text-slate-600",
    "Cancelled": "bg-red-50 text-red-700",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addMaterialSupport) {
      addMaterialSupport({ ...form, quantity: Number(form.quantity), unitCostEtb: Number(form.unitCostEtb) });
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Material & Technical Support Tracker</h1>
          <p className="text-xs text-slate-500 mt-1">Equipment grants, tools, starter kits & technical assets distributed to youth enterprises, cooperatives and VSLA groups</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center space-x-2 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-800 transition">
          <Plus className="h-4 w-4" /><span>Record Support</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-brand-50 p-2.5 text-brand-700"><DollarSign className="h-5 w-5" /></div>
            <div>
              <div className="text-xs text-slate-400">Total Value Distributed</div>
              <div className="text-lg font-bold text-slate-900">ETB {totalValue.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700"><CheckCircle className="h-5 w-5" /></div>
            <div>
              <div className="text-xs text-slate-400">Distributed Items</div>
              <div className="text-lg font-bold text-slate-900">{distributed} of {materialSupport.length}</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-700"><Clock className="h-5 w-5" /></div>
            <div>
              <div className="text-xs text-slate-400">Verified Deliveries</div>
              <div className="text-lg font-bold text-slate-900">{verified} verified</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {materialSupport.map((item: any) => {
          const totalItemValue = Number(item.totalValueEtb) || (item.quantity * item.unitCostEtb) || 0;
          return (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="font-mono rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{item.referenceCode || item.id}</span>
                    <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">{item.supportType}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor[item.status] || "bg-slate-100 text-slate-600"}`}>{item.status}</span>
                    {item.verified && <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200 flex items-center space-x-1"><CheckCircle className="h-3 w-3" /><span>Verified</span></span>}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.recipientName}</h3>
                  <p className="text-xs text-slate-500">{item.recipientType}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-brand-800">ETB {totalItemValue.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">{item.quantity} × ETB {Number(item.unitCostEtb).toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
                <p className="text-xs font-semibold text-slate-700">{item.itemDescription}</p>
                {item.purpose && <p className="text-xs text-slate-500 mt-1"><span className="font-medium">Purpose:</span> {item.purpose}</p>}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center space-x-1"><MapPin className="h-3 w-3" /><span>{item.region}{item.woreda ? `, ${item.woreda}` : ""}</span></div>
                <div className="flex items-center space-x-1"><Calendar className="h-3 w-3" /><span>{item.distributionDate}</span></div>
                {item.supplier && <div className="flex items-center space-x-1"><Package className="h-3 w-3" /><span>{item.supplier}</span></div>}
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="font-bold text-slate-900">Record Material Support</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Recipient Name</label><input required value={form.recipientName} onChange={e => setForm(p => ({...p, recipientName: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Recipient Type</label>
                  <select value={form.recipientType} onChange={e => setForm(p => ({...p, recipientType: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none">
                    {["Enterprise (Small)","Enterprise (Medium)","Cooperative","Individual Youth","Savings Group Cluster","TVET Institution"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="text-xs font-semibold text-slate-600">Support Type</label>
                  <select value={form.supportType} onChange={e => setForm(p => ({...p, supportType: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none">
                    {["Productive Equipment","Tools & Equipment","Group Start-Up Kit","Raw Materials","Digital Equipment","Training Materials"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Item Description</label><input required value={form.itemDescription} onChange={e => setForm(p => ({...p, itemDescription: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Quantity</label><input type="number" required min="1" value={form.quantity} onChange={e => setForm(p => ({...p, quantity: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Unit Cost (ETB)</label><input type="number" required min="0" value={form.unitCostEtb} onChange={e => setForm(p => ({...p, unitCostEtb: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Region</label><input required value={form.region} onChange={e => setForm(p => ({...p, region: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Woreda</label><input value={form.woreda} onChange={e => setForm(p => ({...p, woreda: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Supplier</label><input value={form.supplier} onChange={e => setForm(p => ({...p, supplier: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div><label className="text-xs font-semibold text-slate-600">Distribution Date</label><input type="date" required value={form.distributionDate} onChange={e => setForm(p => ({...p, distributionDate: e.target.value}))} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-slate-600">Purpose</label><textarea value={form.purpose} onChange={e => setForm(p => ({...p, purpose: e.target.value}))} rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none" /></div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-xl bg-brand-700 px-5 py-2 text-sm font-bold text-white hover:bg-brand-800">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
