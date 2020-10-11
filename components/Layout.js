import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Layout({children, title}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
