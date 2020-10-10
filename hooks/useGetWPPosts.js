import axios from "axios"
import useBlogStore from '../hooks/useBlogStore';
import { useEffect } from 'react';

const importBlogPosts = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/montoulieu_posts`
  const posts = axios
    .get(apiUrl)
    .then((result) => {
      return result.data
    })

  return posts
};

export default function useGetWPPosts() {
  const setPosts = useBlogStore(state => state.setPosts);

  async function wrapperImportBlogPosts() {
    const blogPosts = await importBlogPosts();
    await setPosts({ posts: blogPosts })
    return blogPosts;
  }
  wrapperImportBlogPosts();
}
