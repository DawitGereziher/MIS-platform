export type UserRole =
  | 'super_admin'
  | 'programme_manager'
  | 'monitoring_officer'
  | 'partner_officer'
  | 'field_officer'
  | 'finance_officer'
  | 'donor_viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  organization: string;
  region?: string;
  avatarUrl?: string;
}

export interface RolePermission {
  canViewFinance: boolean;
  canEditFinance: boolean;
  canManageUsers: boolean;
  canRegisterParticipants: boolean;
  canEditParticipants: boolean;
  canViewSafeguarding: boolean;
  canManageSafeguarding: boolean;
  canManageSurveys: boolean;
  canViewReports: boolean;
  canExportData: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermission> = {
  super_admin: {
    canViewFinance: true,
    canEditFinance: true,
    canManageUsers: true,
    canRegisterParticipants: true,
    canEditParticipants: true,
    canViewSafeguarding: true,
    canManageSafeguarding: true,
    canManageSurveys: true,
    canViewReports: true,
    canExportData: true,
  },
  programme_manager: {
    canViewFinance: true,
    canEditFinance: false,
    canManageUsers: false,
    canRegisterParticipants: true,
    canEditParticipants: true,
    canViewSafeguarding: true,
    canManageSafeguarding: true,
    canManageSurveys: true,
    canViewReports: true,
    canExportData: true,
  },
  monitoring_officer: {
    canViewFinance: true,
    canEditFinance: false,
    canManageUsers: false,
    canRegisterParticipants: true,
    canEditParticipants: true,
    canViewSafeguarding: false,
    canManageSafeguarding: false,
    canManageSurveys: true,
    canViewReports: true,
    canExportData: true,
  },
  partner_officer: {
    canViewFinance: false,
    canEditFinance: false,
    canManageUsers: false,
    canRegisterParticipants: true,
    canEditParticipants: false,
    canViewSafeguarding: false,
    canManageSafeguarding: false,
    canManageSurveys: false,
    canViewReports: true,
    canExportData: false,
  },
  field_officer: {
    canViewFinance: false,
    canEditFinance: false,
    canManageUsers: false,
    canRegisterParticipants: true,
    canEditParticipants: true,
    canViewSafeguarding: false,
    canManageSafeguarding: false,
    canManageSurveys: true,
    canViewReports: false,
    canExportData: false,
  },
  finance_officer: {
    canViewFinance: true,
    canEditFinance: true,
    canManageUsers: false,
    canRegisterParticipants: false,
    canEditParticipants: false,
    canViewSafeguarding: false,
    canManageSafeguarding: false,
    canManageSurveys: false,
    canViewReports: true,
    canExportData: true,
  },
  donor_viewer: {
    canViewFinance: true,
    canEditFinance: false,
    canManageUsers: false,
    canRegisterParticipants: false,
    canEditParticipants: false,
    canViewSafeguarding: false,
    canManageSafeguarding: false,
    canManageSurveys: false,
    canViewReports: true,
    canExportData: true,
  },
};

export const DEMO_USERS: Record<UserRole, User> = {
  super_admin: {
    id: 'u-1',
    name: 'Sami A. (Super Admin)',
    email: 'admin@demo.meal.et',
    role: 'super_admin',
    roleLabel: 'Super Admin',
    organization: 'Programme Management Directorate',
  },
  programme_manager: {
    id: 'u-2',
    name: 'Almaz Tadesse',
    email: 'programme_manager@demo.meal.et',
    role: 'programme_manager',
    roleLabel: 'Programme Manager',
    organization: 'Programme Management Directorate',
  },
  monitoring_officer: {
    id: 'u-3',
    name: 'Dawit Bekele',
    email: 'monitoring_officer@demo.meal.et',
    role: 'monitoring_officer',
    roleLabel: 'Monitoring Officer',
    organization: 'MEAL Unit Addis Ababa',
  },
  partner_officer: {
    id: 'u-4',
    name: 'Helen Haile',
    email: 'partner_officer@demo.meal.et',
    role: 'partner_officer',
    roleLabel: 'Partner Officer',
    organization: 'Implementing Partner Liaison',
  },
  field_officer: {
    id: 'u-5',
    name: 'Yared Getachew',
    email: 'field_officer@demo.meal.et',
    role: 'field_officer',
    roleLabel: 'Field Officer',
    organization: 'Oromia Regional Field Unit',
    region: 'Oromia',
  },
  finance_officer: {
    id: 'u-6',
    name: 'Bethlehem Alemu',
    email: 'finance_officer@demo.meal.et',
    role: 'finance_officer',
    roleLabel: 'Finance Officer',
    organization: 'Finance & Grants Operations',
  },
  donor_viewer: {
    id: 'u-7',
    name: 'Donor Representative',
    email: 'donor_viewer@demo.meal.et',
    role: 'donor_viewer',
    roleLabel: 'Donor Viewer',
    organization: 'Donor Delegation',
  },
};
