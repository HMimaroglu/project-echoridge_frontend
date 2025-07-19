import { renderHook, waitFor, act } from '@testing-library/react'
import { useCompanySearch } from '@/lib/hooks/useCompanySearch'
import { fetchCompanies } from '@/lib/api/companies'
import { APIError } from '@/lib/api/types'

// Mock the API functions
jest.mock('@/lib/api/companies', () => ({
  fetchCompanies: jest.fn(),
  getMockCompanies: jest.fn(() => [
    {
      id: '1',
      name: 'Tech Corp',
      industry: 'Technology',
      description: 'A technology company',
      size: 'large',
      location: 'San Francisco',
      founded: 2010,
      website: 'https://techcorp.com',
      employees: 1000,
      revenue: 100000000,
    },
    {
      id: '2',
      name: 'Manufacturing Inc',
      industry: 'Manufacturing',
      description: 'A manufacturing company',
      size: 'medium',
      location: 'Detroit',
      founded: 2005,
      website: 'https://manufacturing.com',
      employees: 500,
      revenue: 50000000,
    },
  ]),
}))

// Mock the useDebounce hook
jest.mock('@/lib/hooks/useDebounce', () => ({
  useDebounce: (value: string, delay: number) => value, // Return immediately for tests
}))

const mockFetchCompanies = fetchCompanies as jest.MockedFunction<typeof fetchCompanies>

