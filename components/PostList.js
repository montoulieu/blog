import Link from 'next/link';
import format from 'date-fns/format';

// TODO: Fix accessibility eslint issues in this component

function PostList(props) {
  const { posts } = props;

  return (
    <ul className="">
      {posts.map((post) => (
        <li
          className="mb-20 flex flex-col"
          key={post.title.rendered}
        >
          <header className="mb-2 relative">
            {post._embedded['wp:featuredmedia']
              && (
              <Link
                href="/post/[postname]"
                as={`/post/${post.slug}`}
              >
                <a>
                  <div className="sm:float-left lg:float-none mx-auto lg:border border-gray-800 lg:shadow-md sm:rounded-full lg:absolute top-0 transform lg:-translate-x-48 lg:translate-y-16 mr-6 lg:mr-0 sm:w-40 h-40 overflow-hidden flex min-w items-center justify-center mb-4 sm:mb-0">
                    <img
                      src={post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}
                      className="rounded-full shadow-md lg:shadow-none lg:rounded-none absolute h-full max-w-none text-center mx-auto"
                    />
                    {/* <button onClick={() => { console.log(post); }}>Log</button> */}
                    {/* <img src="" */}
                  </div>
                </a>
              </Link>
              )}
            <Link
              href="/post/[postname]"
              as={`/post/${post.slug}`}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="block text-2xl sm:text-3xl font-black text-green-500 leading-tight tracking-wider hover:text-green-600 transition-colors duration-200 mb-2 break-words"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </Link>

          </header>
          <div className="flex">
            <div
              className="tracking-wider leading-7 mb-5"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </div>

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
  );
}

export default PostList;
