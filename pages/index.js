import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>A11ies.info</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <main>
        <h1>
          A11ies.info
        </h1>
      </main>
      <Footer />
    </div>
  )
}
