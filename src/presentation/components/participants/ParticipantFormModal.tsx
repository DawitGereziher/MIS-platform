import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { Participant } from '../../../core/domain/entities/Participant';
import { FayidaNationalIdService } from '../../../infrastructure/integrations/FayidaService';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

interface ParticipantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParticipantFormModal: React.FC<ParticipantFormModalProps> = ({ isOpen, onClose }) => {
  const { addParticipant } = useMeal();

  const [fullName, setFullName] = useState('');
  const [fayidaId, setFayidaId] = useState('ET-FAY-' + Math.floor(10000000 + Math.random() * 90000000));
  const [phone, setPhone] = useState('+251 9');
  const [sex, setSex] = useState<'Female' | 'Male'>('Female');
  const [age, setAge] = useState<number>(22);
  const [education, setEducation] = useState<Participant['education']>('TVET Graduate');
  const [region, setRegion] = useState('Oromia');
  const [woreda, setWoreda] = useState('Bishoftu');
  const [kebele, setKebele] = useState('Kebele 01');
  const [disability, setDisability] = useState(false);
  const [disabilityType, setDisabilityType] = useState('');
  const [cohort, setCohort] = useState('Cohort 1 - Agro-processing');
  const [status, setStatus] = useState<Participant['status']>('Enrolled');

  // Fayida verification state
  const [isVerifyingFayida, setIsVerifyingFayida] = useState(false);
  const [fayidaVerified, setFayidaVerified] = useState<boolean | null>(null);
  const [fayidaMessage, setFayidaMessage] = useState('');

  if (!isOpen) return null;

  const handleVerifyFayida = async () => {
    setIsVerifyingFayida(true);
    try {
      const res = await FayidaNationalIdService.verifyId(fayidaId);
      setFayidaVerified(res.verified);
      setFayidaMessage(res.statusMessage);
    } catch (e) {
      setFayidaVerified(false);
      setFayidaMessage('Failed to connect to Fayida gateway.');
    } finally {
      setIsVerifyingFayida(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    await addParticipant({
      fullName: fullName.trim(),
      fayidaId: fayidaId.trim(),
      phone: phone.trim(),
      sex,
      age: Number(age),
      education,
      region,
      woreda: woreda.trim(),
      kebele: kebele.trim(),
      disability,
      disabilityType: disability ? disabilityType : undefined,
      status,
      cohort,
      registrationDate: new Date().toISOString().split('T')[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Register New Programme Participant</h2>
            <p className="text-xs text-slate-500">Youth Beneficiary Onboarding with National ID (Fayida) Integration</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Fayida ID Section with Verify Simulator */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-3">
            <label className="block font-semibold text-teal-950 mb-1">
              Fayida National Digital ID (National Verification):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={fayidaId}
                onChange={e => {
                  setFayidaId(e.target.value);
                  setFayidaVerified(null);
                }}
                placeholder="e.g. ET-FAY-12345678"
                className="flex-1 rounded-lg border border-teal-300 bg-white px-3 py-1.5 font-mono text-xs font-semibold text-slate-800 focus:border-brand-600 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={handleVerifyFayida}
                disabled={isVerifyingFayida}
                className="flex items-center space-x-1.5 rounded-lg bg-brand-700 px-3 py-1.5 font-semibold text-white hover:bg-brand-800 disabled:opacity-50"
              >
                {isVerifyingFayida ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verify ID</span>
                  </>
                )}
              </button>
            </div>

            {fayidaVerified !== null && (
              <div
                className={`mt-2 flex items-center space-x-1.5 text-[11px] ${
                  fayidaVerified ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {fayidaVerified ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
                )}
                <span>{fayidaMessage}</span>
              </div>
            )}
          </div>

          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Bethlehem Girma"
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sex, Age, Education */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Gender *</label>
              <select
                value={sex}
                onChange={e => setSex(e.target.value as 'Female' | 'Male')}
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 focus:border-brand-500 focus:outline-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Age *</label>
              <input
                type="number"
                min={18}
                max={35}
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Education Level</label>
              <select
                value={education}
                onChange={e => setEducation(e.target.value as Participant['education'])}
                className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
              >
                <option value="None">None</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="TVET Graduate">TVET Graduate</option>
                <option value="University Degree">University Degree</option>
              </select>
            </div>
          </div>

          {/* Region, Woreda, Kebele */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Region *</label>
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
              >
                <option value="Oromia">Oromia</option>
                <option value="Amhara">Amhara</option>
                <option value="Sidama">Sidama</option>
                <option value="Somali">Somali</option>
                <option value="Central Ethiopia">Central Ethiopia</option>
                <option value="Addis Ababa">Addis Ababa</option>
                <option value="Tigray">Tigray</option>
                <option value="Dire Dawa">Dire Dawa</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Woreda *</label>
              <input
                type="text"
                required
                value={woreda}
                onChange={e => setWoreda(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Kebele</label>
              <input
                type="text"
                value={kebele}
                onChange={e => setKebele(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Disability Toggle */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800">Disability / Social Inclusion Support</span>
                <p className="text-[11px] text-slate-500">Enable if beneficiary requires tailored accommodation</p>
              </div>
              <input
                type="checkbox"
                checked={disability}
                onChange={e => setDisability(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </div>
            {disability && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Specify type (e.g. Mobility, Hearing, Visual, Cognitive)"
                  value={disabilityType}
                  onChange={e => setDisabilityType(e.target.value)}
                  className="w-full rounded border border-slate-200 bg-white px-3 py-1 text-xs focus:border-brand-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Cohort & Initial Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Assigned Cohort / Track</label>
              <select
                value={cohort}
                onChange={e => setCohort(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
              >
                <option value="Cohort 1 - Agro-processing">Cohort 1 - Agro-processing</option>
                <option value="Cohort 2 - Metal & Woodworking">Cohort 2 - Metal & Woodworking</option>
                <option value="Cohort 3 - Garment & Apparel">Cohort 3 - Garment & Apparel</option>
                <option value="Cohort 4 - Digital Freelancing">Cohort 4 - Digital Freelancing</option>
                <option value="Cohort 5 - Renewable Energy Assembly">Cohort 5 - Renewable Energy</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Initial Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as Participant['status'])}
                className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
              >
                <option value="Enrolled">Enrolled</option>
                <option value="In Training">In Training</option>
                <option value="Employed">Employed (Wage)</option>
                <option value="Self-Employed">Self-Employed</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand-700 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800"
            >
              Save & Register Participant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
