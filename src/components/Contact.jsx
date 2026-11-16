import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  BriefcaseBusiness,
  GitBranch,
  Send,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_TARGET_EMAIL = import.meta.env.VITE_TO_EMAIL || PERSONAL_INFO.email;
const IS_EMAILJS_READY = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

export default function Contact({ isDark }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    type: 'idle',
    message: '',
    mailtoUrl: ''
  });
  const [copiedKey, setCopiedKey] = useState(null);

  const copyText = (key, text) => {
    try {
      navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Please enter a subject (at least 3 characters).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please enter a message with at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildEncodedMailtoUrl = () => {
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanSubject = formData.subject.trim();
    const cleanMessage = formData.message.trim();

    const emailBody = [
      `Hello Rahul,`,
      ``,
      `You have received a new portfolio inquiry:`,
      `----------------------------------------`,
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Subject: ${cleanSubject}`,
      `----------------------------------------`,
      ``,
      `Message:`,
      cleanMessage,
      ``,
      `----------------------------------------`,
      `Sent from Rahul Vishwakarma's Portfolio Website`
    ].join('\r\n');

    return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `[Portfolio Contact] ${cleanSubject} — from ${cleanName}`
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'idle', message: '', mailtoUrl: '' });

    if (!validateForm()) {
      setFormStatus({
        type: 'error',
        message: 'Please fix the highlighted fields above before opening your email client.',
        mailtoUrl: ''
      });
      return;
    }

    const mailtoUrl = buildEncodedMailtoUrl();

    try {
      if (IS_EMAILJS_READY) {
        const templateParams = {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          to_email: EMAILJS_TARGET_EMAIL,
          to_name: 'Rahul Vishwakarma'
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          { publicKey: EMAILJS_PUBLIC_KEY }
        );

        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormStatus({
          type: 'success',
          message: `Your message has been sent successfully to ${EMAILJS_TARGET_EMAIL}.`,
          mailtoUrl: ''
        });
        return;
      }

      const link = document.createElement('a');
      link.href = mailtoUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setFormStatus({
        type: 'info',
        message: `Opening your default email application pre-addressed to ${PERSONAL_INFO.email}. Please click "Send" inside your email app to complete delivery. If no email application is configured on your device, use the buttons below to copy the pre-filled email or address.`,
        mailtoUrl
      });
    } catch (error) {
      console.error('Contact form submission failed:', error);

      try {
        const link = document.createElement('a');
        link.href = mailtoUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        window.location.href = mailtoUrl;
      }

      setFormStatus({
        type: 'info',
        message: `The direct email app fallback was opened. Please send the message from your email client to complete delivery to ${PERSONAL_INFO.email}.`,
        mailtoUrl
      });
    }
  };

  return (
    <section id="contact" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
          <Mail className="w-4 h-4" />
          <span>06 / Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Let&apos;s Connect for Opportunities & Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div
            className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${isDark
              ? 'bg-slate-900/60 border-slate-800/90'
              : 'bg-white border-slate-200 shadow-sm'
              }`}
          >
            <div>
              <h3 className="text-xl font-bold mb-2">Direct Contact Channels</h3>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Reach out directly via email, phone, LinkedIn, or GitHub.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-400">EMAIL</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-semibold hover:text-cyan-400 break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => copyText('email', PERSONAL_INFO.email)}
                  className="p-2 rounded-lg border border-slate-700 hover:border-cyan-500/40 text-xs"
                  title="Copy Email"
                >
                  {copiedKey === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-400">PHONE</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm font-semibold hover:text-cyan-400"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => copyText('phone', PERSONAL_INFO.phone)}
                  className="p-2 rounded-lg border border-slate-700 hover:border-cyan-500/40 text-xs"
                  title="Copy Phone"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <BriefcaseBusiness className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-slate-400">LINKEDIN</div>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-cyan-400 hover:underline break-all"
                  >
                    linkedin.com/in/rahulvishwakarma78
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-slate-400">GITHUB</div>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-cyan-400 hover:underline break-all"
                  >
                    github.com/rahul07632
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleContactSubmit}
            noValidate
            className={`rounded-3xl border p-6 sm:p-8 space-y-5 transition-colors ${isDark
              ? 'bg-slate-900/90 border-slate-700/90 text-slate-100 shadow-xl shadow-black/30'
              : 'bg-white border-slate-300 text-slate-900 shadow-sm'
              }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Send a Message
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Opens your default email client pre-addressed to{' '}
                  <span className={isDark ? 'text-cyan-300 font-mono' : 'text-cyan-700 font-mono'}>
                    {PERSONAL_INFO.email}
                  </span>
                </p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${isDark
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                  : 'bg-cyan-50 border-cyan-300 text-cyan-800'
                  }`}
              >
                mailto: Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className={`block text-xs font-mono uppercase tracking-wider font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                >
                  Your Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  placeholder="Enter your full name"
                  style={{ colorScheme: isDark ? 'dark' : 'light' }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-normal outline-none transition-all ${formErrors.name
                    ? isDark
                      ? 'bg-slate-950 text-white placeholder:text-slate-400 border-rose-400 ring-2 ring-rose-500/25'
                      : 'bg-white text-slate-900 placeholder:text-slate-400 border-rose-500 ring-2 ring-rose-500/20'
                    : isDark
                      ? 'bg-slate-950 text-white placeholder:text-slate-400 border-slate-700 hover:border-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25'
                      : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border-slate-300 hover:border-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20'
                    }`}
                />
                {formErrors.name && (
                  <p
                    role="alert"
                    className={`text-xs font-medium mt-1.5 flex items-center gap-1.5 ${isDark ? 'text-rose-300' : 'text-rose-600'
                      }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className={`block text-xs font-mono uppercase tracking-wider font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                >
                  Your Email <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  placeholder="name@company.com"
                  style={{ colorScheme: isDark ? 'dark' : 'light' }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-normal outline-none transition-all ${formErrors.email
                    ? isDark
                      ? 'bg-slate-950 text-white placeholder:text-slate-400 border-rose-400 ring-2 ring-rose-500/25'
                      : 'bg-white text-slate-900 placeholder:text-slate-400 border-rose-500 ring-2 ring-rose-500/20'
                    : isDark
                      ? 'bg-slate-950 text-white placeholder:text-slate-400 border-slate-700 hover:border-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25'
                      : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border-slate-300 hover:border-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20'
                    }`}
                />
                {formErrors.email && (
                  <p
                    role="alert"
                    className={`text-xs font-medium mt-1.5 flex items-center gap-1.5 ${isDark ? 'text-rose-300' : 'text-rose-600'
                      }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className={`block text-xs font-mono uppercase tracking-wider font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
              >
                Subject <span className="text-cyan-400">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  if (formErrors.subject) setFormErrors({ ...formErrors, subject: '' });
                }}
                placeholder="Full Stack Developer Role / Interview Invitation"
                style={{ colorScheme: isDark ? 'dark' : 'light' }}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-normal outline-none transition-all ${formErrors.subject
                  ? isDark
                    ? 'bg-slate-950 text-white placeholder:text-slate-400 border-rose-400 ring-2 ring-rose-500/25'
                    : 'bg-white text-slate-900 placeholder:text-slate-400 border-rose-500 ring-2 ring-rose-500/20'
                  : isDark
                    ? 'bg-slate-950 text-white placeholder:text-slate-400 border-slate-700 hover:border-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25'
                    : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border-slate-300 hover:border-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20'
                  }`}
              />
              {formErrors.subject && (
                <p
                  role="alert"
                  className={`text-xs font-medium mt-1.5 flex items-center gap-1.5 ${isDark ? 'text-rose-300' : 'text-rose-600'
                    }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{formErrors.subject}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className={`block text-xs font-mono uppercase tracking-wider font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
              >
                Message <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                }}
                placeholder="Hello Rahul, we reviewed your projects and would love to schedule an interview..."
                style={{ colorScheme: isDark ? 'dark' : 'light' }}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-normal outline-none transition-all resize-y ${formErrors.message
                  ? isDark
                    ? 'bg-slate-950 text-white placeholder:text-slate-400 border-rose-400 ring-2 ring-rose-500/25'
                    : 'bg-white text-slate-900 placeholder:text-slate-400 border-rose-500 ring-2 ring-rose-500/20'
                  : isDark
                    ? 'bg-slate-950 text-white placeholder:text-slate-400 border-slate-700 hover:border-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25'
                    : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 border-slate-300 hover:border-slate-400 focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20'
                  }`}
              />
              {formErrors.message && (
                <p
                  role="alert"
                  className={`text-xs font-medium mt-1.5 flex items-center gap-1.5 ${isDark ? 'text-rose-300' : 'text-rose-600'
                    }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{formErrors.message}</span>
                </p>
              )}
            </div>

            {formStatus.type !== 'idle' && (
              <div
                role="status"
                className={`p-4 rounded-2xl border text-xs space-y-3 leading-relaxed ${formStatus.type === 'error'
                  ? isDark
                    ? 'bg-rose-950/70 border-rose-500/60 text-rose-200'
                    : 'bg-rose-50 border-rose-300 text-rose-800'
                  : formStatus.type === 'success'
                    ? isDark
                      ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-100'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : isDark
                      ? 'bg-cyan-950/60 border-cyan-500/50 text-slate-100'
                      : 'bg-cyan-50 border-cyan-300 text-slate-800'
                  }`}
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle
                    className={`w-4 h-4 shrink-0 mt-0.5 ${formStatus.type === 'error'
                      ? isDark
                        ? 'text-rose-400'
                        : 'text-rose-600'
                      : formStatus.type === 'success'
                        ? isDark
                          ? 'text-emerald-400'
                          : 'text-emerald-600'
                        : isDark
                          ? 'text-cyan-400'
                          : 'text-cyan-700'
                      }`}
                  />
                  <span className="font-medium">{formStatus.message}</span>
                </div>

                {formStatus.mailtoUrl && (
                  <div className="pt-2 border-t border-cyan-500/30 flex flex-wrap items-center gap-2">
                    <a
                      href={formStatus.mailtoUrl}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs inline-flex items-center gap-1.5 ${isDark
                        ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700'
                        }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Retry mailto: Link</span>
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          'formatted-email',
                          `To: ${PERSONAL_INFO.email}\nSubject: [Portfolio Contact] ${formData.subject.trim()} — from ${formData.name.trim()}\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
                        )
                      }
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs border inline-flex items-center gap-1.5 ${isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-100 hover:border-cyan-400'
                        : 'bg-white border-slate-300 text-slate-800 hover:border-cyan-600'
                        }`}
                    >
                      {copiedKey === 'formatted-email' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Full Message!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Pre-Filled Message</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>

              <button
                type="button"
                onClick={() => copyText('direct-email-btn', PERSONAL_INFO.email)}
                className={`px-5 py-3.5 rounded-2xl font-semibold text-xs border flex items-center gap-2 transition ${isDark
                  ? 'bg-slate-950 border-slate-700 text-slate-100 hover:border-cyan-400 hover:text-cyan-300'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
              >
                {copiedKey === 'direct-email-btn' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Email Copied: {PERSONAL_INFO.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
