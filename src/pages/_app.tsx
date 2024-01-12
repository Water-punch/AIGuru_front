import type { AppProps } from 'next/app';
import '../styles/global.css';
import Layout from '../components/features/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
