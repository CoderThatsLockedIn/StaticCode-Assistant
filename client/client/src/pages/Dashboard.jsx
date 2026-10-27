import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await API.get('/reviews');
        // Safely extract array data matching your backend controller response
        const reviewData = res.data?.data || res.data || [];
        setReviews(Array.isArray(reviewData) ? reviewData : []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-16">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Review History</h2>
          <p className="text-sm text-zinc-400 mt-1">Monitor and inspect your recent code analysis sessions.</p>
        </div>
        <Link to="/review/new" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20">
          + New Code Review
        </Link>
      </div>

      {error && <div className="mb-6 p-4 bg-red-950 border border-red-900 text-red-300 rounded-xl text-sm">{error}</div>}

      {loading ? (
        <div className="text-center py-16 text-zinc-400">Loading review history...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 mb-4">No review sessions found yet.</p>
          <Link to="/review/new" className="text-indigo-400 font-medium hover:underline text-sm">Start your first code analysis →</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((rev) => {
            const high = rev.summary?.high ?? 0;
            const medium = rev.summary?.medium ?? 0;
            const low = rev.summary?.low ?? 0;
            const totalIssues = high + medium + low;

            return (
              <Link 
                key={rev._id} 
                to={`/review/${rev._id}`}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex justify-between items-start shadow-md hover:border-indigo-600/50 hover:bg-zinc-850 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{rev.title}</h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded">
                      {rev.language}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 mb-3">
                    Static analysis completed. Found <span className="text-white font-medium">{totalIssues}</span> total issue{totalIssues === 1 ? '' : 's'}.
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <span className="px-2 py-1 bg-red-950/80 text-red-400 rounded-lg border border-red-900/50 font-medium">
                      High: {high}
                    </span>
                    <span className="px-2 py-1 bg-amber-950/80 text-amber-400 rounded-lg border border-amber-900/50 font-medium">
                      Medium: {medium}
                    </span>
                    <span className="px-2 py-1 bg-blue-950/80 text-blue-400 rounded-lg border border-blue-900/50 font-medium">
                      Low: {low}
                    </span>
                  </div>

                  <span className="text-xs text-zinc-500">Created on {new Date(rev.createdAt).toLocaleString()}</span>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wide uppercase ${rev.status === 'completed' || rev.status === 'PASSED' ? 'bg-emerald-950 border border-emerald-800/60 text-emerald-400' : 'bg-amber-950 border border-amber-800/60 text-amber-400'}`}>
                  {rev.status}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
