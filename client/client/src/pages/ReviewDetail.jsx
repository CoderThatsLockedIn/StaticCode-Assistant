import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

export default function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/reviews/${id}`)
      .then((res) => setReview(res.data.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to fetch review details'));
  }, [id]);

  if (error) return <div className="max-w-4xl mx-auto mt-10 p-4 bg-red-950 text-red-300 rounded-xl">{error}</div>;
  if (!review) return <div className="max-w-4xl mx-auto mt-10 text-zinc-400">Loading analysis details...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 pb-16">
      <Link to="/dashboard" className="text-sm text-indigo-400 hover:underline mb-6 inline-block">← Back to Dashboard</Link>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{review.title}</h2>
          <span className="text-xs uppercase font-bold px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded">{review.language}</span>
        </div>
        <div className="flex gap-3 text-xs mb-6">
          <span className="px-2.5 py-1 bg-red-950 text-red-400 rounded border border-red-900/50">High: {review.summary?.high ?? 0}</span>
          <span className="px-2.5 py-1 bg-amber-950 text-amber-400 rounded border border-amber-900/50">Medium: {review.summary?.medium ?? 0}</span>
          <span className="px-2.5 py-1 bg-blue-950 text-blue-400 rounded border border-blue-900/50">Low: {review.summary?.low ?? 0}</span>
        </div>

        {/* Source Code Viewer */}
        <h3 className="text-sm font-semibold text-zinc-300 mb-2">Submitted Source Code</h3>
        <pre className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs text-zinc-300 overflow-x-auto font-mono">
          <code>{review.sourceCode}</code>
        </pre>
      </div>

      {/* AI Findings & Feedback Section */}
      <h3 className="text-xl font-bold text-white mb-4">AI Findings & Recommendations</h3>
      {review.findings.length === 0 ? (
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-emerald-400 text-sm">
          🎉 No issues found! Your code is clean and well-structured.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {review.findings.map((finding, index) => (
            <div key={index} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-900/50 rounded">
                    {finding.category}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    finding.severity === 'High' ? 'bg-red-950 text-red-400 border border-red-900/50' :
                    finding.severity === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-900/50' :
                    'bg-blue-950 text-blue-400 border border-blue-900/50'
                  }`}>
                    {finding.severity} Severity
                  </span>
                </div>
                {finding.lineStart && (
                  <span className="text-xs text-zinc-500 font-mono">Lines {finding.lineStart}-{finding.lineEnd || finding.lineStart}</span>
                )}
              </div>
              <p className="text-sm text-zinc-200 mb-3">{finding.message}</p>
              {finding.suggestedFix && (
                <div className="mt-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs">
                  <span className="text-indigo-400 font-semibold block mb-1">Suggested Fix:</span>
                  <span className="text-zinc-300 font-mono">{finding.suggestedFix}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}