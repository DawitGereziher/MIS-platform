import React, { useState } from 'react';
import { useMeal } from '../../context/MealContext';
import { FeedbackTicket } from '../../../core/domain/entities/Accountability';
import { MessageSquareHeart, PhoneCall, MessageSquare, MapPin, CheckCircle2, Clock, Plus, X } from 'lucide-react';

export const FeedbackCrmView: React.FC = () => {
  const { feedback, addFeedbackTicket, resolveFeedbackTicket } = useMeal();
  const [selectedTicket, setSelectedTicket] = useState<FeedbackTicket | null>(null);
  const [resolutionText, setResolutionText] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New ticket form
  const [channel, setChannel] = useState<FeedbackTicket['channel']>('Toll-Free Hotline (8080)');
  const [category, setCategory] = useState<FeedbackTicket['category']>('Service Quality');
  const [senderName, setSenderName] = useState('');
  const [phoneOrContact, setPhoneOrContact] = useState('');
  const [region, setRegion] = useState('Oromia');
  const [message, setMessage] = useState('');

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !resolutionText.trim()) return;
    await resolveFeedbackTicket(selectedTicket.id, resolutionText.trim());
    setSelectedTicket(null);
    setResolutionText('');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addFeedbackTicket({
      ticketNumber: `FB-2026-${Math.floor(100 + Math.random() * 900)}`,
      channel,
      category,
      senderName: senderName.trim() || 'Anonymous Community Member',
      isAnonymous: !senderName.trim(),
      phoneOrContact: phoneOrContact.trim() || undefined,
      region,
      dateReceived: new Date().toISOString().split('T')[0],
      message: message.trim(),
      status: 'New',
      slaBreach: false,
    });

    setIsNewModalOpen(false);
    setMessage('');
    setSenderName('');
  };

  return (
    <div className="space-y-5 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Accountability & Feedback CRM
          </h1>
          <p className="text-xs text-slate-500">
            Multi-channel citizen complaints, suggestions, and inquiry resolution tracking
          </p>
        </div>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center space-x-2 rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Log Feedback Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {feedback.map(ticket => (
          <div
            key={ticket.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-500"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-500">{ticket.ticketNumber}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    ticket.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                      : ticket.status === 'Response Dispatched'
                      ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20'
                      : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <div className="mt-2 text-xs font-semibold text-slate-900">{ticket.category}</div>
              <p className="mt-1 text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                "{ticket.message}"
              </p>

              <div className="mt-3 space-y-1 text-[11px] text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400">Channel:</span>
                  <span className="font-medium text-slate-700">{ticket.channel}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400">Sender:</span>
                  <span className="font-medium text-slate-700">
                    {ticket.senderName} ({ticket.region})
                  </span>
                </div>
              </div>

              {ticket.resolutionSummary && (
                <div className="mt-3 rounded-lg bg-emerald-50/70 p-2.5 text-[11px] text-emerald-900 border border-emerald-100">
                  <strong>Resolution:</strong> {ticket.resolutionSummary}
                </div>
              )}
            </div>

            {ticket.status !== 'Resolved' && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="rounded bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-brand-100"
                >
                  Resolve & Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resolution Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Resolve Feedback Ticket</h3>
            <p className="text-xs text-slate-500 mt-0.5">{selectedTicket.ticketNumber} • {selectedTicket.senderName}</p>

            <form onSubmit={handleResolve} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Official Resolution / Response Note *</label>
                <textarea
                  required
                  rows={4}
                  value={resolutionText}
                  onChange={e => setResolutionText(e.target.value)}
                  placeholder="Explain actions taken to address community concern or SMS dispatched..."
                  className="w-full rounded-lg border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-brand-800"
                >
                  Mark Resolved
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Ticket Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Log Community Feedback / Complaint</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Channel</label>
                  <select
                    value={channel}
                    onChange={e => setChannel(e.target.value as FeedbackTicket['channel'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Toll-Free Hotline (8080)">Toll-Free Hotline (8080)</option>
                    <option value="SMS Gateway">SMS Gateway</option>
                    <option value="Field Helpdesk / Box">Field Helpdesk / Box</option>
                    <option value="Community Meeting">Community Meeting</option>
                    <option value="Web Portal">Web Portal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as FeedbackTicket['category'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Service Quality">Service Quality</option>
                    <option value="Selection Transparency">Selection Transparency</option>
                    <option value="Staff Conduct">Staff Conduct</option>
                    <option value="Payment Delay">Payment Delay</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Sender Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Leave blank for Anonymous"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={phoneOrContact}
                    onChange={e => setPhoneOrContact(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Message / Detail *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Details of complaint or inquiry..."
                  className="w-full rounded-lg border border-slate-200 p-2.5 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-brand-800"
                >
                  Save Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
