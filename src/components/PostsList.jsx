import React from "react";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import { deletePost } from "../services/firestore-service";
import useAuthStore from "../store/useAuthStore";

function PostsList({ posts, fetchAllPosts }) {
	console.log(posts);
	const currentUser = useAuthStore((s) => s.currentUser);

	if (currentUser) console.log(currentUser);

	const handleDelete = async (pid) => {
		console.log(pid);
		await deletePost(pid);
		await fetchAllPosts();
	};

	return (
		<>
			<div className="flex flex-col gap-8 px-4 max-w-xl mx-auto">
				{posts.map((post) => (
					<div
						key={post.id}
						className="bg-base-100 border border-base-300 shadow-base-300 rounded-xl px-5 py-4 shadow-sm"
					>
						<div className=" pb-4">
							<div className="flex items-center justify-between mb-2">
								<p className="text-sm font-semibold text-base-content flex flex-row justify-center items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 text-primary"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
									{post.userName}
								</p>
								<span className="text-xs text-gray-400">
									{post.createdAt.toDate().toLocaleString()}
								</span>
							</div>

							<h2 className="text-lg font-medium mb-1">{post.postTitle}</h2>

							<p className="text-sm text-base-content whitespace-pre-line mb-3">
								{post.postBody}
							</p>

							{post.postFile && (
								<div className="overflow-hidden rounded-lg">
									<img
										src={post.postFile}
										alt="Post media"
										className="w-full object-cover"
									/>
								</div>
							)}
						</div>
						<div className="my-2 flex justify-end gap-1 min-h-10">
							{currentUser.uid === post.uid && (
								<>
									<EditButton />
									<DeleteButton
										handleDelete={() => handleDelete(post.id)}
										className=""
									/>
								</>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default PostsList;