describe('useCompanySearch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Initial State', () => {
    it('returns correct initial state', () => {
      const { result } = renderHook(() => useCompanySearch())
      
      expect(result.current).toEqual({
        companies: [],
        loading: false,
        error: null,
        total: 0,
        page: 1,
        searchTime: null,
        suggestions: [],
        search: expect.any(Function),
        clearError: expect.any(Function),
        hasMore: false,
      })
    })

    it('accepts initial query parameter', () => {
      const initialQuery = 'tech'
      const { result } = renderHook(() => useCompanySearch(initialQuery))
      
      expect(result.current.companies).toEqual([])
      expect(result.current.loading).toBe(false)
    })

    it('accepts custom debounce time', () => {
      const { result } = renderHook(() => useCompanySearch('', 1000))
      
      expect(result.current).toBeDefined()
    })
  })

  describe('Search Functionality', () => {
    describe('With Mock Data', () => {
      it('performs search with mock data successfully', async () => {
        const { result } = renderHook(() => useCompanySearch('', 500, true))
        
        await act(async () => {
          await result.current.search('tech')
        })

        expect(result.current.companies).toHaveLength(1)
        expect(result.current.companies[0].name).toBe('Tech Corp')
        expect(result.current.total).toBe(1)
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBeNull()
        expect(result.current.searchTime).toBeGreaterThan(0)
        expect(result.current.suggestions).toHaveLength(1)
      })

      it('filters companies by name, industry, and description', async () => {
        const { result } = renderHook(() => useCompanySearch('', 500, true))
        
        // Search by name
        await act(async () => {
          await result.current.search('Tech')
        })
        expect(result.current.companies).toHaveLength(1)
        expect(result.current.companies[0].name).toBe('Tech Corp')

        // Search by industry
        await act(async () => {
          await result.current.search('Manufacturing')
        })
        expect(result.current.companies).toHaveLength(1)
        expect(result.current.companies[0].industry).toBe('Manufacturing')
      })

      it('shows loading state during search', async () => {
        const { result } = renderHook(() => useCompanySearch('', 500, true))
        
        act(() => {
          result.current.search('tech')
        })

        expect(result.current.loading).toBe(true)

        await waitFor(() => {
          expect(result.current.loading).toBe(false)
        })
      })

      it('simulates realistic search delay', async () => {
        const { result } = renderHook(() => useCompanySearch('', 500, true))
        
        const startTime = Date.now()
        
        await act(async () => {
          await result.current.search('tech')
        })

        const endTime = Date.now()
        expect(endTime - startTime).toBeGreaterThanOrEqual(300) // Mock delay
      })
    })

    describe('With API Data', () => {
      it('performs successful API search', async () => {
        const mockResponse = {
          success: true,
          data: {
            companies: [
              { id: '1', name: 'API Company', industry: 'Technology' },
            ],
            total: 1,
            page: 1,
            limit: 20,
            query: 'api',
          },
          meta: {
            searchTime: 150,
            suggestions: ['API suggestions'],
            filters: {
              industries: ['Technology'],
              sizes: ['startup'],
              locations: ['SF'],
            },
          },
        }

        mockFetchCompanies.mockResolvedValue(mockResponse)

        const { result } = renderHook(() => useCompanySearch('', 500, false))
        
        await act(async () => {
          await result.current.search('api')
        })

        expect(mockFetchCompanies).toHaveBeenCalledWith('api', undefined, 1, 20)
        expect(result.current.companies).toEqual(mockResponse.data.companies)
        expect(result.current.total).toBe(1)
        expect(result.current.searchTime).toBe(150)
        expect(result.current.suggestions).toEqual(['API suggestions'])
      })

      it('handles API search with filters and pagination', async () => {
        const mockResponse = {
          success: true,
          data: {
            companies: [{ id: '2', name: 'Filtered Company' }],
            total: 10,
            page: 2,
            limit: 20,
            query: 'filtered',
          },
          meta: {
            searchTime: 200,
            suggestions: [],
            filters: { industries: [], sizes: [], locations: [] },
          },
        }

        mockFetchCompanies.mockResolvedValue(mockResponse)

        const { result } = renderHook(() => useCompanySearch())
        const filters = { industry: 'Technology', size: 'startup' }
        
        await act(async () => {
          await result.current.search('filtered', filters, 2)
        })

        expect(mockFetchCompanies).toHaveBeenCalledWith('filtered', filters, 2, 20)
        expect(result.current.companies).toEqual(mockResponse.data.companies)
        expect(result.current.page).toBe(2)
      })

      it('handles pagination by appending results', async () => {
        const firstPageResponse = {
          success: true,
          data: {
            companies: [{ id: '1', name: 'Company 1' }],
            total: 2,
            page: 1,
            limit: 1,
            query: 'test',
          },
          meta: { searchTime: 100, suggestions: [], filters: { industries: [], sizes: [], locations: [] } },
        }

        const secondPageResponse = {
          success: true,
          data: {
            companies: [{ id: '2', name: 'Company 2' }],
            total: 2,
            page: 2,
            limit: 1,
            query: 'test',
          },
          meta: { searchTime: 110, suggestions: [], filters: { industries: [], sizes: [], locations: [] } },
        }

        mockFetchCompanies
          .mockResolvedValueOnce(firstPageResponse)
          .mockResolvedValueOnce(secondPageResponse)

        const { result } = renderHook(() => useCompanySearch())
        
        // First page
        await act(async () => {
          await result.current.search('test', undefined, 1)
        })
        expect(result.current.companies).toHaveLength(1)

        // Second page (should append)
        await act(async () => {
          await result.current.search('test', undefined, 2)
        })
        expect(result.current.companies).toHaveLength(2)
        expect(result.current.companies[0].name).toBe('Company 1')
        expect(result.current.companies[1].name).toBe('Company 2')
      })

      it('handles API errors gracefully', async () => {
        const apiError = new APIError('Network error', 500, '/companies')
        mockFetchCompanies.mockRejectedValue(apiError)

        const { result } = renderHook(() => useCompanySearch())
        
        await act(async () => {
          await result.current.search('error')
        })

        expect(result.current.error).toBe('API Error: Network error')
        expect(result.current.loading).toBe(false)
        // Should fallback to mock data
        expect(result.current.companies.length).toBeGreaterThan(0)
      })

      it('handles unknown errors gracefully', async () => {
        const unknownError = new Error('Unknown error')
        mockFetchCompanies.mockRejectedValue(unknownError)

        const { result } = renderHook(() => useCompanySearch())
        
        await act(async () => {
          await result.current.search('error')
        })

        expect(result.current.error).toBe('An unexpected error occurred while searching companies')
        expect(result.current.loading).toBe(false)
      })
    })

    describe('Empty Query Handling', () => {
      it('clears results for empty query', async () => {
        const { result } = renderHook(() => useCompanySearch())
        
        // First search with results
        await act(async () => {
          await result.current.search('tech', undefined, 1)
        })

        // Then search with empty query
        await act(async () => {
          await result.current.search('')
        })

        expect(result.current.companies).toEqual([])
        expect(result.current.total).toBe(0)
        expect(result.current.searchTime).toBeNull()
        expect(result.current.suggestions).toEqual([])
        expect(result.current.loading).toBe(false)
      })

      it('handles whitespace-only queries', async () => {
        const { result } = renderHook(() => useCompanySearch())
        
        await act(async () => {
          await result.current.search('   ')
        })

        expect(result.current.companies).toEqual([])
        expect(result.current.total).toBe(0)
      })
    })
  })

  describe('Error Management', () => {
    it('clears error when clearError is called', async () => {
      const apiError = new APIError('Test error', 400, '/test')
      mockFetchCompanies.mockRejectedValue(apiError)

      const { result } = renderHook(() => useCompanySearch())
      
      // Generate error
      await act(async () => {
        await result.current.search('error')
      })
      expect(result.current.error).not.toBeNull()

      // Clear error
      act(() => {
        result.current.clearError()
      })
      expect(result.current.error).toBeNull()
    })

    it('clears error on new search', async () => {
      const apiError = new APIError('Test error', 400, '/test')
      const successResponse = {
        success: true,
        data: { companies: [], total: 0, page: 1, limit: 20, query: 'success' },
        meta: { searchTime: 100, suggestions: [], filters: { industries: [], sizes: [], locations: [] } },
      }

      mockFetchCompanies
        .mockRejectedValueOnce(apiError)
        .mockResolvedValueOnce(successResponse)

      const { result } = renderHook(() => useCompanySearch())
      
      // Generate error
      await act(async () => {
        await result.current.search('error')
      })
      expect(result.current.error).not.toBeNull()

      // New successful search should clear error
      await act(async () => {
        await result.current.search('success')
      })
      expect(result.current.error).toBeNull()
    })
  })

  describe('Pagination State', () => {
    it('calculates hasMore correctly', async () => {
      const { result } = renderHook(() => useCompanySearch('', 500, true))
      
      await act(async () => {
        await result.current.search('tech')
      })

      // Should have no more results (1 company found, total is 1)
      expect(result.current.hasMore).toBe(false)
    })

    it('indicates more results available', async () => {
      const mockResponse = {
        success: true,
        data: {
          companies: [{ id: '1', name: 'Company 1' }],
          total: 10, // More than currently loaded
          page: 1,
          limit: 1,
          query: 'test',
        },
        meta: { searchTime: 100, suggestions: [], filters: { industries: [], sizes: [], locations: [] } },
      }

      mockFetchCompanies.mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useCompanySearch())
      
      await act(async () => {
        await result.current.search('test')
      })

      expect(result.current.hasMore).toBe(true)
      expect(result.current.companies.length).toBe(1)
      expect(result.current.total).toBe(10)
    })
  })

  describe('Debounced Auto-Search', () => {
    it('triggers search when debounced query changes', async () => {
      // Mock useDebounce to return different values
      const mockUseDebounce = jest.fn()
      mockUseDebounce.mockReturnValue('debounced query')
      
      // Re-mock the debounce hook for this test
      jest.doMock('@/lib/hooks/useDebounce', () => ({
        useDebounce: mockUseDebounce,
      }))

      const { result } = renderHook(() => useCompanySearch('initial', 500, true))
      
      // Wait for any effects to complete
      await waitFor(() => {
        expect(result.current).toBeDefined()
      })

      expect(mockUseDebounce).toHaveBeenCalledWith('initial', 500)
    })
  })

  describe('Performance and Memory', () => {
    it('maintains state consistency across re-renders', async () => {
      const { result, rerender } = renderHook(
        ({ query }) => useCompanySearch(query, 500, true),
        { initialProps: { query: 'initial' } }
      )

      await act(async () => {
        await result.current.search('tech')
      })

      const initialCompanies = result.current.companies
      const initialTotal = result.current.total

      rerender({ query: 'initial' })

      expect(result.current.companies).toEqual(initialCompanies)
      expect(result.current.total).toBe(initialTotal)
    })

    it('does not cause memory leaks with concurrent searches', async () => {
      const { result } = renderHook(() => useCompanySearch('', 500, true))
      
      // Start multiple concurrent searches
      const promises = [
        result.current.search('tech'),
        result.current.search('manufacturing'),
        result.current.search('finance'),
      ]

      await act(async () => {
        await Promise.all(promises)
      })

      // Should have the results from the last search
      expect(result.current.companies).toBeDefined()
      expect(result.current.loading).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('handles special characters in search query', async () => {
      const { result } = renderHook(() => useCompanySearch('', 500, true))
      
      await act(async () => {
        await result.current.search('Tech & Co.')
      })

      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('handles very long search queries', async () => {
      const { result } = renderHook(() => useCompanySearch('', 500, true))
      const longQuery = 'a'.repeat(1000)
      
      await act(async () => {
        await result.current.search(longQuery)
      })

      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('handles unicode and international characters', async () => {
      const { result } = renderHook(() => useCompanySearch('', 500, true))
      
      await act(async () => {
        await result.current.search('北京科技 München GmbH')
      })

      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })
})