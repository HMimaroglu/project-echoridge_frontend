'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

interface LoadingContextType {
  loadingStates: LoadingState;
  setLoading: (key: string, isLoading: boolean) => void;
  isLoading: (key: string) => boolean;
  isAnyLoading: () => boolean;
  clearAllLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const setLoading = (key: string, isLoading: boolean) => {
    setLoadingStates(prev => {
      if (isLoading) {
        return { ...prev, [key]: true };
      } else {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const isLoading = (key: string) => {
    return loadingStates[key] || false;
  };

  const isAnyLoading = () => {
    return Object.values(loadingStates).some(loading => loading);
  };

  const clearAllLoading = () => {
    setLoadingStates({});
  };

  const value: LoadingContextType = {
    loadingStates,
    setLoading,
    isLoading,
    isAnyLoading,
    clearAllLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Higher-order component for automatic loading state management
export function withLoading<P extends object>(
  Component: React.ComponentType<P>,
  loadingKey: string
) {
  return function WrappedComponent(props: P) {
    const { setLoading } = useLoading();

    React.useEffect(() => {
      setLoading(loadingKey, true);
      return () => {
        setLoading(loadingKey, false);
      };
    }, [setLoading]);

    return <Component {...props} />;
  };
}

// Hook for managing component-specific loading states
export function useComponentLoading(key: string) {
  const { setLoading, isLoading } = useLoading();

  const startLoading = () => setLoading(key, true);
  const stopLoading = () => setLoading(key, false);
  const loading = isLoading(key);

  return { loading, startLoading, stopLoading };
}