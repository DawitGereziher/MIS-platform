import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, DEMO_USERS, ROLE_PERMISSIONS, RolePermission } from '../../core/domain/entities/User';
import { defaultRepository as mealRepository } from '../../infrastructure/repositories/HttpApiRepository';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole | null;
  permissions: RolePermission;
  switchRole: (role: UserRole) => void;
  login: (email: string, pass: string) => Promise<boolean> | boolean;
  register: (data: { name: string; email: string; pass: string; role?: UserRole; organization?: string; region?: string }) => Promise<User>;
  logout: () => void;
  allDemoUsers: Record<UserRole, User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexus_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn(e);
      }
    }
    return null;
  });

  const currentRole = currentUser?.role || null;
  const permissions = currentRole ? ROLE_PERMISSIONS[currentRole] : ROLE_PERMISSIONS.donor_viewer;

  const switchRole = (role: UserRole) => {
    const targetUser = DEMO_USERS[role];
    if (targetUser) {
      setCurrentUser(targetUser);
      localStorage.setItem('nexus_current_user', JSON.stringify(targetUser));
      mealRepository.logAudit('LOGIN', 'Auth', `Switched active role to ${targetUser.roleLabel}`, targetUser);
    }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    const result = await mealRepository.login(cleanEmail, pass);
    if (result && result.user) {
      setCurrentUser(result.user);
      localStorage.setItem('nexus_current_user', JSON.stringify(result.user));
      if (result.accessToken) {
        localStorage.setItem('nexus_access_token', result.accessToken);
      }
      await mealRepository.logAudit('LOGIN', 'Auth', `User authenticated: ${result.user.email} (${result.user.roleLabel})`, result.user);
      return true;
    }
    return false;
  };

  const register = async (data: { name: string; email: string; pass: string; role?: UserRole; organization?: string; region?: string }): Promise<User> => {
    const newUser = await mealRepository.registerUser(data);
    setCurrentUser(newUser);
    localStorage.setItem('nexus_current_user', JSON.stringify(newUser));
    await mealRepository.logAudit('CREATE', 'Auth', `New stakeholder registered: ${newUser.name} (${newUser.roleLabel})`, newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('nexus_current_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        permissions,
        switchRole,
        login,
        register,
        logout,
        allDemoUsers: DEMO_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
