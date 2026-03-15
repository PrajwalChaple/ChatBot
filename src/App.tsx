/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

export default function App() {
  const [view, setView] = useState<'landing' | 'chat'>('landing');
  return (
    <div className="min-h-screen bg-[#0E0E10] selection:bg-indigo-500/30">
      {view === 'landing'
        ? <LandingPage onStart={() => setView('chat')} />
        : <ChatInterface onBack={() => setView('landing')} />
      }
    </div>
  );
}
