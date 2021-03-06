import axios from 'axios';
import format from 'date-fns/format';
import parse, { domToReact } from 'html-react-parser';
import { NextSeo } from 'next-seo';
import PostCode from '../../components/post/PostCode';
// import Debugger from '../../components/Debugger';

export default function BlogPost({
  post, seo, title, featuredImage,
}) {
  const replaceCode = (node) => {
    if (node.name === 'pre') {
      return node.children.length > 0 && <PostCode language={getLanguage(node)}>{domToReact(getCode(node))}</PostCode>;
    }
  };

  const getLanguage = (node) => {
    if (node.attribs.class != null) {
      const classes = node.attribs.class.split(' ');
      const lang = classes[classes.length - 1];
      return lang;
    }
    return null;
  };

  const getCode = (node) => {
    if (node.children.length > 0 && node.children[0].name === 'code') {
      return node.children[0].children;
    }
    return node.children;
  };

  // const getCode = (node) => {
  //   if (node.children.length > 0 && node.children[0].name === 'code') {
  //     return node.children[0].children;
  //   }
  //   return node.children;
  // };

  // const replaceCode = (node) => node.name === 'pre' && node.children.length && (
  //   <PostCode>
  //     {domToReact(getCode(node))}
  //   </PostCode>
  // );

  const decodeTitle = (titleString) => {
    const string = titleString
      .replace('&#8211;', '-')
      .replace('&#8217;', '\'');
    return string;
  };

  if (!post) return <></>;

  return (
    <>
      <NextSeo
        title={seo?.title ? decodeTitle(seo.title) : decodeTitle(title)}
        description={seo?.description ? seo.description : ''}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}
        openGraph={{
          title: seo?.title ? decodeTitle(seo.title) : decodeTitle(title),
          description: seo?.description ? seo.description : '',
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`,
          type: 'article',
          article: {
            publishedTime: post.date,
            // tags: ['Tag A', 'Tag B', 'Tag C'],
          },
          images: [
            {
              // eslint-disable-next-line no-nested-ternary
              url: (featuredImage && !seo?.image) ? featuredImage : (seo?.image ? seo.image.sizes.full : ''),
            },
          ],
        }}
      />
      <div className="blog-post">
        <article className="mb-20">
          <div className="text-white mx-auto mb-8">
            <header className="pb-4">
              <h1
                className="text-3xl text-green-500 font-black leading-tight tracking-wider break-words mb-2"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <h2 className="text-xl text-green-300 font-bold">{format(new Date(post.date), 'MMMM dd, yyyy')}</h2>
            </header>
            <div
              className="blog-content tracking-wider leading-7"
            >
              {parse(post.content.rendered, { replace: replaceCode })}
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> */}
            {/* <Debugger data={post} /> */}
          </div>
        </article>
        {/*
          <ShareArticle
            title={title}
          /> */}
      </div>
    </>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params;

  const post = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?slug=${postname}&_fields=date,excerpt,title,slug,content,acf,_links,_embedded&_embed`)
    .then((result) => result.data[0]);

  return {
    props: {
      title: post.title.rendered,
      content: post.content.rendered,
      seo: post.acf.seo ? post.acf.seo : null,
      // eslint-disable-next-line no-underscore-dangle
      featuredImage: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url : '',
      post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?per_page=100&_fields=date,excerpt,title,slug,content`)
    .then((result) => result.data);

  const paths = allPosts.map((post) => `/post/${post.slug}`) || [];

  return {
    paths,
    fallback: false,
  };
}
