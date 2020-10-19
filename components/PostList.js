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
          <header className="mb-2 relative flex lg:block items-center">
            {post._embedded['wp:featuredmedia']
            && (
            <div className="inline-block lg:absolute top-0 transform lg:-translate-x-48 lg:translate-y-16 mr-6 lg:mr-0">
              <img
                src={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url}
                className="rounded-full w-full"
              />
              {/* <button onClick={() => { console.log(post); }}>Log</button> */}
              {/* <img src="" */}
            </div>
            )}
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
