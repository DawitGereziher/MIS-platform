import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Radio,
  Package,
  Venus,
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  GraduationCap,
  Handshake,
  DollarSign,
  Landmark,
  PiggyBank,
  Scale,
  MessageSquareHeart,
  ShieldAlert,
  ListTodo,
  Lightbulb,
  BookOpen,
  HelpCircle,
  CalendarDays,
  FileSpreadsheet,
  MapPin,
  GitCompare,
  WifiOff,
  Activity,
  FileCheck2,
  CalendarCheck,
  FileText,
  Settings,
  History,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
}

interface NavSection {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    requiredPermission?: 'canViewFinance' | 'canViewSafeguarding' | 'canManageUsers';
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Programme Data',
    items: [
      { id: 'participants', label: 'Participants', icon: Users },
      { id: 'employment', label: 'Employment outcomes', icon: Briefcase },
      { id: 'enterprises', label: 'Enterprises', icon: Building2 },
      { id: 'training', label: 'Training', icon: GraduationCap },
      { id: 'partnerships', label: 'Partnerships', icon: Handshake },
      { id: 'finance', label: 'Finance', icon: DollarSign, requiredPermission: 'canViewFinance' },
      { id: 'loans', label: 'Financial inclusion', icon: Landmark, requiredPermission: 'canViewFinance' },
      { id: 'savings', label: 'Savings groups', icon: PiggyBank },
      { id: 'governance', label: 'Governance', icon: Scale },
      { id: 'materials', label: 'Material Support', icon: Package },
      { id: 'women', label: 'Women Empowerment', icon: Venus },
    ],
  },
  {
    title: 'Accountability',
    items: [
      { id: 'feedback', label: 'Feedback', icon: MessageSquareHeart },
      { id: 'safeguarding', label: 'Safeguarding', icon: ShieldAlert, requiredPermission: 'canViewSafeguarding' },
      { id: 'actions', label: 'Action tracker', icon: ListTodo },
      { id: 'sbcc', label: 'SBCC Tracker', icon: Radio },
    ],
  },
  {
    title: 'Learning',
    items: [
      { id: 'learning', label: 'Lessons learned', icon: Lightbulb },
      { id: 'knowledge', label: 'Knowledge library', icon: BookOpen },
      { id: 'agenda', label: 'Learning agenda', icon: HelpCircle },
      { id: 'meetings', label: 'Reflection meetings', icon: CalendarDays },
    ],
  },
  {
    title: 'Evidence',
    items: [
      { id: 'surveys', label: 'Surveys', icon: FileSpreadsheet },
      { id: 'map', label: 'GIS map', icon: MapPin },
      { id: 'compare', label: 'Compare rounds', icon: GitCompare },
      { id: 'offline', label: 'Offline queue', icon: WifiOff },
    ],
  },
  {
    title: 'Insight',
    items: [
      { id: 'monitoring', label: 'Monitoring & KPIs', icon: Activity },
      { id: 'register', label: 'Indicator register', icon: FileCheck2 },
      { id: 'workplan', label: 'Workplan', icon: CalendarCheck },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'admin', label: 'Administration', icon: Settings, requiredPermission: 'canManageUsers' },
      { id: 'audit', label: 'Audit trail', icon: History, requiredPermission: 'canManageUsers' },
      { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onNavigate }) => {
  const { permissions } = useAuth();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-slate-50/60 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="py-4 px-3 space-y-6">
        {NAV_SECTIONS.map((section, idx) => {
          // Filter items based on user's active RBAC permissions
          const visibleItems = section.items.filter(item => {
            if (!item.requiredPermission) return true;
            return permissions[item.requiredPermission];
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {section.title}
              </h3>
              <div className="space-y-0.5">
                {visibleItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`flex w-full items-center space-x-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-brand-700 text-white shadow-sm font-semibold'
                          : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto p-3.5 border-t border-slate-200 bg-white text-[11px] text-slate-500 text-center">
        <span className="font-bold text-slate-800">NexusMEAL Enterprise MIS</span>
        <div className="text-[10px] text-brand-700 font-semibold mt-0.5">Enterprise MEAL Platform • v2.4.0</div>
      </div>
    </aside>
  );
};

