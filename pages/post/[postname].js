import Debugger from "../../components/Debugger";
import axios from 'axios';
import format from 'date-fns/format';
import Link from "next/link";
import Head from "next/head";
import parse, { domToReact } from 'html-react-parser';
import PostCode from '../../components/post/PostCode';

export default function BlogPost({ post }) {
  const replaceCode = node => {
    return node.name === 'pre' && node.children.length && (
      <PostCode>{domToReact(getCode(node))}</PostCode>
    );
  };

  const getCode = node => {
    if (node.children.length > 0 && node.children[0].name === 'code') {
      return node.children[0].children;
    } else {
      return node.children;
    }
  };

  if (!post) return <></>

  return (
    <>
      <div className="blog-post">
        <Head>
          <title>{post.title.rendered} | Montoulieu Blog</title>
          <meta
            name="description"
            content="Montoulieu Blog"
          />
        </Head>

        <article className="mb-20">
          <div className="text-white mx-auto mb-8">
            <header className="pb-4">
              <h1 className="text-3xl text-green-500 font-black leading-tight tracking-wider break-words mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <h2 className="text-xl text-green-300 font-bold">{format(new Date(post.date), 'MMMM dd, yyyy')}</h2>
            </header>
            <div
              className="blog-content tracking-wider leading-7"
            >
              {parse(post.content.rendered, {replace: replaceCode})}
            </div>
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

  const post = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?slug=${postname}&_fields=date,excerpt,title,slug,content`)
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
  const allPosts = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?per_page=100&_fields=date,excerpt,title,slug,content`)
    .then((result) => { return result.data })

  const paths = allPosts.map((post) => `/post/${post.slug}`) || [];

  return {
    paths: paths,
    fallback: false,
  }
}
