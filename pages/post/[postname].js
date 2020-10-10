import Debugger from "../../components/Debugger";
import axios from 'axios';
import format from 'date-fns/format';
import Link from "next/link";
import Head from "next/head";


export default function BlogPost({ post }) {
  if (!post) return <></>

  return (
    <>
      <div className="blog-post lg:w-1/2 mx-auto">
        <Head>
          <title>{post.title.rendered} | Montoulieu Blog</title>
          <meta
            name="description"
            content="Montoulieu Blog"
          />
        </Head>
        <article className="mb-20">
          <div className="text-white mx-auto mb-10">
            <header className="mb-5">
              <h1 className="text-5xl text-green-500 font-bold">{post.title.rendered}</h1>
              <h2 className="text-xl font-bold">{format(new Date(post.date), 'MMMM dd, yyyy')}</h2>
            </header>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
            {/* <Debugger data={post} /> */}
          </div>
        </article>
          {/*
          <ShareArticle
            title={title}
          /> */}
        </div>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const post = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/montoulieu_posts?slug=${postname}`)
    .then((result) => { return result.data[0] })

  return {
    props: {
      title: post.title.rendered,
      content: post.content.rendered,
      post,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/montoulieu_posts`)
    .then((result) => { return result.data })

  const paths = allPosts.map((post) => `/post/${post.slug}`) || [];

  return {
    paths: paths,
    fallback: false,
  }
}
