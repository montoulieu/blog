import React from 'react'
import useBlogStore from '../hooks/useBlogStore';
import Link from "next/link";
import Head from "next/head";
import format from 'date-fns/format';

function Index() {
  const posts = useBlogStore(state => state.posts);

  return (
    <div className="blog-archive">
      <Head>
        <title>Montoulieu Blog</title>
        <meta
          name="description"
          content="Montoulieu Blog"
        />
      </Head>
      {posts &&
        <ul className="">
          {posts?.posts?.map(post => (
            <li className="mb-20 flex flex-col" key={post.title.rendered}>
              <header className="mb-2">
                <Link
                  href={`/post/[postname]`}
                  as={`/post/${post.slug}`}
                >
                  <a className="block text-3xl font-black text-green-500 leading-tight tracking-wider hover:text-green-600 transition-colors duration-200 mb-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}/>
                </Link>
                <span className="text-xl date ml-auto text-green-300 font-bold">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </span>
              </header>
              <div className="tracking-wider leading-7" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}/>
              <Link
                href={`/post/[postname]`}
                as={`/post/${post.slug}`}

              >
                <a className="ml-auto font-black bg-green-500 hover:bg-green-600 text-gray-900 transition-colors duration-200 leading-6 px-3 rounded-lg text-sm">
                  Read More
                </a>
              </Link>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default Index
