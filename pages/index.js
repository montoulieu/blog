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
        <ul className="lg:w-2/3 mx-auto">
          {posts?.posts?.map(post => (
            <li className="mb-20 flex flex-col" key={post.title.rendered}>
              <header className="mb-2">
                <Link
                  href={`/post/[postname]`}
                  as={`/post/${post.slug}`}
                >
                  <a className="block text-3xl font-black text-green-500 leading-tight tracking-wider hover:underline mb-2">
                    {post.title.rendered}
                  </a>
                </Link>
                <span className="text-lg date ml-auto text-sm text-green-200 font-bold">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </span>
              </header>
              <div className="tracking-wider leading-7" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}/>
              <Link
                href={`/post/[postname]`}
                as={`/post/${post.slug}`}

              >
                <a className="ml-auto font-black bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 py-1 px-3 rounded-lg">
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
