'use client';

import { useState } from 'react';
import { ContractAnalysisResponse } from '@/app/api/check/route';

interface AnalysisResultsProps {
  results: ContractAnalysisResponse;
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const [copiedRewrite, setCopiedRewrite] = useState(false);
  const [copiedNotes, setCopiedNotes] = useState(false);

  const handleCopy = async (text: string, type: 'rewrite' | 'notes') => {
    try {
      await navigator.clipboard.writeText(text);
      
      if (type === 'rewrite') {
        setCopiedRewrite(true);
        setTimeout(() => setCopiedRewrite(false), 2000);
      } else if (type === 'notes') {
        setCopiedNotes(true);
        setTimeout(() => setCopiedNotes(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Payment': 'bg-blue-100 text-blue-800 border-blue-200',
      'Termination': 'bg-purple-100 text-purple-800 border-purple-200',
      'Liability': 'bg-red-100 text-red-800 border-red-200',
      'Confidentiality': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Force Majeure': 'bg-orange-100 text-orange-800 border-orange-200',
      'Formation': 'bg-teal-100 text-teal-800 border-teal-200',
      'Penalties': 'bg-pink-100 text-pink-800 border-pink-200',
      'Commercial': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors['Other'];
  };


  return (
    <div className="space-y-6">
      {/* Header with Badges */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(results.severity)}`}>
            {results.severity === 'high' && '🚨'} 
            {results.severity === 'medium' && '⚠️'} 
            {results.severity === 'low' && '✅'} 
            {results.severity.charAt(0).toUpperCase() + results.severity.slice(1)} Risk
          </span>
          
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(results.category)}`}>
            📋 {results.category}
          </span>
        </div>
      </div>

      {/* Issues Found */}
      {results.issues && results.issues.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔍 Issues Found
          </h3>
          
          <div className="space-y-3">
            {results.issues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 border-l-4 border-red-400 rounded-md">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-800 leading-relaxed" dir="auto">
                  {issue}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Rewrite */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            ✍️ Suggested Rewrite
          </h3>
          <button
            onClick={() => handleCopy(results.rewrite, 'rewrite')}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors"
          >
            {copiedRewrite ? (
              <>
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap" dir="auto">
            {results.rewrite}
          </p>
        </div>
      </div>

      {/* Legal Notes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            📚 Legal Guidance & Notes
          </h3>
          <button
            onClick={() => handleCopy(results.notes, 'notes')}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors"
          >
            {copiedNotes ? (
              <>
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap" dir="auto">
            {results.notes}
          </p>
        </div>
      </div>

    </div>
  );
}
