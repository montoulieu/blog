import create from 'zustand'

const useBlogStore = create(set => ({
  posts: [],
  setPosts: (posts) => set(state => ({ posts })),
  clearPosts: () => set({ posts: [] })
}))

export default useBlogStore;
