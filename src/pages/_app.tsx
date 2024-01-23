import type { AppProps } from 'next/app';
import '../styles/global.css';
import Layout from '../components/features/layout/Layout';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from '../utils/errorboundary';
import FallbackComponent from '../utils/errorboundary';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return (
    
    <Suspense fallback={<div>로딩중</div>}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ErrorBoundary fallback={FallbackComponent}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ErrorBoundary>
        </Provider>
      </QueryClientProvider>
    </Suspense>
    
  );
}
