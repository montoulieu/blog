import React, { Component } from 'react';

import Link from 'next/link';
import content from '../content/home.md';

const importBlogPosts = async () => {
  // https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
  // second flag in require.context function is if subdirectories should be searched
  const markdownFiles = require
    .context('../content/blogPosts', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../content/blogPosts/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export default class Home extends Component {
  static async getInitialProps() {
    const postsList = await importBlogPosts();

    return { postsList };
  }
  render() {
    const { postsList } = this.props;
    return (
      <div className="container blog-list">
        {postsList.map(post => {
          return (
            <article>
              <Link href={`posts/${post.slug}`}>
                <a>
                  <img src={post.attributes.thumbnail} />
                  <h2>{post.attributes.title}</h2>
                </a>
              </Link>

            </article>
          );
        })}
        <style jsx>{`
          .blog-list a {
            display: block;
            text-align: center;
          }
          .blog-list img {
            max-width: 100%;

            max-height: 300px;
          }
        `}</style>
      </div>
    );
  }
}
