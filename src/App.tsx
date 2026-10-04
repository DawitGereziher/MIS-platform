import React from 'react';
import { AuthProvider, useAuth } from './presentation/context/AuthContext';
import { MealProvider } from './presentation/context/MealContext';
import { AppShell } from './presentation/components/layout/AppShell';
import { LoginView } from './presentation/components/auth/LoginView';

const MainContent: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <MealProvider>
      <AppShell />
    </MealProvider>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
