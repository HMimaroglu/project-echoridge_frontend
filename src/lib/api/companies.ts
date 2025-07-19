import { apiClient } from './client';
import { CompanySearchResponse, PMFCalculationResponse, Company, SearchFilters } from './types';

export async function fetchCompanies(
  query: string,
  filters?: SearchFilters,
  page: number = 1,
  limit: number = 20
): Promise<CompanySearchResponse> {
  const params: Record<string, string> = {
    query: query.trim(),
    page: page.toString(),
    limit: limit.toString(),
  };

  if (filters) {
    if (filters.industry && filters.industry.length > 0) {
      params.industry = filters.industry.join(',');
    }
    if (filters.size && filters.size.length > 0) {
      params.size = filters.size.join(',');
    }
    if (filters.location && filters.location.length > 0) {
      params.location = filters.location.join(',');
    }
    if (filters.pmfScore) {
      params.pmfScoreMin = filters.pmfScore.min.toString();
      params.pmfScoreMax = filters.pmfScore.max.toString();
    }
    if (filters.employeeCount) {
      params.employeeMin = filters.employeeCount.min.toString();
      params.employeeMax = filters.employeeCount.max.toString();
    }
    if (filters.foundedYear) {
      params.foundedMin = filters.foundedYear.min.toString();
      params.foundedMax = filters.foundedYear.max.toString();
    }
  }

  return apiClient.get<CompanySearchResponse>('/companies', params);
}

export async function fetchCompanyById(id: string): Promise<Company> {
  const response = await apiClient.get<{ success: boolean; data: Company }>(`/companies/${id}`);
  return response.data;
}

export async function calculatePMF(
  companyId: string,
  additionalData?: Record<string, any>
): Promise<PMFCalculationResponse> {
  const payload = {
    companyId,
    additionalData: additionalData || {},
    timestamp: new Date().toISOString(),
  };

  return apiClient.post<PMFCalculationResponse>('/pmf/calculate', payload);
}

export async function getCompanyInsights(companyId: string): Promise<{
  competitors: Company[];
  marketAnalysis: {
    size: number;
    growth: number;
    trends: string[];
  };
  recommendations: string[];
}> {
  const response = await apiClient.get<{
    success: boolean;
    data: {
      competitors: Company[];
      marketAnalysis: {
        size: number;
        growth: number;
        trends: string[];
      };
      recommendations: string[];
    };
  }>(`/companies/${companyId}/insights`);
  
  return response.data;
}

export async function searchSimilarCompanies(
  companyId: string,
  limit: number = 10
): Promise<Company[]> {
  const response = await apiClient.get<{
    success: boolean;
    data: Company[];
  }>(`/companies/${companyId}/similar`, { limit: limit.toString() });
  
  return response.data;
}

export async function getIndustryOverview(industry: string): Promise<{
  totalCompanies: number;
  averagePMFScore: number;
  growthRate: number;
  topCompanies: Company[];
  trends: string[];
}> {
  const response = await apiClient.get<{
    success: boolean;
    data: {
      totalCompanies: number;
      averagePMFScore: number;
      growthRate: number;
      topCompanies: Company[];
      trends: string[];
    };
  }>('/industries/overview', { industry });
  
  return response.data;
}

// Mock data for development/demo purposes
export function getMockCompanies(): Company[] {
  return [
    {
      id: '1',
      name: 'TechStartup Inc',
      industry: 'Technology',
      description: 'Innovative AI-powered solutions for enterprise automation',
      website: 'https://techstartup.com',
      size: 'startup',
      location: {
        city: 'San Francisco',
        country: 'USA',
        region: 'North America',
      },
      founded: 2020,
      employees: 50,
      revenue: 2500000,
      tags: ['AI', 'Automation', 'SaaS'],
      pmfScore: 78,
      growthRate: 120,
      marketTrend: 'growing',
      contactInfo: {
        email: 'contact@techstartup.com',
        linkedin: 'https://linkedin.com/company/techstartup',
      },
    },
    {
      id: '2',
      name: 'Global Manufacturing Co',
      industry: 'Manufacturing',
      description: 'Leading manufacturer of sustainable industrial equipment',
      website: 'https://globalmanufacturing.com',
      size: 'large',
      location: {
        city: 'Detroit',
        country: 'USA',
        region: 'North America',
      },
      founded: 1995,
      employees: 5000,
      revenue: 250000000,
      marketCap: 1200000000,
      tags: ['Manufacturing', 'Sustainability', 'Industrial'],
      pmfScore: 85,
      growthRate: 15,
      marketTrend: 'stable',
      contactInfo: {
        email: 'info@globalmanufacturing.com',
        phone: '+1-555-0123',
        linkedin: 'https://linkedin.com/company/global-manufacturing',
      },
    },
    {
      id: '3',
      name: 'FinTech Solutions',
      industry: 'Financial Services',
      description: 'Digital banking and payment processing solutions',
      website: 'https://fintechsolutions.com',
      size: 'medium',
      location: {
        city: 'New York',
        country: 'USA',
        region: 'North America',
      },
      founded: 2018,
      employees: 250,
      revenue: 45000000,
      tags: ['FinTech', 'Banking', 'Payments'],
      pmfScore: 82,
      growthRate: 95,
      marketTrend: 'growing',
      contactInfo: {
        email: 'hello@fintechsolutions.com',
        linkedin: 'https://linkedin.com/company/fintech-solutions',
      },
    },
  ];
}