'use client';

import { useState, useEffect } from 'react';
import { fetchCompanies, getMockCompanies } from '../api/companies';
import { Company, CompanySearchResponse, SearchFilters, APIError } from '../api/types';
import { useDebounce } from './useDebounce';

interface UseCompanySearchResult {
  companies: Company[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  searchTime: number | null;
  suggestions: string[];
  search: (query: string, filters?: SearchFilters, page?: number) => Promise<void>;
  clearError: () => void;
  hasMore: boolean;
}

export function useCompanySearch(
  initialQuery: string = '',
  debounceMs: number = 500,
  useMockData: boolean = false
): UseCompanySearchResult {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTime, setSearchTime] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const debouncedQuery = useDebounce(initialQuery, debounceMs);

  const search = async (
    query: string,
    filters?: SearchFilters,
    page: number = 1
  ): Promise<void> => {
    if (!query.trim()) {
      setCompanies([]);
      setTotal(0);
      setSearchTime(null);
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result: CompanySearchResponse;

      if (useMockData) {
        // Simulate API delay for realistic UX
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const mockCompanies = getMockCompanies();
        const filtered = mockCompanies.filter(company =>
          company.name.toLowerCase().includes(query.toLowerCase()) ||
          company.industry.toLowerCase().includes(query.toLowerCase()) ||
          company.description.toLowerCase().includes(query.toLowerCase())
        );

        result = {
          success: true,
          data: {
            companies: filtered,
            total: filtered.length,
            page: 1,
            limit: 20,
            query,
          },
          meta: {
            searchTime: Math.random() * 200 + 50, // Simulate search time
            suggestions: [
              'Technology startups',
              'Manufacturing companies',
              'FinTech solutions',
              'AI companies',
              'SaaS platforms'
            ].filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
            filters: {
              industries: ['Technology', 'Manufacturing', 'Financial Services'],
              sizes: ['startup', 'medium', 'large'],
              locations: ['San Francisco', 'Detroit', 'New York'],
            },
          },
        };
      } else {
        result = await fetchCompanies(query, filters, page, 20);
      }

      if (page === 1) {
        setCompanies(result.data.companies);
      } else {
        setCompanies(prev => [...prev, ...result.data.companies]);
      }

      setTotal(result.data.total);
      setCurrentPage(result.data.page);
      setSearchTime(result.meta.searchTime);
      setSuggestions(result.meta.suggestions);
      
    } catch (err) {
      const errorMessage = err instanceof APIError 
        ? `API Error: ${err.message}` 
        : 'An unexpected error occurred while searching companies';
      
      setError(errorMessage);
      
      // Fallback to mock data if API fails
      if (!useMockData) {
        console.warn('API search failed, falling back to mock data:', err);
        const mockCompanies = getMockCompanies();
        const filtered = mockCompanies.filter(company =>
          company.name.toLowerCase().includes(query.toLowerCase()) ||
          company.industry.toLowerCase().includes(query.toLowerCase())
        );
        
        setCompanies(filtered);
        setTotal(filtered.length);
        setSearchTime(100);
        setSuggestions(['Try: Technology', 'Try: Manufacturing', 'Try: FinTech']);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-search when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== initialQuery) {
      search(debouncedQuery);
    }
  }, [debouncedQuery]);

  const hasMore = companies.length < total;

  return {
    companies,
    loading,
    error,
    total,
    page: currentPage,
    searchTime,
    suggestions,
    search,
    clearError,
    hasMore,
  };
}