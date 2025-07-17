import React from "react";

function Home() {
	const handleAddPost = () => {
		console.log("clicked");
	};
	return (
		<>
			<h1>Home</h1>
			<div className="position relative">
				<button
					className="btn btn-accent rounded-full fixed bottom-24 right-8 py-6 px-3"
					type="button"
					onClick={() => document.getElementById("post_modal").showModal()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2.8}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</button>
				<dialog id="post_modal" className="modal">
					<div className="modal-box">
						<div className="mb-4">
							<h3 className="font-bold text-lg">Create a Post</h3>
							<p className="text-sm">We are interested to hear your yaps</p>
						</div>
						<form method="dialog">
							{/* Title */}
							<input
								type="text"
								name="title"
								placeholder="Post title"
								className="input input-bordered w-full mb-4"
								required
							/>

							{/* Image Upload */}
							<input
								type="file"
								name="image"
								accept="image/*"
								className="file-input file-input-bordered w-full mb-4"
							/>

							{/* Post Content */}
							<textarea
								name="content"
								placeholder="What's on your mind?"
								className="textarea textarea-bordered w-full mb-4"
								rows={4}
								required
							></textarea>
							
							<div className="modal-action">
								<button type="submit" className="btn btn-primary">
									Post
								</button>
								<button
									type="button"
									className="btn"
									onClick={() => document.getElementById("post_modal").close()}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</dialog>
			</div>
		</>
	);
}

export default Home;
