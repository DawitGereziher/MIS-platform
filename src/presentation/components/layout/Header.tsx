import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMeal } from '../../context/MealContext';
import { UserRole } from '../../../core/domain/entities/User';
import { PlatformLogo } from '../common/PlatformLogo';
import {
  Shield,
  UserCheck,
  RefreshCw,
  LogOut,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC<{ activeRoute: string; onNavigate: (route: string) => void }> = ({
  activeRoute,
  onNavigate,
}) => {
  const { currentUser, currentRole, switchRole, logout, allDemoUsers } = useAuth();
  const { offlineQueue, syncOfflineQueue } = useMeal();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const pendingSyncCount = offlineQueue.filter(q => q.deviceSyncStatus === 'Pending Sync').length;

  const handleSync = async () => {
    setSyncing(true);
    await syncOfflineQueue();
    setTimeout(() => setSyncing(false), 500);
  };

  const getRoleBadgeColor = (role?: UserRole | null) => {
    switch (role) {
      case 'super_admin':
        return 'bg-blue-50 text-blue-900 border-blue-300 ring-1 ring-blue-500/20';
      case 'programme_manager':
        return 'bg-indigo-50 text-indigo-900 border-indigo-300 ring-1 ring-indigo-500/20';
      case 'monitoring_officer':
        return 'bg-sky-50 text-sky-900 border-sky-300 ring-1 ring-sky-500/20';
      case 'partner_officer':
        return 'bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-500/20';
      case 'field_officer':
        return 'bg-teal-50 text-teal-900 border-teal-300 ring-1 ring-teal-500/20';
      case 'finance_officer':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-1 ring-emerald-500/20';
      case 'donor_viewer':
        return 'bg-slate-100 text-slate-800 border-slate-300 ring-1 ring-slate-400/20';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur transition-all sm:px-6 shadow-sm">
      {/* Left branding & custom logo */}
      <div className="flex items-center space-x-3">
        <PlatformLogo size="md" showText={true} />
      </div>

      {/* Center Backend Status & Proposal Spec Link */}
      <div className="hidden lg:flex items-center text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 space-x-2.5">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-slate-700">NestJS Core:</span>
        <a
          href="http://localhost:4000/api/docs"
          target="_blank"
          rel="noreferrer"
          className="text-brand-700 hover:text-brand-800 font-bold underline flex items-center space-x-1"
          title="Open interactive Swagger / OpenAPI specification"
        >
          <span>Swagger API (:4000)</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <span className="text-slate-300">|</span>
        <span className="text-slate-600 font-medium">Enterprise Edition • v2.4.0</span>
      </div>

      {/* Right Controls: Persona Switcher, Offline Sync & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Offline Queue Sync Indicator */}
        <button
          onClick={handleSync}
          disabled={syncing}
          className={`flex items-center space-x-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
            pendingSyncCount > 0
              ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
          title="Field Data Synchronization"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin text-brand-700' : 'text-slate-500'}`} />
          <span className="hidden sm:inline">Field Sync</span>
          {pendingSyncCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] text-white font-bold">
              {pendingSyncCount}
            </span>
          )}
        </button>

        {/* Persona Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className={`flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm transition hover:ring-2 hover:ring-brand-500/30 ${getRoleBadgeColor(
              currentRole
            )}`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span className="max-w-[130px] truncate">{currentUser?.roleLabel || 'Select Role'}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  System Personas (7 Roles)
                </p>
                <p className="text-xs text-slate-600">Password for all: MealDemo@2026</p>
              </div>
              <div className="mt-1 space-y-0.5 max-h-72 overflow-y-auto">
                {(Object.keys(allDemoUsers) as UserRole[]).map(roleKey => {
                  const u = allDemoUsers[roleKey];
                  const isSelected = currentRole === roleKey;
                  return (
                    <button
                      key={roleKey}
                      onClick={() => {
                        switchRole(roleKey);
                        setRoleDropdownOpen(false);
                      }}
                      className={`flex w-full items-start space-x-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition ${
                        isSelected ? 'bg-brand-50 font-medium text-brand-900 border border-brand-200' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <UserCheck
                        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          isSelected ? 'text-brand-700' : 'text-slate-400'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{u.roleLabel}</span>
                          {isSelected && (
                            <span className="text-[10px] text-brand-700 font-bold">Active</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{u.email}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User initials & Sign out */}
        <div className="flex items-center pl-2 border-l border-slate-200 space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-amber-300 shadow-sm border border-brand-700">
            {currentUser?.name.charAt(0) || 'U'}
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-slate-100"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
