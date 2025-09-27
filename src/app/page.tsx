'use client';

import { useState } from 'react';
import { ContractAnalysisResponse } from './api/check/route';
import { AnalysisResults } from '@/components/AnalysisResults';
import { InputSection } from '@/components/InputSection';
import { Header } from '@/components/Header';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputLanguage, setOutputLanguage] = useState<'ar' | 'fr' | 'en' | 'darija'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ContractAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter contract text or upload a PDF file');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clause: inputText,
          outputLanguage: outputLanguage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze contract');
      }

      const analysisResults: ContractAnalysisResponse = await response.json();
      setResults(analysisResults);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePDFExtracted = (extractedText: string) => {
    setInputText(extractedText);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <InputSection
            inputText={inputText}
            setInputText={setInputText}
            outputLanguage={outputLanguage}
            setOutputLanguage={setOutputLanguage}
            onAnalyze={handleAnalyze}
            onPDFExtracted={handlePDFExtracted}
            isLoading={isLoading}
          />

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {results && <AnalysisResults results={results} />}
        </div>
      </div>
    </div>
  );
}