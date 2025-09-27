import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moroccan Contract Checker | Legal Compliance Analysis',
  description: 'Analyze your contracts against Moroccan law (Code des Obligations et des Contrats). Get instant feedback on compliance, risks, and suggested improvements in Arabic, French, English, or Darija.',
  keywords: 'Morocco, contract, legal, DOC, obligations, analysis, Arabic, French, English, Darija',
  authors: [{ name: 'Moroccan Contract Checker' }],
  openGraph: {
    title: 'Moroccan Contract Checker',
    description: 'AI-powered contract analysis for Moroccan legal compliance',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">🇲🇦 Moroccan Contract Checker</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                AI-powered contract analysis based on Moroccan Code of Obligations and Contracts (DOC). 
                Helping businesses and individuals ensure legal compliance.
              </p>
            </div>
            
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-500">
                ⚖️ For informational purposes only. Always consult with qualified legal professionals for official advice.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Built for Cursor Hackathon • Powered by OpenAI & Next.js
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}