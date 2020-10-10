import '../css/index.css'
import "@wordpress/block-library/build-style/style.css"

import { motion } from 'framer-motion';
import useGetWPPosts from '../hooks/useGetWPPosts';
import Link from "next/link";
import HeaderLogo from '../components/HeaderLogo';


function MyApp({ Component, pageProps, router }) {
  useGetWPPosts();
  return (
    <main className="container px-3 sm:px-0">
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
        <header className="py-5 flex items-center mb-10">
          <Link
            href={`/`}
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
        </motion.div>
    </main>
  )
}

export default MyApp
