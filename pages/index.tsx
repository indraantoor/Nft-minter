import Head from 'next/head';
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
    <div>
      <Head>
        <title>Nft Minter</title>
        <meta name="description" content="Mint Nfts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <Dashboard />
      </main>
    </div>
  );
}
