import { jest } from '@jest/globals'

// API Response mocks
export const mockApiResponse = {
  success: <T>(data: T) => ({
    status: 200,
    ok: true,
    json: () => Promise.resolve(data),
    headers: new Headers({ 'content-type': 'application/json' }),
  }),
  error: (status: number, message: string) => ({
    status,
    ok: false,
    statusText: message,
    json: () => Promise.resolve({ error: message }),
    headers: new Headers({ 'content-type': 'application/json' }),
  }),
}

// Fetch mock
export const mockFetch = (response: any) => {
  global.fetch = jest.fn(() => Promise.resolve(response as Response)) as jest.Mock
  return global.fetch as jest.Mock
}

// Local Storage mock
export const mockLocalStorage = () => {
  const store: { [key: string]: string } = {}
  
  const mockStorage = {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
    key: jest.fn((index: number) => {
      const keys = Object.keys(store)
      return keys[index] || null
    }),
    get length() {
      return Object.keys(store).length
    },
  }

  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
  })

  return mockStorage
}

// Session Storage mock
export const mockSessionStorage = () => {
  const store: { [key: string]: string } = {}
  
  const mockStorage = {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
    key: jest.fn((index: number) => {
      const keys = Object.keys(store)
      return keys[index] || null
    }),
    get length() {
      return Object.keys(store).length
    },
  }

  Object.defineProperty(window, 'sessionStorage', {
    value: mockStorage,
    writable: true,
  })

  return mockStorage
}

// Console mock
export const mockConsole = () => {
  const originalConsole = { ...console }
  
  const mock = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    restore: () => {
      Object.assign(console, originalConsole)
    },
  }

  Object.assign(console, mock)
  
  return mock
}

// Date mock
export const mockDate = (dateString: string) => {
  const mockDate = new Date(dateString)
  jest.useFakeTimers()
  jest.setSystemTime(mockDate)
  
  return {
    restore: () => {
      jest.useRealTimers()
    },
    advanceBy: (ms: number) => {
      jest.advanceTimersByTime(ms)
    },
  }
}

// Intersection Observer mock
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  })

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  })

  return mockIntersectionObserver
}

// Resize Observer mock
export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn()
  mockResizeObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: mockResizeObserver,
  })

  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: mockResizeObserver,
  })

  return mockResizeObserver
}

// Media Query mock
export const mockMediaQuery = (matches: boolean = false) => {
  const mockMatchMedia = jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mockMatchMedia,
  })

  return mockMatchMedia
}

// Geolocation mock
export const mockGeolocation = () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  }

  Object.defineProperty(navigator, 'geolocation', {
    writable: true,
    value: mockGeolocation,
  })

  return mockGeolocation
}

// Clipboard mock
export const mockClipboard = () => {
  const mockClipboard = {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue(''),
  }

  Object.defineProperty(navigator, 'clipboard', {
    writable: true,
    value: mockClipboard,
  })

  return mockClipboard
}

// Window dimensions mock
export const mockWindowDimensions = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })

  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })

  window.dispatchEvent(new Event('resize'))
}

// File reader mock
export const mockFileReader = () => {
  const mockFileReader = {
    readAsText: jest.fn(),
    readAsDataURL: jest.fn(),
    readAsArrayBuffer: jest.fn(),
    readAsBinaryString: jest.fn(),
    abort: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    result: null,
    error: null,
    readyState: 0,
    onload: null,
    onerror: null,
    onabort: null,
    onloadstart: null,
    onloadend: null,
    onprogress: null,
  }

  global.FileReader = jest.fn(() => mockFileReader) as any

  return mockFileReader
}

// URL mock
export const mockURL = () => {
  const mockURL = {
    createObjectURL: jest.fn(() => 'mock-url'),
    revokeObjectURL: jest.fn(),
  }

  Object.defineProperty(global, 'URL', {
    writable: true,
    value: mockURL,
  })

  return mockURL
}

// Clean up all mocks
export const cleanupMocks = () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
  jest.useRealTimers()
}