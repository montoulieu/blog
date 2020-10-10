import '../css/index.css'
import "@wordpress/block-library/build-style/style.css"

import { motion } from 'framer-motion';
import useGetWPPosts from '../hooks/useGetWPPosts';
import Link from "next/link";


function MyApp({ Component, pageProps, router }) {
  useGetWPPosts();
  return (
    <main className="container px-3 sm:px-0">
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          <header className="py-5 flex">
          {/* <span className="text-2xl font-black">Montoulieu Blog</span> */}
            <ul className="ml-auto">
              <Link
                href={`/`}
              >
                <a>
                  Home
                </a>
              </Link>
            </ul>
          </header>
          <Component {...pageProps} />
        </motion.div>
    </main>
  )
}

export default MyApp
