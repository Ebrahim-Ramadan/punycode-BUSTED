
import  { useState, useCallback } from 'react';
import { AlertCircle, Shield, ShieldAlert } from 'lucide-react';
import { DomainAnalysis, DomainPart, ValidationResult } from './types/domains';

const App = () => {
  const [domain, setDomain] = useState('');
  const [analysis, setAnalysis] = useState<DomainAnalysis | null>(null);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastAnalyzedDomain, setLastAnalyzedDomain] = useState('');

  // const isValidDomain = (domain) => {
  //   const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  //   const hasUrlParts = /^(https?:\/\/|www\.|\/|mailto:|ftp:)/i.test(domain);
  //   return domainRegex.test(domain) && !hasUrlParts;
  // };

  const cleanDomain = (input: string) => {
    return input
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .replace(/\/.*$/, '');
  };

  const analyzeDomain = useCallback(() => {
    const cleanedDomain = cleanDomain(domain.trim());
    
    // Prevent re-analysis of the same domain
    if (cleanedDomain === lastAnalyzedDomain) return;
    setLastAnalyzedDomain(cleanedDomain);

    if (!cleanedDomain) {
      setError('Please enter a domain name');
      return;
    }

    setError('');
    
    // Don't collapse the height immediately
    const punyCoded :DomainPart[]= cleanedDomain.toLowerCase().split('.').map((part) => {
      try {
        const ascii = part.includes('xn--') ? part : `xn--${part}`;
        const nonasciishit = /[^\u0000-\u007F]/.test(part);
        return {
          original: part,
          punycode: ascii,
          containsNonAscii: /[^\u0000-\u007F]/.test(part),
          isPunycode: part.includes('xn--'),
        };
      } catch (e) {
        return {
          original: part,
          punycode: part,
          containsNonAscii: false,
          isPunycode: false,
        };
      }
    });

    setAnalysis({
      parts: punyCoded,
      isSuspicious: punyCoded.some((p) => p.containsNonAscii || p.isPunycode),
    });
    
    if (!isExpanded) {
      setIsExpanded(true);
    }
  }, [domain, lastAnalyzedDomain, isExpanded]);

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      analyzeDomain();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-black/10 py-8 px-2 min-h-screen">
      <div
        className="inset-0 absolute top-0 left-0 w-full h-full bg-black -z-10"
        style={{
          backgroundImage: `url(${new URL('./assets/dark-bg.png', import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(70px)',
        }}
      ></div>

<div className="fixed inset-0 h-[100lvh] pointer-events-none contain-strict z-[-1]">
  <div className="absolute top-0 left-0 opacity-75">
    <img src="https://static.cdn-luma.com/files/2314fa198506e8e8/blue-background-blob.png" className="pointer-events-none" alt=""/>
  </div>
  <div className="absolute -bottom-[250px] -right-[150px] opacity-75 hidden max-small:block">
    <img src="https://static.cdn-luma.com/files/2314fa198506e8e8/green-background-blob.png" className="pointer-events-none" alt=""/>
  </div>
</div>


      <div className="w-full md:max-w-2xl bg-white dark:bg-neutral-950/30 rounded-lg shadow-sm p-2 py-4 md:p-8 ">
        <div className="mb-6">
          <p className="text-2xl font-bold text-black dark:text-white text-center">
            PUNYCODE BUSTED
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2 flex-col md:flex-row">
            <input
              placeholder="Enter domain name"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                // Reset lastAnalyzedDomain when input changes
                if (e.target.value.trim() !== domain.trim()) {
                  setLastAnalyzedDomain('');
                }
              }}
              onKeyDown={handleKeyPress}
              autoFocus
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={analyzeDomain}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-neutral-800"
            >
              Analyze
            </button>
          </div>

          <div className="transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: isExpanded ? '1000px' : '0' }}>
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg text-red-600 dark:text-red-200">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-4 transform transition-all duration-500 ease-in-out opacity-100">
                <div
                  className={`flex items-center gap-2 p-4 rounded-lg ${
                    analysis.isSuspicious
                      ? 'bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-200'
                      : 'bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 text-green-600 dark:text-green-200'
                  }`}
                >
                  {analysis.isSuspicious ? (
                    <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm md:text-base">
                    {analysis.isSuspicious
                      ? 'Warning: This domain contains non-ASCII characters or punycode!'
                      : 'Domain appears to be using standard ASCII characters.'}
                  </p>
                </div>

                <div className="space-y-2">
                  {analysis.parts.map((part, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg transform transition-all duration-300 ease-in-out"
                      style={{
                        opacity: isExpanded ? 1 : 0,
                        transform: `translateY(${isExpanded ? '0' : '20px'})`,
                        transitionDelay: `${idx * 100}ms`
                      }}
                    >
                      <div className="font-mono text-black dark:text-neutral-50">
                        <div>Original: {part.original}</div>
                        {part.containsNonAscii && (
                          <div className="text-red-500 dark:text-red-400">
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
    </div>
  );
};

export default App;