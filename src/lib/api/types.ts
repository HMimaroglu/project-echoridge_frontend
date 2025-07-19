export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  website: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  location: {
    city: string;
    country: string;
    region: string;
  };
  founded: number;
  employees: number;
  revenue?: number;
  marketCap?: number;
  tags: string[];
  pmfScore: number;
  growthRate: number;
  marketTrend: 'growing' | 'stable' | 'declining';
  contactInfo?: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
}

export interface CompanySearchResponse {
  success: boolean;
  data: {
    companies: Company[];
    total: number;
    page: number;
    limit: number;
    query: string;
  };
  meta: {
    searchTime: number;
    suggestions: string[];
    filters: {
      industries: string[];
      sizes: string[];
      locations: string[];
    };
  };
}

export interface PMFCalculation {
  id: string;
  companyId: string;
  score: number;
  factors: {
    marketDemand: number;
    competitorAnalysis: number;
    customerFeedback: number;
    growthMetrics: number;
    financialHealth: number;
  };
  recommendations: string[];
  calculatedAt: string;
  confidence: number;
}

export interface PMFCalculationResponse {
  success: boolean;
  data: PMFCalculation;
  meta: {
    processingTime: number;
    dataPoints: number;
  };
}

export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  message: string;
  type: 'demo' | 'consultation' | 'partnership' | 'support';
}

export interface ContactResponse {
  success: boolean;
  data: {
    id: string;
    status: 'received' | 'processing' | 'responded';
    estimatedResponse: string;
  };
}

export class APIError extends Error {
  public status: number;
  public endpoint: string;
  public timestamp: Date;

  constructor(message: string, status: number, endpoint: string) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.endpoint = endpoint;
    this.timestamp = new Date();
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      endpoint: this.endpoint,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export type SearchFilters = {
  industry?: string[];
  size?: Company['size'][];
  location?: string[];
  pmfScore?: {
    min: number;
    max: number;
  };
  employeeCount?: {
    min: number;
    max: number;
  };
  foundedYear?: {
    min: number;
    max: number;
  };
};