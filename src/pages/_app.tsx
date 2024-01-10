import type { AppProps } from 'next/app';
import '../styles/global.css';
import Layout from '../components/features/layout/Layout';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
