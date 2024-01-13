import type { AppProps } from 'next/app';
import '../styles/global.css';
import Layout from '../components/features/layout/Layout';
import { Provider } from 'react-redux';
import { store } from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <Suspense fallback={<div>로딩중</div>}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </QueryClientProvider>
    </Suspense>
    
  );
}
