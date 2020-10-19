import axios from 'axios';
import Head from 'next/head';
import PostList from '../components/PostList';

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
          <PostList posts={posts} />
        )}
    </div>
  );
}

export default Index;

export async function getStaticProps({ ...ctx }) {
  const posts = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?per_page=100&_fields=date,excerpt,title,slug,content,_links,_embedded&_embed`);

  return {
    props: {
      posts: posts.data,
    },
  };
}
