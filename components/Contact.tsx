'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  socials: {
    linkedin: string;
    github?: string;
    email: string;
  };
}

export default function Contact({ socials }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      let res = await fetch('/portfolio/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-dark-bg/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-brand-500/30 text-brand-cyan text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's build something <span className="gradient-text">together.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Feel free to reach out for collaborations, technical opportunities, or inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Direct Social Links */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Information</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              I'm open to discussing web development projects, AI/ML research collaborations, and internships.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${socials.email}`}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/40 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-brand-500/20 text-brand-cyan group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium block">Direct Email</span>
                  <span className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors">
                    {socials.email}
                  </span>
                </div>
              </a>

              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-cyan/40 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-brand-cyan/20 text-brand-cyan group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-medium block">LinkedIn Profile</span>
                    <span className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors truncate">
                      anushka-tatapudi1312
                    </span>
                  </div>
                </a>
              )}

              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/30 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-white/10 text-white group-hover:scale-110 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-medium block">GitHub</span>
                    <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                      View Repositories
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border-white/10">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                <p className="text-gray-300 text-sm max-w-md mx-auto">
                  Your message has been dispatched. I will respond to your email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/25 transition-all"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
