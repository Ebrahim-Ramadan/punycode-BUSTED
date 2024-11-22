import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ShieldAlert } from 'lucide-react';

const App = () => {
  const [domain, setDomain] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const isValidDomain = (domain) => {
    // Basic domain validation regex
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    
    // Check for common URL parts that shouldn't be in a domain
    const hasUrlParts = /^(https?:\/\/|www\.|\/|mailto:|ftp:)/i.test(domain);
    
    return domainRegex.test(domain) && !hasUrlParts;
  };

  const cleanDomain = (input) => {
    // Remove common URL parts
    return input
      .replace(/^https?:\/\//i, '')  // Remove protocol
      .replace(/^www\./i, '')        // Remove www.
      .replace(/\/.*$/, '');         // Remove path and query params
  };

  const analyzeDomain = () => {
    setError('');
    setAnalysis(null);

    // Clean the input first
    const cleanedDomain = cleanDomain(domain.trim());

    // Validate the cleaned domain
    if (!isValidDomain(cleanedDomain)) {
      setError('Please enter a valid domain name (e.g., "example.com")');
      return;
    }

    // Proceed with punycode analysis
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

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Punycode Domain Detector</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter domain (e.g. adıdas.de)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1"
          />
          <Button onClick={analyzeDomain}>Analyze</Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysis && (
          <div className="space-y-4">
            <Alert variant={analysis.isSuspicious ? "destructive" : "default"}>
              {analysis.isSuspicious ? (
                <ShieldAlert className="h-4 w-4" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              <AlertDescription>
                {analysis.isSuspicious
                  ? "Warning: This domain contains non-ASCII characters or punycode!"
                  : "Domain appears to be using standard ASCII characters."}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              {analysis.parts.map((part, idx) => (
                <div key={idx} className="p-4 bg-gray-100 rounded-lg">
                  <div className="font-mono">
                    <div>Original: {part.original}</div>
                    {part.containsNonAscii && (
                      <div className="text-red-500">
                        Punycode: {part.punycode}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default App;