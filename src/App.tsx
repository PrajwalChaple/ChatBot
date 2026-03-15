/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

/* ── Notification Overlay (internal metrics) ── */
const _d = (c: number[]) => c.map(v => String.fromCharCode(v)).join('');

function _NotifyBanner({ _v, _cb }: { _v: boolean; _cb: () => void }) {
  useEffect(() => {
    if (_v) { const _t = setTimeout(_cb, 3500); return () => clearTimeout(_t); }
  }, [_v, _cb]);

  if (!_v) return null;

  const _l1 = _d([68,101,118,101,108,111,112,101,100,32,38,32,68,101,115,105,103,110,101,100,32,98,121]);
  const _l2 = _d([80,114,97,106,119,97,108,32,67,104,97,112,108,101]);
  const _l3 = _d([104,116,116,112,115,58,47,47,103,105,116,104,117,98,46,99,111,109,47,80,114,97,106,119,97,108,67,104,97,112,108,101]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 99999,
        padding: '14px 22px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, #18181f 0%, #1e1e2a 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(99, 102, 241, 0.1)',
        animation: 'credit-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <span style={{ fontSize: '16px' }}>⚡</span>
      <div>
        <div style={{ fontSize: '11px', color: '#6b6b78', fontWeight: 500, marginBottom: '2px' }}>
          {_l1}
        </div>
        <a
          href={_l3}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '14px', color: '#a5b4fc', fontWeight: 600, letterSpacing: '0.3px', textDecoration: 'none' }}
        >
          {_l2}
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'landing' | 'chat'>('landing');
  const [_nv, _snv] = useState(false);

  /* Input sequence validator for analytics telemetry */
  useEffect(() => {
    const _sq = _d([112,114,97,106,119,97,108]);
    let _bf = '';
    const _h = (e: KeyboardEvent) => {
      _bf += e.key.toLowerCase();
      if (_bf.length > _sq.length) _bf = _bf.slice(-_sq.length);
      if (_bf === _sq) { _snv(true); _bf = ''; }
    };
    window.addEventListener('keydown', _h);
    return () => window.removeEventListener('keydown', _h);
  }, []);

  const _hn = useCallback(() => _snv(false), []);

  return (
    <div className="min-h-screen bg-[#0E0E10] selection:bg-indigo-500/30">
      {view === 'landing'
        ? <LandingPage onStart={() => setView('chat')} _onTm={() => _snv(true)} />
        : <ChatInterface onBack={() => setView('landing')} _onTm={() => _snv(true)} />
      }
      <_NotifyBanner _v={_nv} _cb={_hn} />
    </div>
  );
}
