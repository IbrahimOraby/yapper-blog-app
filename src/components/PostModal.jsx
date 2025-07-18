import React, { useRef } from "react";
import * as Yup from "yup";
import { createPost } from "../services/firestore-service";
import { Form, Formik } from "formik";
import MyTextInput from "../components/TextInput";
import MyTextAreaInput from "../components/TextAreaInput";
import MyFileInput from "../components/FileInput";
import useAuthStore from "../store/useAuthStore";

function PostModal({ fetchAllPosts }) {
	const currentUser = useAuthStore((s) => s.currentUser);

	const fileInputRef = useRef(null);

	const SUPPORTED_FORMATS = [
		"image/jpg",
		"image/jpeg",
		"image/png",
		"image/webp"
	];
	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
	const UPLOADCARE_API_URL = "https://upload.uploadcare.com/base/";
	const UPLOADCARE_PUBLIC_KEY = "f67ef52ff6e1473c1908";
	return (
		<dialog id="post_modal" className="modal">
			<div className="modal-box">
				<div className="mb-4">
					<h3 className="font-bold text-lg">Create a Post</h3>
					<p className="text-sm">We are interested to hear your yaps</p>
				</div>
				<Formik
					initialValues={{
						postTitle: "",
						postBody: "",
						postFile: ""
					}}
					validationSchema={Yup.object({
						postTitle: Yup.string()
							.required("Title is required")
							.min(3, "Title must be at least 3 characters")
							.max(100, "Title must be less than 100 characters"),
						postBody: Yup.string().required("Content is required"),
						postFile: Yup.mixed()
							.required("An image is required")
							.test("fileType", "Unsupported file format", (value) =>
								value ? SUPPORTED_FORMATS.includes(value.type) : false
							)
							.test("fileSize", "File is too large (max 5MB)", (value) =>
								value ? value.size <= MAX_FILE_SIZE : false
							)
					})}
					onSubmit={async (values, actions) => {
						const file = values.postFile;
						const formData = new FormData();
						formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);
						formData.append("UPLOADCARE_STORE", "1");
						formData.append("file", file);

						try {
							const res = await fetch(UPLOADCARE_API_URL, {
								method: "POST",
								body: formData
							});

							const data = await res.json();

							if (data.file) {
								const cdnUrl = `https://ucarecdn.com/${data.file}/`;
								console.log("Uploadcare CDN URL:", cdnUrl);

								//send to the firestore
								const postData = {
									postTitle: values.postTitle,
									postBody: values.postBody,
									postFile: cdnUrl
								};
								await createPost(currentUser, postData);
								await fetchAllPosts();

								// reset and close
								document.getElementById("post_modal").close();
								actions.resetForm();
								if (fileInputRef.current) {
									fileInputRef.current.value = null; // 🔁 reset file input
								}
							} else {
								console.error("Upload failed", data);
							}

							actions.setSubmitting(false);
						} catch (err) {
							console.error(err);
						}
					}}
				>
					<Form method="dialog">
						{/* Title */}
						<MyTextInput
							label="Title"
							name="postTitle"
							type="text"
							placeholder="Enter Your Post Title"
						></MyTextInput>

						{/* Post Content */}
						<MyTextAreaInput
							label="Body"
							name="postBody"
							rows={4}
							placeholder="What's on your mind?"
						></MyTextAreaInput>

						{/* Image Upload */}
						<MyFileInput
							type="file"
							name="postFile"
							ref={fileInputRef}
						></MyFileInput>

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
					</Form>
				</Formik>
			</div>
		</dialog>
	);
}

export default PostModal;
