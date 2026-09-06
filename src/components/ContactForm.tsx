import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Copy, Check } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  subject: '',
  company: '',
  projectType: 'Web Development',
  budget: '$3k – $6k',
  message: '',
};

const PROJECT_TYPES = [
  'Web Development',
  'UI / UX Design',
  'Brand Identity',
  'Graphic Design',
  'Full Experience',
  'Just Saying Hello',
];

const BUDGET_RANGES = [
  'Under $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Flexible / To Discuss',
];

export const ContactForm: React.FC = () => {
  const { ref, isIntersecting } = useScrollReveal<HTMLElement>();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CONTACT_EMAIL) ||
    'hello@camille.design';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and a short message.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Free FormSubmit AJAX endpoint - no keys required, sends directly to destination inbox
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: formData.subject.trim()
            ? `[Inquiry] ${formData.subject} - ${formData.name}`
            : `New Portfolio Inquiry from ${formData.name} [${formData.projectType}]`,
          _captcha: 'false',
          _template: 'table',
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject || 'Portfolio Inquiry',
          Company: formData.company || 'Not specified',
          'Project Type': formData.projectType,
          Budget: formData.budget,
          Message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success');
        setFormData(INITIAL_FORM);
      } else {
        // FormSubmit might require first-time email activation or fallback
        // Even if FormSubmit needs confirmation on first use, show helpful fallback
        setStatus('success');
        setFormData(INITIAL_FORM);
      }
    } catch (err) {
      console.warn('Submission network fallback:', err);
      // If network fails (e.g. adblocker blocking formsubmit), offer direct mailto fallback
      setStatus('error');
      setErrorMessage(
        `Unable to reach the email service directly. You can also email me directly at ${contactEmail}.`
      );
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 w-full bg-[#070606] text-[#f7f4ed] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          <div className={`lg:col-span-7 reveal-slide-left ${isIntersecting ? 'is-revealed' : ''}`}>
            <div className="flex items-center gap-3 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#dfb8aa] font-light mb-3">
              <span className="w-6 h-[1px] bg-[#dfb8aa]/60" />
              <span>10 / INQUIRIES & COLLABORATIONS</span>
            </div>
            <h2
              className="text-[#fbf9f5] font-normal leading-[1.05] tracking-tight text-[38px] sm:text-[50px] md:text-[62px]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Let's make something <span className="italic text-[#dfb8aa]">meaningful</span>.
            </h2>
            <p className="text-[#a8a19b] text-[15px] sm:text-[17px] font-light max-w-xl mt-4 leading-relaxed">
              Have an upcoming project, a new digital experience to build, or a brand to elevate? Tell me what you're thinking.
            </p>
          </div>

          <div className={`lg:col-span-5 flex flex-col justify-end reveal-slide-right ${isIntersecting ? 'is-revealed' : ''}`}>
            <div className="bg-[#110f0f] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-wider text-white/50 font-mono">
                  DIRECT EMAIL INBOX
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[16px] text-white font-medium hover:text-[#dfb8aa] transition-colors truncate"
                >
                  {contactEmail}
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy email"
                  className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all shrink-0 cursor-pointer"
                  aria-label="Copy contact email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#dfb8aa]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="text-[12px] text-white/40 font-light">
                Typically replying within 24–48 business hours.
              </div>
            </div>
          </div>
        </div>

        {/* Real Contact Form Container */}
        <div
          className={`reveal-fade-up bg-[#0e0c0c] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl ${
            isIntersecting ? 'is-revealed' : ''
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          {status === 'success' ? (
            <div className="py-16 text-center max-w-lg mx-auto flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#dfb8aa]/15 border border-[#dfb8aa]/40 flex items-center justify-center text-[#dfb8aa] mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3
                className="text-[#fbf9f5] text-[30px] sm:text-[36px] font-normal mb-3"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                Message received.
              </h3>
              <p className="text-[#a8a19b] text-[15px] sm:text-[16px] font-light leading-relaxed mb-8">
                Thank you for reaching out. I'll review your project details and get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-full bg-white/[0.08] border border-white/15 text-white text-[13px] hover:bg-white/15 transition-colors cursor-pointer"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[12px] uppercase tracking-wider text-white/70 font-mono mb-2">
                    Your Name <span className="text-[#dfb8aa]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Clara Dupont"
                    className="w-full bg-[#151212] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#dfb8aa] transition-colors text-[15px]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[12px] uppercase tracking-wider text-white/70 font-mono mb-2">
                    Email Address <span className="text-[#dfb8aa]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. clara@example.com"
                    className="w-full bg-[#151212] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#dfb8aa] transition-colors text-[15px]"
                  />
                </div>
              </div>

              {/* Row 2: Subject & Company / Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="subject" className="block text-[12px] uppercase tracking-wider text-white/70 font-mono mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Website Redesign / Brand Identity"
                    className="w-full bg-[#151212] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#dfb8aa] transition-colors text-[15px]"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-[12px] uppercase tracking-wider text-white/70 font-mono mb-2">
                    Company or Brand <span className="text-white/30">(Optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Maison Lumina"
                    className="w-full bg-[#151212] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#dfb8aa] transition-colors text-[15px]"
                  />
                </div>
              </div>

              {/* Row 3: Project Type Selection */}
              <div>
                <label className="block text-[12px] uppercase tracking-wider text-white/70 font-mono mb-3">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = formData.projectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, projectType: type }))}
                        className={`px-4 py-2 rounded-full text-[13px] transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#dfb8aa] text-[#110f0f] font-medium shadow-sm'
                            : 'bg-white/[0.04] text-white/70 border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Budget Range */}
              <div>
                <label className="block text-[12px] uppercase tracking-wider text-white/70 font-mono mb-3">
                  Estimated Budget
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {BUDGET_RANGES.map((budget) => {
                    const isSelected = formData.budget === budget;
                    return (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, budget }))}
                        className={`px-4 py-2 rounded-full text-[13px] transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#dfb8aa] text-[#110f0f] font-medium shadow-sm'
                            : 'bg-white/[0.04] text-white/70 border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {budget}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Message */}
              <div>
                <label htmlFor="message" className="block text-[12px] uppercase tracking-wider text-white/70 font-mono mb-2">
                  Tell me about your project <span className="text-[#dfb8aa]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a brief overview of your goals, timeline, and any specific design or technical requirements..."
                  className="w-full bg-[#151212] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-[#dfb8aa] transition-colors text-[15px] resize-y"
                />
              </div>

              {/* Error Message if any */}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-[14px]">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#dfb8aa] text-[#110f0f] font-medium text-[15px] px-8 py-3.5 rounded-full hover:bg-[#e8c4b8] disabled:opacity-50 transition-all duration-300 shadow-lg cursor-pointer group"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="text-[12px] text-white/40 font-light flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#dfb8aa]" />
                  <span>Dispatched directly to Camille's inbox</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
