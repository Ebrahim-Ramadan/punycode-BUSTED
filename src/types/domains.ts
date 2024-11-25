export interface DomainPart {
    original: string;
    punycode: string;
    containsNonAscii: boolean;
    isPunycode: boolean;
  }
  
  export interface DomainAnalysis {
    parts: DomainPart[];
    isSuspicious: boolean;
  }
  
  export interface ValidationResult {
    isValid: boolean;
    error?: string;
  }