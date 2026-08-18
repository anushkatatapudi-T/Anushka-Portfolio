'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Mail, MailOpen, Trash2, Reply, CheckCircle2, Clock, Search, Filter, Inbox } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMessages = async () => {
    try {
      let res = await fetch('/portfolio/api/admin/messages');
      if (!res.ok) {
        res = await fetch('/api/admin/messages');
      }
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (msg: Message) => {
    const updatedRead = !msg.read;
    // Optimistic UI update
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, read: updatedRead } : m))
    );
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage((prev) => prev ? { ...prev, read: updatedRead } : null);
    }

    try {
      let res = await fetch('/portfolio/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg.id, read: updatedRead }),
      });
      if (!res.ok) {
        await fetch('/api/admin/messages', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: msg.id, read: updatedRead }),
        });
      }
    } catch (err) {
      console.error('Failed to update message read status', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }

    try {
      let res = await fetch(`/portfolio/api/admin/messages?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      }
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  const handleOpenMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      toggleReadStatus(msg);
    }
  };

  const filteredMessages = messages
    .filter((m) => {
      if (filter === 'unread') return !m.read;
      if (filter === 'read') return m.read;
      return true;
    })
    .filter((m) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Received Messages
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-cyan text-dark-bg">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-400">
              View and manage direct inquiries sent from your public portfolio contact form.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Total Inquiries</span>
              <span className="text-3xl font-extrabold text-white">{messages.length}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-brand-500/20 text-brand-cyan">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Unread Messages</span>
              <span className="text-3xl font-extrabold text-amber-400">{unreadCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Read Messages</span>
              <span className="text-3xl font-extrabold text-emerald-400">{messages.length - unreadCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <MailOpen className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'all' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'unread' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === 'read' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Read ({messages.length - unreadCount})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sender, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-card border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
            />
          </div>
        </div>

        {/* Messages Layout (List & Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* List Column */}
          <div className={`${selectedMessage ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-3`}>
            {loading ? (
              <div className="text-center py-16 text-gray-400 glass-panel rounded-3xl">Loading messages...</div>
            ) : filteredMessages.length === 0 ? (
              <div className="text-center py-16 text-gray-400 glass-panel rounded-3xl space-y-2">
                <Inbox className="w-10 h-10 mx-auto text-gray-500" />
                <p className="text-sm font-semibold text-white">No messages found</p>
                <p className="text-xs text-gray-400">Incoming user messages will appear right here.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-cyan shadow-md'
                        : msg.read
                        ? 'bg-white/5 border-white/5 hover:border-white/20 text-gray-300'
                        : 'bg-brand-500/5 border-brand-500/30 hover:border-brand-500/60 font-semibold text-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center space-x-2 truncate">
                        {!msg.read && <span className="w-2 h-2 rounded-full bg-brand-cyan shrink-0" />}
                        <span className="text-sm font-bold text-white truncate">{msg.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className="text-xs text-brand-cyan font-medium truncate mb-1">{msg.subject}</div>
                    <div className="text-xs text-gray-400 line-clamp-2">{msg.message}</div>
                  </div>
                );
              })
            )}
          </div>

          {/* Selected Message Detail View */}
          {selectedMessage && (
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border-white/10 space-y-6 flex flex-col justify-between sticky top-8">
              <div className="space-y-4">
                
                {/* Top Action Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleReadStatus(selectedMessage)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 flex items-center space-x-1.5 transition-colors"
                    >
                      {selectedMessage.read ? (
                        <>
                          <Mail className="w-3.5 h-3.5" />
                          <span>Mark Unread</span>
                        </>
                      ) : (
                        <>
                          <MailOpen className="w-3.5 h-3.5" />
                          <span>Mark Read</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      className="px-3 py-1.5 rounded-xl bg-brand-500/20 text-brand-cyan hover:bg-brand-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Message Header */}
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">{selectedMessage.subject}</h2>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="font-semibold text-gray-200">{selectedMessage.name}</span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="text-[11px] text-gray-500 flex items-center space-x-1 pt-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Message Content Body */}
                <div className="p-4 rounded-2xl bg-dark-bg/80 border border-white/5 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
                >
                  Close Detail View
                </button>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
