import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('../src/components/Dashboard'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Navbar = dynamic(() => import('../src/components/Navbar'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nft Minter</title>
        <meta name="description" content="Mint Nfts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <Dashboard />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
