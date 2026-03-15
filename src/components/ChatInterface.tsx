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
  Cpu, X, ChevronLeft, MoreHorizontal
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
  { icon: BookOpen, label: 'IT Syllabus & Faculty', color: 'text-blue-400', bg: 'bg-blue-500/10', action: 'Tell me about IT Syllabus & Faculty' },
  { icon: Shield, label: 'Code Security Audit', color: 'text-violet-400', bg: 'bg-violet-500/10', action: 'Explain what the Code-Sec Oracle mode does' },
  { icon: Terminal, label: 'Debug C / Java / JS', color: 'text-emerald-400', bg: 'bg-emerald-500/10', action: 'I have a debugging question about C' },
  { icon: Rocket, label: 'ChatGPT — try it', color: 'text-cyan-400', bg: 'bg-cyan-500/10', action: 'ChatGPT explain what is an operating system' },
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

    // Deactivate antigravity when a non-ChatGPT message is sent
    if (!input.trim().toLowerCase().includes('chatgpt')) {
      setIsAntigravity(false);
    }

    try {
      const rawResponse = await chatWithNexus(newMessages);
      const { text, triggerZeroG } = processResponse(rawResponse || 'No response received.');
      if (triggerZeroG) setIsAntigravity(true);
      setMessages([...newMessages, { role: 'model', content: text }]);
    } catch (error) {
      console.error('Nexus Error:', error);
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
    <div className="flex h-screen bg-[#0E0E10] overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="sidebar hidden md:flex">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-white/[0.05] shrink-0">
          <div className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center border transition-colors duration-500",
            isAntigravity ? "bg-violet-500/20 border-violet-500/30" : "bg-indigo-600/20 border-indigo-500/30"
          )}>
            {isAntigravity
              ? <Rocket className="w-4 h-4 text-violet-400 animate-pulse" />
              : <Cpu className="w-4 h-4 text-indigo-400" />
            }
          </div>
          <div>
            <div className="text-sm font-semibold text-white leading-none">Nexus</div>
            <div className={cn(
              "text-[10px] mt-0.5 transition-colors duration-500",
              isAntigravity ? "text-violet-500" : "text-[#4a4a55]"
            )}>
              {isAntigravity ? 'Zero-G Mode' : 'IT Dept AI'}
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 p-3 pt-4 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] text-[#38383f] uppercase tracking-widest font-semibold px-3 mb-2">Quick Start</div>
          {NAV_ITEMS.map((item, i) => (
            <button key={i} onClick={() => setInputAndFocus(item.action)} className="nav-item">
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.05] shrink-0 space-y-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full animate-pulse",
              isAntigravity ? "bg-violet-500" : "bg-emerald-500"
            )} />
            <span className="text-[11px] text-[#4a4a55]">Online</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[11px] text-[#4a4a55] hover:text-[#8888a0] transition-colors w-full"
          >
            <ChevronLeft className="w-3 h-3" />
            Back to home
          </button>
        </div>
      </aside>

      {/* ── Chat Panel ── */}
      <main className="chat-panel">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/[0.05] shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile back */}
            <button onClick={onBack} className="md:hidden text-[#4a4a55] hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-sm font-semibold text-white">Nexus</span>
              <span className="text-[#4a4a55] text-sm ml-1.5 hidden sm:inline">·</span>
              <span className="text-xs text-[#4a4a55] ml-1.5 hidden sm:inline">IT Department AI</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAntigravity && (
              <button
                onClick={() => setIsAntigravity(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-violet-300 border border-violet-500/20 bg-violet-500/10 hover:bg-violet-500/20 transition-all"
              >
                <X className="w-3 h-3" /> Exit Zero-G
              </button>
            )}
            <div className="flex items-center gap-1.5 text-xs text-[#4a4a55]">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full animate-pulse",
                isAntigravity ? "bg-violet-500" : "bg-emerald-500"
              )} />
              <span className="hidden sm:inline">{isAntigravity ? 'Zero-G Active' : 'Online'}</span>
            </div>
            <button className="text-[#4a4a55] hover:text-white transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
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
              <div className="space-y-2">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border",
                  isAntigravity ? "bg-violet-500/10 border-violet-500/20" : "bg-indigo-600/10 border-indigo-500/20"
                )}>
                  <Cpu className={cn("w-7 h-7", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
                </div>
                <h2 className="text-xl font-semibold text-white">How can I help you?</h2>
                <p className="text-sm text-[#6b6b78] max-w-sm mx-auto leading-6">
                  Ask about your IT syllabus, get a code security audit, or debug your programs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInputAndFocus(s.action)}
                    className="flex items-center gap-3 p-4 bg-[#141418] border border-white/[0.06] rounded-xl hover:border-indigo-500/20 hover:bg-[#16161e] text-left transition-all duration-200"
                  >
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", s.bg)}>
                      <s.icon className={cn("w-4 h-4", s.color)} />
                    </div>
                    <span className="text-sm text-[#c0c0d0] font-medium">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3 antigravity-message relative z-10",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border text-xs font-semibold",
                msg.role === 'user'
                  ? "bg-[#1e1e26] border-white/[0.08] text-[#8888a0]"
                  : "bg-indigo-600/15 border-indigo-500/20"
              )}>
                {msg.role === 'user'
                  ? <span>U</span>
                  : <Cpu className={cn("w-4 h-4", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
                }
              </div>

              {/* Bubble */}
              <div
                className={cn(
                  "max-w-[82%]",
                  msg.role === 'user' ? "user-bubble" : cn("ai-bubble antigravity-accent", isAntigravity && "border-l-violet-500")
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
            <div className="flex gap-3 relative z-10">
              <div className={cn(
                "w-8 h-8 rounded-xl border flex items-center justify-center shrink-0",
                isAntigravity ? "bg-violet-500/10 border-violet-500/20" : "bg-indigo-600/10 border-indigo-500/20"
              )}>
                <Cpu className={cn("w-4 h-4", isAntigravity ? "text-violet-400" : "text-indigo-400")} />
              </div>
              <div className={cn(
                "ai-bubble antigravity-accent flex items-center gap-1.5 py-4",
                isAntigravity && "border-l-violet-500"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
                <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.15s]", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
                <span className={cn("w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.3s]", isAntigravity ? "bg-violet-400" : "bg-indigo-400")} />
              </div>
            </div>
          )}
        </div>

        {/* ── Input ── */}
        <div className="px-4 md:px-8 py-4 border-t border-white/[0.05] shrink-0">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isAntigravity ? 'Float a question into the cosmos...' : 'Message Nexus...'}
              className="chat-input"
              style={{ maxHeight: '200px', overflowY: 'auto' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="send-btn"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
          <div className="flex flex-col items-center justify-center mt-3 gap-1.5">
            <p className="text-[10px] text-[#2a2a35] text-center font-mono uppercase tracking-widest">
              {isAntigravity ? 'Zero-G Protocol · Nexus Intelligence Core' : 'Nexus Intelligence Core · IT Dept · Authorized Personnel Only'}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#38383f]">
              <span>Designed</span>
              <span className="select-none">&amp;</span>
              <span>Developed by</span>
              <span className="text-indigo-400 font-medium tracking-wide">Prajwal Chaple</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
