import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  AlertCircle,
  BriefcaseBusiness,
  Check,
  Copy,
  GitBranch,
  Mail,
  Phone,
  Send
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const EMAILJS_CONFIG = {
  serviceId: 'service_hya1f7g',
  templateId: 'template_1tlw63b',
  publicKey: 'oT_CuwLsQ7rDlQxLK',
  targetEmail: 'rahulvishwakarma13211@gmail.com'
};

const EMAILJS_SERVICE_ID = EMAILJS_CONFIG.serviceId;
const EMAILJS_TEMPLATE_ID = EMAILJS_CONFIG.templateId;
const EMAILJS_PUBLIC_KEY = EMAILJS_CONFIG.publicKey;
const EMAILJS_TARGET_EMAIL = EMAILJS_CONFIG.targetEmail || PERSONAL_INFO.email;
const IS_EMAILJS_READY = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

if (!IS_EMAILJS_READY) {
  console.warn('EmailJS config is incomplete. Please check the hardcoded values in Contact.jsx.');
}

const inputClassName = (hasError) =>
  `w-full rounded-xl border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent)] ${
    hasError ? 'border-rose-500' : 'border-[var(--border)] hover:border-[var(--accent)]'
  }`;

function ContactFieldError({ message, id }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

export default function Contact() {
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

  const copyText = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
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

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({ type: 'idle', message: '', mailtoUrl: '' });

    if (!validateForm()) {
      setFormStatus({
        type: 'error',
        message: 'Please fix the highlighted fields above before opening your email client.',
        mailtoUrl: ''
      });
      return;
    }

    try {
      if (!IS_EMAILJS_READY) {
        setFormStatus({
          type: 'error',
          message: 'Email delivery is not configured yet. Please activate the EmailJS service and verify the environment values before sending.',
          mailtoUrl: ''
        });
        return;
      }

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
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setFormStatus({
        type: 'error',
        message: 'Email delivery failed. Please verify your EmailJS service, template, and credentials and try again.',
        mailtoUrl: ''
      });
    }
  };

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => current[field] ? { ...current, [field]: '' } : current);
  };

  const copyButton = (key, text, label) => (
    <button
      type="button"
      onClick={() => copyText(key, text)}
      className="rounded-full border hairline p-2 transition-colors hover:border-[var(--accent)] hover:accent-text"
      aria-label={`Copy ${label}`}
      title={`Copy ${label}`}
    >
      {copiedKey === key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );

  return (
    <section id="contact" className="border-b hairline py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="space-y-6 editorial-reveal lg:col-span-5">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest accent-text">
              05 // INITIATE CONTACT
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl">
              Let&apos;s Build
              <br />
              <span className="font-serif font-normal italic lowercase">Together</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed opacity-80 sm:text-base">
            Open to Full-Stack Developer, Frontend Developer, and entry-level Software Engineering opportunities across India or remote.
          </p>

          <div className="divide-y hairline border-y">
            <div className="flex items-center gap-4 py-4">
              <Mail className="h-4 w-4 shrink-0 accent-text" />
              <div className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] opacity-60">EMAIL</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="break-all text-sm font-semibold hover:accent-text">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              {copyButton('email', PERSONAL_INFO.email, 'email address')}
            </div>

            <div className="flex items-center gap-4 py-4">
              <Phone className="h-4 w-4 shrink-0 accent-text" />
              <div className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] opacity-60">PHONE</span>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-semibold hover:accent-text">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              {copyButton('phone', PERSONAL_INFO.phone, 'phone number')}
            </div>

            <div className="flex items-center gap-4 py-4">
              <BriefcaseBusiness className="h-4 w-4 shrink-0 accent-text" />
              <div className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] opacity-60">LINKEDIN</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="break-all text-sm font-semibold hover:accent-text">
                  linkedin.com/in/rahulvishwakarma78
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 py-4">
              <GitBranch className="h-4 w-4 shrink-0 accent-text" />
              <div className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] opacity-60">GITHUB</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="break-all text-sm font-semibold hover:accent-text">
                  github.com/rahul07632
                </a>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleContactSubmit}
          noValidate
          className="space-y-5 rounded-3xl surface-box p-6 editorial-reveal sm:p-8 lg:col-span-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">Send a Message</h3>
              <p className="mt-1 text-xs leading-relaxed opacity-70">
                Your message will be sent directly to{' '}
                <span className="font-mono accent-text">{PERSONAL_INFO.email}</span>.
              </p>
            </div>
            <span className="rounded-full border hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider accent-text">
              Available for work
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider">
                Your Name <span className="accent-text">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Enter your full name"
                aria-invalid={Boolean(formErrors.name)}
                aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                className={inputClassName(formErrors.name)}
              />
              <ContactFieldError id="contact-name-error" message={formErrors.name} />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider">
                Your Email <span className="accent-text">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="name@company.com"
                aria-invalid={Boolean(formErrors.email)}
                aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                className={inputClassName(formErrors.email)}
              />
              <ContactFieldError id="contact-email-error" message={formErrors.email} />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="mb-1.5 block font-mono text-xs uppercase tracking-wider">
              Subject <span className="accent-text">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(event) => updateField('subject', event.target.value)}
              placeholder="Full Stack Developer Role / Interview Invitation"
              aria-invalid={Boolean(formErrors.subject)}
              aria-describedby={formErrors.subject ? 'contact-subject-error' : undefined}
              className={inputClassName(formErrors.subject)}
            />
            <ContactFieldError id="contact-subject-error" message={formErrors.subject} />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider">
              Message <span className="accent-text">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={(event) => updateField('message', event.target.value)}
              placeholder="Hello Rahul, we reviewed your projects and would love to schedule an interview..."
              aria-invalid={Boolean(formErrors.message)}
              aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
              className={`${inputClassName(formErrors.message)} resize-y`}
            />
            <ContactFieldError id="contact-message-error" message={formErrors.message} />
          </div>

          {formStatus.type !== 'idle' && (
            <div
              role="status"
              className={`space-y-3 rounded-2xl border p-4 text-xs leading-relaxed ${
                formStatus.type === 'error'
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                  : formStatus.type === 'success'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-[var(--accent)]/40 bg-[var(--accent)]/10'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="font-medium">{formStatus.message}</span>
              </div>
              {formStatus.mailtoUrl && (
                <div className="flex flex-wrap items-center gap-2 border-t border-current/20 pt-2">
                  <a
                    href={formStatus.mailtoUrl}
                    className="inline-flex items-center gap-1.5 rounded-full accent-bg px-3 py-1.5 text-xs font-semibold"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Retry email link</span>
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        'formatted-email',
                        `To: ${PERSONAL_INFO.email}\nSubject: [Portfolio Contact] ${formData.subject.trim()} — from ${formData.name.trim()}\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-full border hairline px-3 py-1.5 text-xs font-semibold"
                  >
                    {copiedKey === 'formatted-email' ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied full message</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy pre-filled message</span>
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
              className="inline-flex items-center gap-2 rounded-full accent-bg px-6 py-3.5 font-display text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
            <button
              type="button"
              onClick={() => copyText('direct-email-btn', PERSONAL_INFO.email)}
              className="inline-flex items-center gap-2 rounded-full border hairline px-5 py-3.5 font-mono text-xs transition-colors hover:border-[var(--accent)] hover:accent-text"
            >
              {copiedKey === 'direct-email-btn' ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Email copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy email address</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
