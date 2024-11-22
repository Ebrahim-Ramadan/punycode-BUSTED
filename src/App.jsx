import React, { useState , lazy} from 'react';
import { AlertCircle, Shield, ShieldAlert } from 'lucide-react';

const PunycodeDetector = () => {
  const [domain, setDomain] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const isValidDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    const hasUrlParts = /^(https?:\/\/|www\.|\/|mailto:|ftp:)/i.test(domain);
    return domainRegex.test(domain) && !hasUrlParts;
  };

  const cleanDomain = (input) => {
    return input
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .replace(/\/.*$/, '');
  };

  /**
   * Analyze the domain name entered by the user and checks if it contains
   * punycode or non-ascii characters.
   *
   * @returns {void}
   */
  const analyzeDomain = () => {
    setError('');
    setAnalysis(null);

    const cleanedDomain = cleanDomain(domain.trim());

    // if (!isValidDomain(cleanedDomain)) {
    //   setError('Please enter a valid domain name (e.g., "example.com")');
    //   return;
    // }

    const punyCoded = cleanedDomain.toLowerCase().split('.').map(part => {
      try {
        const ascii = part.includes('xn--') ? part : `xn--${part}`;
        return {
          original: part,
          punycode: ascii,
          containsNonAscii: /[^\u0000-\u007F]/.test(part),
          isPunycode: part.includes('xn--')
        };
      } catch (e) {
        return {
          original: part,
          punycode: part,
          containsNonAscii: false,
          isPunycode: false
        };
      }
    });

    setAnalysis({
      parts: punyCoded,
      isSuspicious: punyCoded.some(p => p.containsNonAscii || p.isPunycode)
    });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      analyzeDomain();
    }
  };
  

  return (
    <div className="w-full flex flex-col items-center justify-center bg-black py-8 px-2">
      
      <div className="w-full md:max-w-2xl bg-neutral-950 rounded-lg shadow-xl p-2 py-4 md:p-8">
        <div className="mb-6">
          <p className="text-2xl font-bold text-white text-center">PUNYCODE BUSTED</p>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2 flex-col md:flex-row">
            <input
              placeholder="Enter domain name"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              onClick={analyzeDomain}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
            >
              Analyze
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-4">
              <div className={`flex items-center gap-2 p-4 rounded-lg ${
                analysis.isSuspicious 
                  ? 'bg-red-900/50 border border-red-700 text-red-200' 
                  : 'bg-green-900/50 border border-green-700 text-green-200'
              }`}>
                {analysis.isSuspicious ? (
                 <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
                 ) : (
                   <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" />
                )}
                <p className='text-sm md:text-base'>
                  {analysis.isSuspicious
                    ? "Warning: This domain contains non-ASCII characters or punycode!"
                    : "Domain appears to be using standard ASCII characters."}
                </p>
              </div>

              <div className="space-y-2">
                {analysis.parts.map((part, idx) => (
                  <div key={idx} className="p-4 bg-neutral-700 rounded-lg">
                    <div className="font-mono text-neutral-200">
                      <div>Original: {part.original}</div>
                      {part.containsNonAscii && (
                        <div className="text-red-400">
                          Punycode: {part.punycode}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default PunycodeDetector;