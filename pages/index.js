import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import format from 'date-fns/format';
import axios from 'axios';

function Index(props) {
  const { posts } = props;

  return (
    <div className="blog-archive">
      <Head>
        <title>Montoulieu Dev Blog</title>
        <meta
          name="description"
          content="Montoulieu Dev Blog"
        />
      </Head>
      {posts
        && (
        <ul className="">
          {posts.map((post) => (
            <li
              className="mb-20 flex flex-col"
              key={post.title.rendered}
            >
              <header className="mb-2">
                <Link
                  href="/post/[postname]"
                  as={`/post/${post.slug}`}
                >
                  <a
                    className="block text-3xl font-black text-green-500 leading-tight tracking-wider hover:text-green-600 transition-colors duration-200 mb-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </Link>
              </header>

              <div
                className="tracking-wider leading-7 mb-5"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <footer className="flex items-center">
                <span className="text-xl date mr-auto text-green-300 font-bold">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </span>
                <Link
                  href="/post/[postname]"
                  as={`/post/${post.slug}`}
                >
                  <a className="ml-auto font-bold bg-green-500 hover:bg-green-600 text-gray-900 transition-colors duration-200 leading-6 px-3 rounded-lg text-sm">
                    Read More
                  </a>
                </Link>
              </footer>
            </li>
          ))}
        </ul>
        )}
    </div>
  );
}

export default Index;

export async function getStaticProps({ ...ctx }) {
  const posts = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?per_page=100&_fields=date,excerpt,title,slug,content`);

  return {
    props: {
      posts: posts.data,
    },
  };
}
