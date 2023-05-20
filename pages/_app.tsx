import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppContextProvider } from '../src/context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <ToastContainer limit={3} autoClose={4000} />
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
