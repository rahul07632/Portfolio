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
      if (onShowToast) onShowToast('Email copied: ' + email);
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
      if (onShowToast) onShowToast('Email: ' + text);
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
    <section id="dispatch" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="atelier-card rounded-3xl p-6 sm:p-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-5">
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            04 / Direct Dispatch
          </span>
          <h2 className="text-3xl font-bold">Start a conversation.</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Fresher (2025 CSE) seeking entry-level Software Engineer, Frontend, and Full-Stack MERN roles.
          </p>

          <div className="space-y-3">
            <div
              id="emailBox"
              role="button"
              tabIndex={0}
              onClick={copyEmail}
              className="email-copy-box cursor-pointer flex items-center justify-between gap-2 p-3.5 rounded-xl border group"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" style={{ color: 'var(--accent)' }} />
                <span className="text-xs sm:text-sm truncate font-mono">{email}</span>
              </div>
              <button
                id="copyEmailBtn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyEmail();
                }}
                className="px-3 py-1 rounded-lg text-xs font-mono accent-btn font-semibold shrink-0 transition-all"
                style={copied ? { background: '#10b981' } : {}}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

            <a
              href="tel:+917879260763"
              className="email-copy-box flex items-center gap-2.5 p-3.5 rounded-xl border text-xs sm:text-sm font-mono"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
            >
              <Phone className="w-4 h-4" style={{ color: 'var(--accent)' }} /> +91 7879260763
            </a>
          </div>
        </div>

        <form id="contactForm" onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="group">
              <label
                htmlFor="senderName"
                className="block font-mono text-[11px] mb-1.5 transition-colors group-hover:text-[#e85d3f]"
                style={{ color: 'var(--text-muted)' }}
              >
                Your Name
              </label>
              <input
                id="senderName"
                type="text"
                required
                placeholder="Recruiter / Hiring Manager"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="interactive-input w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
              />
            </div>

            <div className="group">
              <label
                htmlFor="senderEmail"
                className="block font-mono text-[11px] mb-1.5 transition-colors group-hover:text-[#e85d3f]"
                style={{ color: 'var(--text-muted)' }}
              >
                Email Address
              </label>
              <input
                id="senderEmail"
                type="email"
                required
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="interactive-input w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
              />
            </div>
          </div>

          <div className="group">
            <label
              htmlFor="senderSubject"
              className="block font-mono text-[11px] mb-1.5 transition-colors group-hover:text-[#e85d3f]"
              style={{ color: 'var(--text-muted)' }}
            >
              Subject
            </label>
            <input
              id="senderSubject"
              type="text"
              required
              placeholder="Full-Stack / Frontend Fresher Role"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="interactive-input w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
            />
          </div>

          <div className="group">
            <label
              htmlFor="senderMessage"
              className="block font-mono text-[11px] mb-1.5 transition-colors group-hover:text-[#e85d3f]"
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
              className="interactive-input w-full px-4 py-3 rounded-xl border text-sm focus:outline-none resize-none"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text)' }}
            />
          </div>

          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between gap-3 ${
                statusMessage.type === 'success'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-300'
              }`}
            >
              <div className="flex items-center gap-2">
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
                  className="px-3 py-1.5 rounded-lg accent-btn font-semibold inline-flex items-center gap-1 shrink-0"
                >
                  Send via Mail <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          <MagneticButton
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 rounded-xl font-semibold text-sm accent-btn flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
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
