import React, { useRef } from "react";
import * as Yup from "yup";
import { createPost, updatePost } from "../services/firestore-service";
import { Form, Formik } from "formik";
import MyTextInput from "../components/TextInput";
import MyTextAreaInput from "../components/TextAreaInput";
import MyFileInput from "../components/FileInput";
import useAuthStore from "../store/useAuthStore";
import usePostModalStore from "../store/usePostModalStore";

function PostModal({ fetchAllPosts }) {
	const currentUser = useAuthStore((s) => s.currentUser);
	const { mode, postData } = usePostModalStore();

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
					<h3 className="font-bold text-lg">
						{mode === "create" ? "Create a Post" : "Edit a Post"}
					</h3>
					<p className="text-sm">We are interested to hear your yaps</p>
				</div>
				<Formik
					initialValues={{
						postTitle: postData?.postTitle || "",
						postBody: postData?.postBody || "",
						postFile: postData?.postFile || ""
					}}
					enableReinitialize={true}
					validationSchema={Yup.object({
						postTitle: Yup.string()
							.required("Title is required")
							.min(3, "Title must be at least 3 characters")
							.max(100, "Title must be less than 100 characters"),
						postBody: Yup.string().required("Body is required"),
						postFile: Yup.mixed()
							.test("fileRequired", "An image is required", (value) => {
								// Allow string (existing image URL) OR File object
								return (
									value && (typeof value === "string" || value instanceof File)
								);
							})
							.test("fileType", "Unsupported file format", (value) => {
								if (typeof value === "string") return true; // skip for URL
								return value && SUPPORTED_FORMATS.includes(value.type);
							})
							.test("fileSize", "File is too large (max 5MB)", (value) => {
								if (typeof value === "string") return true; // skip for URL
								return value && value.size <= MAX_FILE_SIZE;
							})
					})}
					onSubmit={async (values, actions) => {
						const file = values.postFile;
						let cdnUrl = "";
						try {
							if (file instanceof File) {
								// Upload new file to Uploadcare
								const formData = new FormData();
								formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);
								formData.append("UPLOADCARE_STORE", "1");
								formData.append("file", file);

								const res = await fetch(UPLOADCARE_API_URL, {
									method: "POST",
									body: formData
								});

								const data = await res.json();

								if (!data.file) {
									console.error("Upload failed", data);
									return;
								}

								cdnUrl = `https://ucarecdn.com/${data.file}/`;
							} else if (typeof file === "string") {
								// Reuse existing file URL (editing mode)
								cdnUrl = file;
							}

							console.log(mode);
							// Send to Firestore
							if (mode === "create") {
								console.log("inside create");
								await createPost(currentUser, {
									postTitle: values.postTitle,
									postBody: values.postBody,
									postFile: cdnUrl
								});
							} else if (mode === "edit") {
								console.log("inside edit");

								await updatePost(postData.id, {
									postTitle: values.postTitle,
									postBody: values.postBody,
									postFile: cdnUrl
								});
							}

							await fetchAllPosts();

							// reset and close
							usePostModalStore.getState().reset();
							document.getElementById("post_modal").close();
							actions.resetForm();
							if (fileInputRef.current) {
								fileInputRef.current.value = null;
							}
							//reset the mode with no data cause when the post modal opens again as add, it behaves like edit
						} catch (err) {
							console.error(err);
						} finally {
							actions.setSubmitting(false);
						}
					}}
				>
					{({ values, isSubmitting }) => (
						<Form method="dialog">
							{/* Title */}
							<MyTextInput
								label="Title"
								name="postTitle"
								type="text"
								placeholder="Enter Your Post Title"
							></MyTextInput>

							{/* Post Body */}
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

							{values.postFile &&
								(typeof values.postFile === "string" ||
									values.postFile instanceof File) && (
									<div className="mt-4 p-4 border border-base-300 rounded-box bg-base-200 shadow-sm ">
										<p className="text-sm font-semibold text-gray-600 mb-4">
											Image Preview
										</p>
										<div className="flex items-center justify-center">
											<img
												src={
													typeof values.postFile === "string"
														? values.postFile
														: URL.createObjectURL(values.postFile)
												}
												alt="Post preview"
												className="rounded-md max-w-full h-42 object-cover border border-base-300 "
											/>
										</div>
									</div>
								)}

							<div className="modal-action">
								<button
									type="submit"
									className={`btn btn-primary ${
										isSubmitting && "btn-disabled"
									}`}
								>
									{isSubmitting ? "Posting..." : "Post"}
								</button>
								<button
									type="button"
									className={`btn ${isSubmitting && "btn-disabled"}`}
									onClick={() => {
										document.getElementById("post_modal").close();
										usePostModalStore.getState().reset();
									}}
								>
									Cancel
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</dialog>
	);
}

export default PostModal;
