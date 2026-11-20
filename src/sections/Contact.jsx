import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const EMAILJS_CONFIG = {
  serviceId: 'service_hya1f7g',
  templateId: 'template_1tlw63b',
  publicKey: 'oT_CuwLsQ7rDlQxLK',
  targetEmail: 'rahulvishwakarma13211@gmail.com'
};

export default function Contact({ onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const email = EMAILJS_CONFIG.targetEmail;

  const copyEmail = () => {
    const notifySuccess = () => {
      setCopied(true);
      if (onShowToast) onShowToast('Email copied!');
      setTimeout(() => setCopied(false), 2200);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(notifySuccess).catch(() => {
        fallbackCopy(email, notifySuccess);
      });
    } else {
      fallbackCopy(email, notifySuccess);
    }
  };

  const fallbackCopy = (text, onDone) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      onDone();
    } catch {
      if (onShowToast) onShowToast('Email copied!');
    }
    document.body.removeChild(ta);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email: senderEmail, subject, message } = formData;
    if (!name.trim() || !senderEmail.trim() || !subject.trim() || !message.trim()) {
      if (onShowToast) onShowToast('Please fill all fields.');
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    const sentAt = new Date();
    const formattedSentAt = sentAt.toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'long'
    });

    const templateParams = {
      from_name: name.trim(),
      from_email: senderEmail.trim(),
      subject: subject.trim(),
      message: `${message.trim()}\n\n---\nSent at: ${formattedSentAt}`,
      to_email: EMAILJS_CONFIG.targetEmail,
      to_name: 'Rahul Vishwakarma',
      sent_at: formattedSentAt,
      sent_iso: sentAt.toISOString()
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        { publicKey: EMAILJS_CONFIG.publicKey }
      );

      setIsSending(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setStatusMessage({
        type: 'success',
        text: 'Your message has been sent successfully to Rahul!'
      });
      if (onShowToast) onShowToast('✓ Message dispatched via EmailJS!');
    } catch (err) {
      console.error('EmailJS delivery error:', err);
      setIsSending(false);

      const mailtoUrl = `mailto:${EMAILJS_CONFIG.targetEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(`From: ${name} (${senderEmail})\n\n${message}`)}`;

      setStatusMessage({
        type: 'fallback',
        text: 'Direct send was interrupted. Click below to dispatch via your mail client:',
        mailtoUrl
      });

      if (onShowToast) onShowToast('EmailJS send failed. Mailto fallback ready.');
    }
  };

  return (
    <section id="dispatch" className="relative z-10 py-12 sm:py-24 px-3 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20 sm:scroll-mt-28">
      <div className="atelier-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 md:p-10 grid lg:grid-cols-12 gap-5 sm:gap-10">
        <div className="lg:col-span-5 space-y-3.5 sm:space-y-5">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--accent)' }}>
            04 / Direct Dispatch
          </span>
          <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Start a conversation.</h2>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Fresher (2025 CSE) seeking entry-level Software Engineer, Frontend, and Full-Stack MERN roles across India or remote.
          </p>

          <div className="space-y-2 sm:space-y-2.5 pt-1">
            <div
              id="emailBox"
              role="button"
              tabIndex={0}
              onClick={copyEmail}
              className="email-copy-box cursor-pointer flex items-center justify-between gap-2 p-2 sm:p-3 rounded-xl border group transition-all"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div
                  className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
                >
                  <Mail className="w-3.5 h-3.5 transition-transform group-hover:scale-110" style={{ color: 'var(--accent)' }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] uppercase font-mono tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Email
                  </div>
                  <div
                    className="text-[10.5px] sm:text-xs font-mono font-medium truncate"
                    title={email}
                  >
                    {email}
                  </div>
                </div>
              </div>

              <button
                id="copyEmailBtn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyEmail();
                }}
                className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono accent-btn font-semibold shrink-0 transition-all text-center shadow-sm"
                style={copied ? { background: '#10b981' } : {}}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <a
              href="tel:+917879260763"
              className="email-copy-box flex items-center gap-2 p-2 sm:p-3 rounded-xl border transition-all hover:opacity-90"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
            >
              <div
                className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
              >
                <Phone className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] uppercase font-mono tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                  Phone
                </div>
                <div className="text-[10.5px] sm:text-xs font-mono font-medium">
                  +91 7879260763
                </div>
              </div>
            </a>
          </div>
        </div>

        <form id="contactForm" onSubmit={handleSubmit} className="lg:col-span-7 space-y-3 sm:space-y-4">
          <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-4">
            <div className="group">
              <label
                htmlFor="senderName"
                className="block font-mono text-[10px] sm:text-xs mb-1 transition-colors group-hover:text-[#e85d3f]"
                style={{ color: 'var(--text-muted)' }}
              >
                Your Name
              </label>
              <input
                id="senderName"
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="interactive-input w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border text-sm sm:text-sm focus:outline-none transition-all"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
              />
            </div>

            <div className="group">
              <label
                htmlFor="senderEmail"
                className="block font-mono text-[10px] sm:text-xs mb-1 transition-colors group-hover:text-[#e85d3f]"
                style={{ color: 'var(--text-muted)' }}
              >
                Email Address
              </label>
              <input
                id="senderEmail"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="interactive-input w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border text-sm sm:text-sm focus:outline-none transition-all"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
              />
            </div>
          </div>

          <div className="group">
            <label
              htmlFor="senderSubject"
              className="block font-mono text-[10px] sm:text-xs mb-1 transition-colors group-hover:text-[#e85d3f]"
              style={{ color: 'var(--text-muted)' }}
            >
              Subject
            </label>
            <input
              id="senderSubject"
              type="text"
              required
              placeholder="Job Opportunity / Role"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="interactive-input w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border text-sm sm:text-sm focus:outline-none transition-all"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
            />
          </div>

          <div className="group">
            <label
              htmlFor="senderMessage"
              className="block font-mono text-[10px] sm:text-xs mb-1 transition-colors group-hover:text-[#e85d3f]"
              style={{ color: 'var(--text-muted)' }}
            >
              Message
            </label>
            <textarea
              id="senderMessage"
              rows="3"
              required
              placeholder="Tell me about the opportunity..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="interactive-input w-full px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border text-sm sm:text-sm focus:outline-none resize-none transition-all"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
            />
          </div>

          {statusMessage && (
            <div
              className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${statusMessage.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                }`}
            >
              <div className="flex items-center gap-2.5">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>

              {statusMessage.mailtoUrl && (
                <a
                  href={statusMessage.mailtoUrl}
                  className="w-full sm:w-auto text-center px-3.5 py-1.5 rounded-lg accent-btn font-semibold inline-flex items-center justify-center gap-1.5 shrink-0"
                >
                  Send via Mail <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          <MagneticButton
            type="submit"
            disabled={isSending}
            className="w-full py-3 sm:py-4 rounded-xl font-semibold text-xs sm:text-base accent-btn flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Dispatching via EmailJS...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Dispatch Message</span>
              </>
            )}
          </MagneticButton>
        </form>
      </div>
    </section>
  );
}
