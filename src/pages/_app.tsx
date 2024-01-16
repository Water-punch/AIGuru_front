import type { AppProps } from "next/app";
import "../styles/global.css";
import Layout from "../components/features/layout/Layout";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
