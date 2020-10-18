import '../css/index.css';

import { motion } from 'framer-motion';
import { DefaultSeo } from 'next-seo';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import HeaderLogo from '../components/HeaderLogo';
import SEO from '../next-seo.config';

if (process.env.NODE_ENV === 'production') {
  Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));
}

function MyApp({ Component, pageProps, router }) {
  return (
    <main className="container px-3 sm:px-0">
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon.png"
        />
      </Head>

      <DefaultSeo {...SEO} />

      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        className="md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
      >
        <header className="py-5 flex items-center mb-3">
          <Link
            href="/"
          >
            <a className="flex items-center">
              <HeaderLogo />
            </a>
          </Link>
          {/* <ul className="ml-auto">
            <Link
              href={`/`}
            >
              <a>
                Home
              </a>
            </Link>
          </ul> */}
        </header>
        <Component {...pageProps} />

        <footer className="py-3 text-sm">
          Created by
          {' '}
          <a
            href="https://linkent.montoulieu.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pieter Montoulieu
          </a>
          {' '}
          using Next.js, Tailwind and Netlify.
        </footer>
      </motion.div>
    </main>
  );
}

export default MyApp;
