import { create } from "zustand";
import { getAllPosts } from "../services/firestore-service";

const usePostStore = create((set) => ({
	posts: [],
	loading: true,
	fetchAllPosts: async () => {
		const posts = await getAllPosts();
		set({ posts, loading: false });
	}
}));

export default usePostStore;
