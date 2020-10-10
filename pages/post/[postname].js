import Debugger from "../../components/Debugger";
import axios from 'axios';
import format from 'date-fns/format';
import Link from "next/link";
import Head from "next/head";
import parse, { domToReact } from 'html-react-parser';
import PostCode from '../../components/post/PostCode';

export default function BlogPost({ post }) {
  const replaceCode = node => {
    if (node.name === 'pre') {
      return node.children.length > 0 && <PostCode language={getLanguage(node)}>{domToReact(getCode(node))}</PostCode>;
    }
  };

  const getLanguage = node => {
    if (node.attribs.class != null) {
      return node.attribs.class;
    }
    return null;
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
          <div className="text-white mx-auto mb-10">
            <header className="mb-2">
              <h1 className="text-3xl text-green-500 font-black leading-tight tracking-wider mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
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

  const post = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?slug=${postname}`)
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
  const allPosts = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts`)
    .then((result) => { return result.data })

  const paths = allPosts.map((post) => `/post/${post.slug}`) || [];

  return {
    paths: paths,
    fallback: false,
  }
}
