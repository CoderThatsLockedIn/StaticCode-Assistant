import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await API.get(`/reviews/${id}`);
        setReview(response.data.data || response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load review analysis.');
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-zinc-400 text-sm">
        Loading security analysis...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm">
          {error}
        </div>
        <button onClick={() => navigate('/dashboard')} className="mt-4 text-sm text-indigo-400 hover:underline">
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  if (!review) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 text-zinc-100">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="mb-6 text-sm text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
      >
        ← Back to Dashboard
      </button>

      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{review.title}</h1>
          <p className="text-zinc-400 text-sm mt-1 uppercase tracking-wider font-semibold">
            Language: {review.language}
          </p>
        </div>
      </div>

      {/* Source Code Box */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-zinc-300 mb-2">Submitted Source Code</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-sm overflow-x-auto text-zinc-200">
          <pre>{review.sourceCode}</pre>
        </div>
      </div>

      {/* Vulnerability Analysis Results */}
      <div>
        <h3 className="text-xl font-bold mb-4">Vulnerability & Static Analysis Report</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-300 space-y-4">
          {review.analysis ? (
            <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {typeof review.analysis === 'string' ? review.analysis : JSON.stringify(review.analysis, null, 2)}
            </div>
          ) : (
            <p className="text-zinc-500 italic">No vulnerability findings recorded for this session.</p>
          )}
        </div>
      </div>
    </div>
  );
}
