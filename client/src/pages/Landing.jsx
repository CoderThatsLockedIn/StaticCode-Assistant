import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-800/50 text-indigo-400 text-xs font-semibold mb-6 tracking-wide uppercase">
        ⚡ Next-Gen Static Analysis
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 text-white leading-tight">
        Elevate your code quality with automated intelligence
      </h1>
      <p className="text-lg text-zinc-400 max-w-xl mb-10">
        Perform lightning-fast static code analysis, detect security vulnerabilities, and maintain pristine code hygiene across your entire codebase.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link 
          to="/register" 
          className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200"
        >
          Get Started Free
        </Link>
        <Link 
          to="/login" 
          className="px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold transition-all duration-200"
        >
          Sign In
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full text-left">
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 font-bold">🛡️</div>
          <h3 className="text-white font-semibold mb-2">Secure Architecture</h3>
          <p className="text-zinc-400 text-sm">Protected via HttpOnly cookies and robust JWT validation standards.</p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-bold">⚡</div>
          <h3 className="text-white font-semibold mb-2">Instant Analysis</h3>
          <p className="text-zinc-400 text-sm">Run multi-rule static inspections on JavaScript and Python instantly.</p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 font-bold">📊</div>
          <h3 className="text-white font-semibold mb-2">Detailed History</h3>
          <p className="text-zinc-400 text-sm">Track past review findings, status passes, and summaries in your dashboard.</p>
        </div>
      </div>
    </div>
  );
}