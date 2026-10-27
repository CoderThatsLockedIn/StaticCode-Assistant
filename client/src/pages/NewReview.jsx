import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // Use your centralized Axios client!

export default function NewReview() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [sourceCode, setSourceCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Tab key press to insert 4 spaces instead of shifting browser focus
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const { selectionStart, selectionEnd } = e.target;
      const tabSpaces = '    '; // 4 spaces

      const newCode =
        sourceCode.substring(0, selectionStart) +
        tabSpaces +
        sourceCode.substring(selectionEnd);

      setSourceCode(newCode);

      // Move cursor right after inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + tabSpaces.length;
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !sourceCode.trim()) {
      setError('Please provide both a title and code snippet.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use your configured API client pointing to your Vercel backend
      const response = await API.post('/reviews', {
        title,
        language,
        sourceCode,
      });

      const data = response.data;

      // Safely grab ID from any potential response structure (_id, id, review._id)
      const reviewId = data._id || data.id || data.review?._id || data.data?._id;

      if (!reviewId) {
        throw new Error('Review created, but no review ID was returned.');
      }

      // Redirect immediately to the review detail page
      navigate(`/review/${reviewId}`);
    } catch (err) {
      console.error('Submission Error:', err);
      setError(err.response?.data?.error || err.message || 'Something went wrong while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-zinc-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">New Code Review</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Paste your code snippet below to perform multi-language AI static analysis.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            Review Title
          </label>
          <input
            type="text"
            placeholder="e.g., Dijkstra Algorithm Bug Fix"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-600 transition"
          />
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            Programming Language / Syntax
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-600 transition cursor-pointer"
          >
            <option value="javascript">JavaScript / TypeScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="mysql">MySQL / SQL</option>
            <option value="html">HTML / CSS</option>
          </select>
        </div>

        {/* Source Code Textarea */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            Source Code
          </label>
          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={14}
            placeholder="Paste your code snippet here... (Press Tab to indent 4 spaces)"
            className="w-full font-mono text-sm p-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-indigo-600 text-zinc-100 placeholder-zinc-600 transition leading-relaxed"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Analyzing Code...
              </>
            ) : (
              'Run AI Static Analysis'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
