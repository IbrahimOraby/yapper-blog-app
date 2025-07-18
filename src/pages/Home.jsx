import { getAllPosts } from "../services/firestore-service";
import { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import AddButton from "../components/Buttons/AddButton";
import PostModal from "../components/PostModal";

function Home() {
	const [posts, setPosts] = useState([]);

	const fetchAllPosts = async () => {
		const posts = await getAllPosts();
		setPosts(posts);
	};

	useEffect(() => {
		fetchAllPosts();
	}, []); //posts

	return (
		<>
			{posts.length > 0 ? <PostsList fetchAllPosts={fetchAllPosts} posts={posts} /> : "No Posts"}
			<AddButton />
			<PostModal fetchAllPosts={fetchAllPosts} />
		</>
	);
}

export default Home;
