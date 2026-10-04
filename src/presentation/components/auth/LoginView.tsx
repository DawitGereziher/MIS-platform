import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../core/domain/entities/User';
import { PlatformLogo } from '../common/PlatformLogo';
import { Eye, EyeOff, ArrowRight, UserPlus, LogIn, Building, MapPin, CheckCircle2, Shield } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@demo.meal.et');
  const [loginPassword, setLoginPassword] = useState('MealDemo@2026');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regRole, setRegRole] = useState<UserRole>('field_officer');
  const [regOrganization, setRegOrganization] = useState('Programme Management Directorate');
  const [regRegion, setRegRegion] = useState('Addis Ababa');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(loginEmail, loginPassword);
      if (!success) {
        setError('Invalid email or password. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: regName.trim(),
        email: regEmail.trim(),
        pass: regPassword,
        role: regRole,
        organization: regOrganization.trim(),
        region: regRegion,
      });
      setSuccessMessage('Account registered successfully! Redirecting...');
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 flex flex-col justify-center items-center p-4">
      {/* Container */}
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center flex flex-col items-center space-y-2">
          <PlatformLogo size="lg" showText={false} />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white font-display">
              NexusMEAL <span className="text-blue-400">MIS</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Digital Monitoring, Evaluation, Accountability & Learning Platform
            </p>
            <div className="mt-2 inline-flex items-center space-x-1.5 rounded-full bg-blue-900/40 px-3 py-1 text-[11px] font-semibold text-blue-300 border border-blue-700/50">
              <Shield className="h-3 w-3 text-blue-400" />
              <span>Youth Employment & Enterprise Development Programme • Enterprise Edition</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden text-slate-100">
          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/40 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setError('');
                setSuccessMessage('');
              }}
              className={`py-3.5 flex items-center justify-center space-x-2 transition ${
                activeTab === 'login'
                  ? 'border-b-2 border-blue-500 text-blue-400 bg-slate-900/60 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              <LogIn className="h-4 w-4" />
              <span>Officer Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setError('');
                setSuccessMessage('');
              }}
              className={`py-3.5 flex items-center justify-center space-x-2 transition ${
                activeTab === 'register'
                  ? 'border-b-2 border-blue-500 text-blue-400 bg-slate-900/60 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Register Account</span>
            </button>
          </div>

          <div className="p-6 space-y-5">
            {error && (
              <div className="rounded-lg bg-rose-950/60 p-3 text-xs text-rose-300 border border-rose-800 font-medium">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="rounded-lg bg-emerald-950/60 p-3 text-xs text-emerald-300 border border-emerald-800 font-medium flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* TAB 1: LOGIN */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="officer@demo.meal.et"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-medium text-slate-300">Password</label>
                    <span className="text-[11px] text-slate-400">
                      Standard demo: <strong className="text-amber-400 font-mono">MealDemo@2026</strong>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2.5 pr-10 text-white focus:border-blue-500 focus:outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0"
                    />
                    <span>Remember this device</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setError('Password resets are managed by the MEAL Super Administrator or PMU IT.')}
                    className="hover:text-blue-400 transition"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-brand-700 py-3 text-xs font-bold text-white shadow-lg shadow-blue-700/25 hover:from-blue-500 hover:to-brand-600 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="text-center pt-2 text-slate-400">
                  <span>Don't have an officer account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('register');
                      setError('');
                    }}
                    className="text-blue-400 font-semibold hover:underline"
                  >
                    Register here
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: REGISTER */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="Abebe Kebede"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="abebe.kebede@partner.org"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Assigned Role</label>
                    <select
                      value={regRole}
                      onChange={e => setRegRole(e.target.value as UserRole)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition"
                    >
                      <option value="field_officer">Field Officer (Woreda level)</option>
                      <option value="monitoring_officer">Monitoring & Evaluation Officer</option>
                      <option value="partner_officer">Partner Liaison Officer</option>
                      <option value="finance_officer">Finance & Grants Officer</option>
                      <option value="programme_manager">Programme Manager</option>
                      <option value="donor_viewer">Donor / Steering Committee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Region / Jurisdiction</label>
                    <select
                      value={regRegion}
                      onChange={e => setRegRegion(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition"
                    >
                      <option>Addis Ababa</option>
                      <option>Oromia</option>
                      <option>Amhara</option>
                      <option>Sidama</option>
                      <option>Somali</option>
                      <option>Tigray</option>
                      <option>Afar</option>
                      <option>Benishangul-Gumuz</option>
                      <option>Dire Dawa</option>
                      <option>South West Ethiopia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Implementing Organization</label>
                  <input
                    type="text"
                    required
                    value={regOrganization}
                    onChange={e => setRegOrganization(e.target.value)}
                    placeholder="e.g. Ministry Directorate, Regional Bureau, Partner Bank"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 pr-8 text-white focus:border-blue-500 focus:outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-2 top-2 text-slate-400 hover:text-slate-200"
                      >
                        {showRegPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={e => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-700/25 hover:from-emerald-500 hover:to-teal-600 transition flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>{loading ? 'Registering...' : 'Register & Enter Platform'}</span>
                </button>

                <div className="text-center pt-1 text-slate-400">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('login');
                      setError('');
                    }}
                    className="text-blue-400 font-semibold hover:underline"
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-400">
          Enterprise Digital Monitoring, Evaluation, Accountability & Learning Platform.
          <div className="mt-1 text-slate-500 text-[10px]">
            Federal Democratic Republic of Ethiopia • Proclamation No. 1321/2024 Compliant
          </div>
        </div>
      </div>
    </div>
  );
};
