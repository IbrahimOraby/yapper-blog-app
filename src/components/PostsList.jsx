import React from "react";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import PostCard from "./PostCard";
import usePostStore from "../store/usePostStore";

function PostsList() {
	const { posts } = usePostStore();

	return (
		<>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</>
	);
}

export default PostsList;
