import React from 'react'
import useBlogStore from '../hooks/useBlogStore';
import Link from "next/link";
import format from 'date-fns/format';

function Index() {
  const posts = useBlogStore(state => state.posts);

  return (
    <div>
      {posts &&
        <ul className="w-1/2 mx-auto">
          {posts?.posts?.map(post => (
            <li className="mb-20 flex flex-col" key={post.title.rendered}>
              <header className="flex items-center">
                <Link
                  href={`/post/[postname]`}
                  as={`/post/${post.slug}`}
                >
                  <a className="text-2xl font-black text-green-500 tracking-wider hover:underline">
                    {post.title.rendered}
                  </a>
                </Link>
                <span className="date ml-auto italic text-sm text-gray-500">
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </span>
              </header>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}/>
              <Link
                href={`/post/[postname]`}
                as={`/post/${post.slug}`}

              >
                <a className="ml-auto font-black bg-green-500 hover:bg-green-600 py-1 px-3 rounded-lg">
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
