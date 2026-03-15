import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-sql';
import {
  Send, BookOpen, Shield, Terminal, Rocket, Search,
  Hexagon, X, ChevronLeft, GraduationCap
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
  { icon: GraduationCap, label: 'Set my college', action: 'My college is ' },
  { icon: Search, label: 'Find syllabus PDF', action: 'Give me the IT branch syllabus PDF link for my college' },
  { icon: Shield, label: 'Code security audit', action: 'Audit this code for security issues:\n' },
  { icon: Rocket, label: 'ChatGPT mode', action: 'ChatGPT explain what is an operating system' },
];

const NAV_ITEMS = [
  { icon: GraduationCap, label: 'Set College', action: 'My college is ' },
  { icon: BookOpen, label: 'Syllabus', action: 'Give me the syllabus for my college' },
  { icon: Shield, label: 'Code Audit', action: 'Audit my code for security issues' },
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
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/5 shrink-0">
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <Hexagon className={cn("w-5 h-5", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
          <span className="font-semibold text-sm text-white">Aura AI</span>
        </div>

        {/* Nav */}
        <div className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold px-3 mb-3">Quick Actions</div>
          <div className="space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => setInputAndFocus(item.action)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left"
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              isAntigravity ? "bg-violet-400" : "bg-emerald-400"
            )} />
            <span className="text-xs text-slate-400">Online</span>
          </div>
        </div>
      </aside>

      {/* ── Chat Panel ── */}
      <main className="chat-panel">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/5 shrink-0 bg-[#020617]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="md:hidden text-slate-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <Hexagon className={cn("w-5 h-5 md:hidden", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
            <span className="text-sm font-medium text-white">Aura AI</span>
            <span className="text-xs text-slate-500 hidden sm:inline">· Chat</span>
          </div>

          <div className="flex items-center gap-3">
            {isAntigravity && (
              <button
                onClick={() => setIsAntigravity(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-violet-300 border border-violet-500/20 bg-violet-500/10 hover:bg-violet-500/20 transition-all"
              >
                <X className="w-3 h-3" /> Exit Zero-G
              </button>
            )}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full animate-pulse",
                isAntigravity ? "bg-violet-400" : "bg-emerald-400"
              )} />
              <span className="hidden sm:inline">{isAntigravity ? 'Zero-G Active' : 'Online'}</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className={cn(
            "flex-1 overflow-y-auto custom-scrollbar antigravity-transition px-4 md:px-8 py-6 space-y-5",
            isAntigravity && "antigravity-active"
          )}
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 py-8">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <Hexagon className={cn("w-8 h-8", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
                </div>
                <h2 className="text-2xl font-semibold text-white">How can I help you?</h2>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Set your college name first, then ask about syllabus, faculty, or anything. I search the web for real answers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInputAndFocus(s.action)}
                    className="flex items-center gap-3 p-4 bg-[#0f172a]/50 border border-white/5 rounded-xl hover:border-indigo-500/20 hover:bg-[#1e293b]/50 text-left transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                      <s.icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-300">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3 max-w-3xl mx-auto w-full",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold",
                msg.role === 'user'
                  ? "bg-slate-800 border border-slate-700 text-slate-300"
                  : "bg-indigo-500/15 border border-indigo-500/20"
              )}>
                {msg.role === 'user'
                  ? <span>U</span>
                  : <Hexagon className={cn("w-4 h-4", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
                }
              </div>

              <div className={cn(
                "max-w-[85%]",
                msg.role === 'user' ? "user-bubble" : "ai-bubble"
              )}>
                <div className="markdown-body">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-3xl mx-auto w-full">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-500/15 border border-indigo-500/20">
                <Hexagon className={cn("w-4 h-4", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
              </div>
              <div className="ai-bubble flex items-center gap-1.5 py-4">
                <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
                <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.15s]", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
                <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.3s]", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
              </div>
            </div>
          )}
        </div>

        {/* ── Input ── */}
        <div className="px-4 md:px-8 py-4 border-t border-white/5 shrink-0">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isAntigravity ? 'Float a question into the cosmos...' : 'Ask anything...'}
                className="chat-input"
                style={{ maxHeight: '200px' }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-center mt-3 gap-1.5 text-[11px] text-slate-500">
              <span>Built by</span>
              <span className="text-indigo-400 font-medium">Prajwal Chaple</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
