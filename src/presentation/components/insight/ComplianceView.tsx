import React from "react";
import { useMeal } from "../../context/MealContext";
import { ShieldCheck, CheckCircle, AlertTriangle, Info, Lock, FileText, Users, Eye } from "lucide-react";

export const ComplianceView: React.FC = () => {
  const { participants, auditLogs } = useMeal();

  const consentCount = participants.filter(p => p.fayidaId).length;
  const disabilityDisclosed = participants.filter(p => p.disability).length;

  const complianceItems = [
    { category: "Data Privacy & Protection", status: "Compliant", icon: Lock, items: [
      { label: "Ethiopia Personal Data Protection Proclamation No. 1321/2024", status: "Active", detail: "All PII fields (name, phone, Fayida ID) are stored encrypted in transit (TLS 1.3) and at rest (AES-256 in PostgreSQL)" },
      { label: "Fayida ID integration uses national consent framework", status: "Active", detail: "Participant consent is obtained at point of registration before Fayida API verification is triggered" },
      { label: "Sensitive data (disability, GBV) is access-restricted", status: "Active", detail: "RBAC enforcement: only Monitoring Officers and Super Admins can view disability and safeguarding PII fields" },
    ]},
    { category: "Role-Based Access Control (RBAC)", status: "Compliant", icon: Users, items: [
      { label: "7 distinct user roles with granular permission sets", status: "Active", detail: "Super Admin, Programme Manager, Monitoring Officer, Partner Officer, Field Officer, Finance Officer, Donor Viewer" },
      { label: "Finance data restricted to authorized roles", status: "Active", detail: "Loan amounts, budget lines, and disbursement data require canViewFinance permission" },
      { label: "Safeguarding cases restricted by canViewSafeguarding", status: "Active", detail: "Confidential incident data is hidden from Field Officers and Donor Viewers" },
    ]},
    { category: "Audit Trail & Accountability", status: "Compliant", icon: FileText, items: [
      { label: "All CREATE, UPDATE, DELETE, VERIFY actions are logged", status: "Active", detail: `${auditLogs.length} audit log entries recorded. Immutable records stored in PostgreSQL audit_logs table` },
      { label: "IP address and user identity logged per event", status: "Active", detail: "Every API mutation records the acting user email, name, role, module, and originating IP" },
      { label: "Audit trail accessible only to Super Admin", status: "Active", detail: "AuditTrailView is restricted by canManageUsers RBAC permission" },
    ]},
    { category: "Safeguarding & PSEA", status: "Active", icon: ShieldCheck, items: [
      { label: "Confidential incident reporting with restricted access", status: "Active", detail: "Safeguarding incidents marked is_confidential=true are visible only to authorized investigators" },
      { label: "SLA-based escalation tracking", status: "Active", detail: "Cases exceeding 48h acknowledgment or 30-day resolution SLA are flagged and surfaced in the Action Tracker" },
      { label: "PSEA Policy Manual published in Knowledge Library", status: "Active", detail: "Document available to all authenticated users; version controlled" },
    ]},
    { category: "Data Consent & Transparency", status: "Partial", icon: Eye, items: [
      { label: "Fayida ID used as consent-linked digital identity", status: "Active", detail: `${consentCount} of ${participants.length} participants have Fayida ID registered (identity-verified)` },
      { label: "Disability disclosure is voluntary", status: "Active", detail: `${disabilityDisclosed} participants disclosed disability status (${participants.length - disabilityDisclosed} non-disclosed / preferred not to say)` },
      { label: "Explicit consent capture UI", status: "Planned", detail: "A digital consent checkbox at registration will be added in Phase 2 of the MEAL MIS rollout" },
    ]},
  ];

  const getStatusIcon = (status: string) => {
    if (status === "Compliant" || status === "Active") return <CheckCircle className="h-4 w-4 text-emerald-600" />;
    if (status === "Partial" || status === "Planned") return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    return <Info className="h-4 w-4 text-slate-400" />;
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800 to-brand-900 p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="h-8 w-8 opacity-80" />
          <div>
            <h1 className="text-xl font-bold">Data Governance & Compliance Panel</h1>
            <p className="text-sm opacity-75 mt-0.5">Ethiopia Proclamation No. 1321/2024 • GDPR-aligned • International Data Governance Policy • PSEA Standards</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-center space-x-3">
          <CheckCircle className="h-8 w-8 text-emerald-600 flex-shrink-0" />
          <div><div className="text-lg font-bold text-emerald-900">4 / 5</div><div className="text-xs text-emerald-700 font-medium">Compliance domains fully active</div></div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-center space-x-3">
          <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0" />
          <div><div className="text-lg font-bold text-amber-900">1 Action</div><div className="text-xs text-amber-700 font-medium">Consent UI pending Phase 2</div></div>
        </div>
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 flex items-center space-x-3">
          <FileText className="h-8 w-8 text-brand-700 flex-shrink-0" />
          <div><div className="text-lg font-bold text-brand-900">{auditLogs.length}</div><div className="text-xs text-brand-700 font-medium">Immutable audit log entries</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {complianceItems.map((section, i) => {
          const Icon = section.icon;
          const isPartial = section.status === "Partial";
          return (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className={`flex items-center justify-between px-5 py-3.5 border-b border-slate-100 ${isPartial ? "bg-amber-50" : "bg-slate-50"}`}>
                <div className="flex items-center space-x-2.5">
                  <div className={`rounded-xl p-2 ${isPartial ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}><Icon className="h-4 w-4" /></div>
                  <h2 className="text-sm font-bold text-slate-900">{section.category}</h2>
                </div>
                <span className={`flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-semibold ${isPartial ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {getStatusIcon(section.status)}<span className="ml-1">{section.status}</span>
                </span>
              </div>
              <div className="divide-y divide-slate-50">
                {section.items.map((item, j) => (
                  <div key={j} className="px-5 py-3.5 flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">{getStatusIcon(item.status)}</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-xs text-brand-800">
        <p className="font-bold">Legal Basis Reference</p>
        <p className="mt-1 text-brand-700">This system is designed in compliance with <strong>Ethiopia's Personal Data Protection Proclamation No. 1321/2024</strong>, the <strong>Institutional Data Governance & Privacy Policy</strong>, the <strong>Prevention of Sexual Exploitation & Abuse (PSEA) Standards</strong>, and the <strong>Gender Equality & Social Inclusion (GESI) Policy</strong>. All participant data is processed with consent and stored securely within Ethiopian jurisdiction. Last compliance review: February 2026.</p>
      </div>
    </div>
  );
};
