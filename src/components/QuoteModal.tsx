import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Building2, 
  Home, 
  Briefcase, 
  UploadCloud, 
  CheckCircle2, 
  FileSpreadsheet, 
  Phone, 
  Mail, 
  MapPin, 
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { QuoteRequestForm } from '../types';
import { useToast } from '../context/ToastContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSector?: 'high-rise' | 'commercial' | 'residential';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialSector = 'high-rise',
}) => {
  const { success, info, error } = useToast();
  const [sector, setSector] = useState<'high-rise' | 'commercial' | 'residential'>(initialSector);
  const [formData, setFormData] = useState<QuoteRequestForm>({
    sector: initialSector,
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    projectAddress: '',
    openingCount: '',
    timeline: 'Immediate / Next 30 Days',
    notes: '',
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [onlineSending, setOnlineSending] = useState(false);
  const request = useRef<{ payload: string; id: string } | null>(null);
  useEffect(() => {
    if (isOpen) fetch('/api/quote-config').then(r => r.ok ? r.json() : { enabled: false }).then(c => setOnlineSending(c.enabled === true)).catch(() => setOnlineSending(false));
  }, [isOpen]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024 || !/\.(pdf|jpe?g|png|csv)$/i.test(file.name)) {
        setUploadedFile(null);
        e.target.value = '';
        error('File not attached', 'Choose a PDF, JPG, PNG or CSV up to 2 MB.');
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      error('Contact Info Required', 'Please enter your name and email address so we can forward your pricing.');
      return;
    }

    if (onlineSending) {
      setIsSubmitting(true);
      try {
        const content = uploadedFile ? await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(',')[1]);
          reader.onerror = () => reject(new Error('The attachment could not be read. Please select it again.'));
          reader.readAsDataURL(uploadedFile);
        }) : null;
        const payload = JSON.stringify({ ...formData, sector, attachments: content ? [{ filename: uploadedFile!.name, content }] : [] });
        if (!request.current || request.current.payload !== payload) request.current = { payload, id: crypto.randomUUID() };
        const response = await fetch('/api/submit-quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...JSON.parse(payload), requestId: request.current.id }) });
        const result = await response.json();
        if (!response.ok || result.success !== true || !result.reference) throw new Error(result.error || 'Sending could not be confirmed. Retry or email us directly.');
        setSubmittedQuoteId(result.reference);
      } catch (err) {
        error('Sending not confirmed', err instanceof Error ? err.message : 'Please retry or email us directly.');
      } finally { setIsSubmitting(false); }
      return;
    }

    const body = [
      'Just Doors project enquiry',
      ...Object.entries({ ...formData, sector }).map(([key, value]) => `${key}: ${value}`),
      '', 'Please attach any drawings, photos or schedules to this email before sending.'
    ].join('\n');
    window.location.href = `mailto:rambowallceiling@gmail.com?subject=${encodeURIComponent('Just Doors quote enquiry — ' + (formData.company || formData.name))}&body=${encodeURIComponent(body)}`;
    info('Send your enquiry from your email app', 'Review the draft, attach your files and press Send. Nothing has been submitted through this website.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close quote form"
          className="absolute top-6 right-6 p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedQuoteId ? (
          <div className="p-8 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Enquiry Accepted for Email Delivery
            </h3>
            <div className="font-mono text-sm text-amber-400 font-bold bg-neutral-950 border border-neutral-800 py-2 px-4 rounded-xl inline-block">
              Reference: {submittedQuoteId}
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your enquiry has been accepted by our email service. This confirms submission, not an appointment or delivery time. Call 778-773-2790 for urgent requests.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs hover:bg-amber-400"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <span>Tell us about your project</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Request a Project Quote
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Project pricing for fire doors, hollow metal, architectural wood, hardware packages, and complete high-rise door schedules.
              </p>
            </div>

            {/* Sector Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-neutral-950 rounded-2xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setSector('high-rise')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  sector === 'high-rise'
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Multi-Family / High-Rise</span>
              </button>

              <button
                type="button"
                onClick={() => setSector('commercial')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  sector === 'commercial'
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Commercial</span>
              </button>

              <button
                type="button"
                onClick={() => setSector('residential')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  sector === 'residential'
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Residential</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-medium text-neutral-300 mb-1">Your Full Name *</label>
                  <input id="quote-name"
                    type="text"
                    required
                    placeholder="e.g. Jordan Mitchell"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="quote-email" className="block text-xs font-medium text-neutral-300 mb-1">Email Address *</label>
                  <input id="quote-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-phone" className="block text-xs font-medium text-neutral-300 mb-1">Phone Number</label>
                  <input id="quote-phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="quote-company" className="block text-xs font-medium text-neutral-300 mb-1">Company / GC / Strata Council</label>
                  <input id="quote-company"
                    type="text"
                    placeholder="e.g. Skyline Developments Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-openingCount" className="block text-xs font-medium text-neutral-300 mb-1">Estimated Openings / Quantity</label>
                  <input id="quote-openingCount"
                    type="text"
                    placeholder="e.g. 120 Suite Doors or 1 Custom Entry"
                    value={formData.openingCount}
                    onChange={(e) => setFormData({ ...formData, openingCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="quote-timeline" className="block text-xs font-medium text-neutral-300 mb-1">Project Timeline / Required Date</label>
                  <select id="quote-timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="Immediate / Next 30 Days">Immediate (Next 30 Days)</option>
                    <option value="1 - 3 Months">1 - 3 Months</option>
                    <option value="3 - 6 Months (Bidding Phase)">3 - 6 Months (Bidding Phase)</option>
                    <option value="Budgeting & Planning">Budgeting & Planning</option>
                  </select>
                </div>
              </div>

              {onlineSending && <div><label htmlFor="quote-attachment" className="block text-sm mb-2">Drawing, photo or schedule (PDF, JPG, PNG or CSV; maximum 2 MB)</label><input id="quote-attachment" type="file" accept=".pdf,.jpg,.jpeg,.png,.csv" onChange={handleFileUpload} className="block w-full text-sm" />{uploadedFile && <p className="text-xs mt-2">Selected: {uploadedFile.name}</p>}</div>}
              {!onlineSending && <p className="text-sm text-neutral-300">Your email app will open with the project details. Attach drawings or schedules there and press Send. If it does not open, email <a className="text-amber-400 underline" href="mailto:rambowallceiling@gmail.com">rambowallceiling@gmail.com</a> or call <a className="text-amber-400" href="tel:7787732790">778-773-2790</a>.</p>}

              <div>
                <label htmlFor="quote-notes" className="block text-xs font-medium text-neutral-300 mb-1">Project Notes / Fire & Hardware Specs</label>
                <textarea id="quote-notes"
                  rows={3}
                  placeholder="Describe your fire rating requirements (e.g. 20-min positive pressure), STC acoustics, hardware finish, or delivery sequence..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-base sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Review before sending</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>{onlineSending ? 'Send Quote Enquiry' : 'Open Email Draft'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
};
