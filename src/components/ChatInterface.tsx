import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-sql';
import {
  Send, BookOpen, Shield, Terminal, Rocket,
  Hexagon, X, ChevronLeft, MoreHorizontal, Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { chatWithNexus, type Message } from '../services/gemini';

const UI_TRIGGER_ZERO_G = '[UI_TRIGGER: ZERO_G]';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  onBack: () => void;
}

const SUGGESTIONS = [
  { icon: BookOpen, label: 'IT Syllabus & Faculty', action: 'Tell me about IT Syllabus & Faculty' },
  { icon: Shield, label: 'Code Security Audit', action: 'Explain what the Code-Sec Oracle mode does' },
  { icon: Terminal, label: 'Debug C / Java / JS', action: 'I have a debugging question about C' },
  { icon: Rocket, label: 'ChatGPT — try it', action: 'ChatGPT explain what is an operating system' },
];

const NAV_ITEMS = [
  { icon: BookOpen, label: 'Syllabus', action: 'Tell me about the IT syllabus' },
  { icon: Shield, label: 'Security Audit', action: 'I want to audit my code' },
  { icon: Terminal, label: 'Debug Code', action: 'Help me debug my code' },
  { icon: Rocket, label: 'ChatGPT', action: 'ChatGPT explain recursion' },
];

export default function ChatInterface({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAntigravity, setIsAntigravity] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { Prism.highlightAll(); }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  function processResponse(raw: string): { text: string; triggerZeroG: boolean } {
    if (raw.includes(UI_TRIGGER_ZERO_G)) {
      return { text: raw.replace(UI_TRIGGER_ZERO_G, '').trimEnd(), triggerZeroG: true };
    }
    return { text: raw, triggerZeroG: false };
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    if (!input.trim().toLowerCase().includes('chatgpt')) {
      setIsAntigravity(false);
    }

    try {
      const rawResponse = await chatWithNexus(newMessages);
      const { text, triggerZeroG } = processResponse(rawResponse || 'No response received.');
      if (triggerZeroG) setIsAntigravity(true);
      setMessages([...newMessages, { role: 'model', content: text }]);
    } catch (error) {
      console.error('Aura Error:', error);
      setMessages([...newMessages, { role: 'model', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const setInputAndFocus = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden font-sans">
      
      {/* ── Sidebar ── */}
      <aside className="sidebar hidden md:flex">
        {/* Logo */}
        <div className="flex items-center gap-4 px-6 h-24 border-b border-white/5 shrink-0">
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-colors duration-500",
              isAntigravity ? "bg-violet-500/20 text-violet-400" : "bg-indigo-500/20 text-indigo-400"
            )}>
              {isAntigravity ? <Rocket className="w-4 h-4 animate-pulse" /> : <Hexagon className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-wide uppercase">AURA AI</div>
              <div className={cn(
                "text-[10px] tracking-widest uppercase font-semibold mt-0.5 transition-colors duration-500",
                isAntigravity ? "text-violet-400" : "text-indigo-400"
              )}>
                {isAntigravity ? 'Zero-G Mode' : 'Aura Engine Core'}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 px-4 py-8 overflow-y-auto custom-scrollbar space-y-2">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold px-4 mb-4">Quick Start Command</div>
          {NAV_ITEMS.map((item, i) => (
            <button key={i} onClick={() => setInputAndFocus(item.action)} className="nav-item group">
              <item.icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-sky-400 transition-colors" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-3 bg-[#0f172a] px-4 py-3 rounded-2xl border border-indigo-900/30">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]",
              isAntigravity ? "bg-violet-400" : "bg-indigo-400"
            )} />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-300">System Connected</span>
              <span className="text-[10px] text-slate-500">Latency: 14ms</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Chat Panel ── */}
      <main className="chat-panel">
        
        {/* Top bar (mobile + secondary actions) */}
        <div className="flex items-center justify-between px-6 lg:px-10 h-20 border-b border-white/5 shrink-0 bg-[#020617]/50 backdrop-blur-md relative z-30">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="md:hidden text-slate-400 hover:text-white transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="md:hidden flex items-center gap-2">
              <Hexagon className="w-5 h-5 text-indigo-400" />
              <span className="text-base font-bold tracking-wide text-white uppercase">AURA AI</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Aura Intelligence Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAntigravity && (
              <button
                onClick={() => setIsAntigravity(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-violet-300 border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              >
                <X className="w-3 h-3" /> Exit Zero-G
              </button>
            )}
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className={cn(
            "flex-1 overflow-y-auto custom-scrollbar antigravity-transition px-6 lg:px-12 py-8 space-y-6 relative z-10",
            isAntigravity && "antigravity-active"
          )}
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-10 py-10 animate-fade-in-up">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-400/30 shadow-[0_0_40px_rgba(99,102,241,0.15)] relative">
                  <div className="absolute inset-0 bg-indigo-400/10 blur-xl rounded-3xl" />
                  <Hexagon className={cn("w-10 h-10 relative z-10", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">How can Aura assist you?</h2>
                <p className="text-base text-slate-400 max-w-md mx-auto leading-relaxed font-light">
                  Query the data core, initiate an automated code audit, or resolve complex logic errors instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInputAndFocus(s.action)}
                    className="flex items-center gap-4 p-5 bg-[#0f172a]/60 backdrop-blur-md border border-white/5 rounded-2xl hover:border-indigo-500/40 hover:bg-[#1e293b]/80 text-left transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(99,102,241,0.1)]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-950/50 border border-indigo-900/50 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-300">
                      <s.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="text-[15px] text-slate-200 font-medium group-hover:text-white transition-colors">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-4 antigravity-message relative z-10 max-w-4xl mx-auto w-full animate-fade-in-up",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border text-sm font-bold shadow-lg",
                msg.role === 'user'
                  ? "bg-slate-800 border-slate-700 text-slate-300"
                  : "bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border-indigo-500/30"
              )}>
                {msg.role === 'user'
                  ? <span>ME</span>
                  : <Hexagon className={cn("w-5 h-5", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
                }
              </div>

              {/* Bubble */}
              <div
                className={cn(
                  "flex-1 max-w-[85%]",
                  msg.role === 'user' ? "user-bubble" : "ai-bubble"
                )}
              >
                <div className="markdown-body">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex gap-4 relative z-10 max-w-4xl mx-auto w-full animate-fade-in-up">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border-indigo-500/30 shadow-lg">
                <Hexagon className={cn("w-5 h-5", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
              </div>
              <div className="ai-bubble flex items-center gap-2 py-5 px-6">
                <span className={cn("w-2 h-2 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-bounce", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
                <span className={cn("w-2 h-2 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-bounce [animation-delay:0.15s]", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
                <span className={cn("w-2 h-2 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-bounce [animation-delay:0.3s]", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
              </div>
            </div>
          )}
        </div>

        {/* ── Input ── */}
        <div className="px-6 lg:px-12 py-6 shrink-0 relative z-30 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative chat-input-wrapper">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isAntigravity ? 'Float a question into the cosmos...' : 'Message Aura Engine...'}
                className="chat-input custom-scrollbar"
                style={{ maxHeight: '200px', minHeight: '60px' }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="send-btn"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            
            <div className="flex items-center justify-between mt-4 px-2">
              <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest hidden sm:block">
                {isAntigravity ? 'Zero-G Protocol Active' : 'Aura Core · Secured Connection'}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 w-full sm:w-auto justify-center sm:justify-end">
                <span>Designed &amp; Developed by</span>
                <span className="text-sky-400 font-semibold tracking-wide">Prajwal Chaple</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
