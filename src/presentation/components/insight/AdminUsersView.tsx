import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole, ROLE_PERMISSIONS } from '../../../core/domain/entities/User';
import { Shield, Check, X, Key } from 'lucide-react';

export const AdminUsersView: React.FC = () => {
  const { allDemoUsers, switchRole, currentRole } = useAuth();

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          User Management & Role-Based Access Control (RBAC)
        </h1>
        <p className="text-xs text-slate-500">
          Configured administrative and field roles for NexusMEAL MIS demonstration
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Pre-Configured System Personas (7 Roles)</h2>
            <p className="text-xs text-slate-500">Universal demo password: <code className="font-bold text-brand-800">MealDemo@2026</code></p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Officer Name</th>
                <th className="py-3 px-4">Login Email</th>
                <th className="py-3 px-4">Organization / Department</th>
                <th className="py-3 px-4 text-right">Demo Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(Object.keys(allDemoUsers) as UserRole[]).map(roleKey => {
                const user = allDemoUsers[roleKey];
                const isCurrent = currentRole === roleKey;

                return (
                  <tr key={roleKey} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-brand-700" />
                      <span>{user.roleLabel}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{user.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{user.email}</td>
                    <td className="py-3 px-4 text-slate-500">{user.organization}</td>
                    <td className="py-3 px-4 text-right">
                      {isCurrent ? (
                        <span className="rounded bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-800 border border-brand-200">
                          Active Persona
                        </span>
                      ) : (
                        <button
                          onClick={() => switchRole(roleKey)}
                          className="rounded bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition"
                        >
                          Switch to Role
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-3">RBAC Security Permission Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border border-slate-200">
            <thead className="bg-slate-50 font-semibold border-b border-slate-200 text-slate-700">
              <tr>
                <th className="text-left py-2.5 px-3">Role</th>
                <th className="py-2.5 px-2">Register Youth</th>
                <th className="py-2.5 px-2">Edit Participants</th>
                <th className="py-2.5 px-2">View Finance</th>
                <th className="py-2.5 px-2">Edit Finance</th>
                <th className="py-2.5 px-2">Safeguarding Log</th>
                <th className="py-2.5 px-2">Manage Users</th>
                <th className="py-2.5 px-2">Export Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(Object.keys(ROLE_PERMISSIONS) as UserRole[]).map(roleKey => {
                const p = ROLE_PERMISSIONS[roleKey];
                return (
                  <tr key={roleKey} className="hover:bg-slate-50">
                    <td className="text-left py-2.5 px-3 font-semibold text-slate-800">
                      {allDemoUsers[roleKey].roleLabel}
                    </td>
                    <td className="py-2.5 px-2">
                      {p.canRegisterParticipants ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                    </td>
                    <td className="py-2.5 px-2">
                      {p.canEditParticipants ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                    </td>
                    <td className="py-2.5 px-2">
                      {p.canViewFinance ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                    </td>
                    <td className="py-2.5 px-2">
                      {p.canEditFinance ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                    </td>
                    <td className="py-2.5 px-2">
                      {p.canViewSafeguarding ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                    </td>
                    <td className="py-2.5 px-2">
                      {p.canManageUsers ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                    </td>
                    <td className="py-2.5 px-2">
                      {p.canExportData ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
