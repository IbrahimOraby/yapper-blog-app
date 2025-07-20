import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc
} from "firebase/firestore";
import { app } from "../../firebaseConfig";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const createUser = async ({ uid, userName }) => {
	try {
		await setDoc(doc(db, "users", uid), {
			uid,
			userName,
			createdAt: serverTimestamp()
		});
		console.log("User created successfully");
	} catch (error) {
		console.error("Error creating user: ", error);
	}
};

export const createPost = async (userData, postData) => {
	console.log(userData);
	try {
		await addDoc(collection(db, "posts"), {
			uid: userData.uid,
			userName: userData.userName,
			createdAt: serverTimestamp(),
			postTitle: postData.postTitle,
			postFile: postData.postFile,
			postBody: postData.postBody
		});
		console.log("Post created successfully with uid:", userData.uid);
	} catch (error) {
		console.error("Error creating post", error);
	}
};

export const getAllPosts = async () => {
	try {
		const postsQuery = query(
			collection(db, "posts"),
			orderBy("createdAt", "desc")
		);

		const querySnapshot = await getDocs(postsQuery);

		const postsList = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		return postsList;
	} catch (error) {
		console.error("Error fetching posts: ", error);
	}
};

export const deletePost = async (pid) => {
	try {
		await deleteDoc(doc(db, "posts", pid));
		console.log(`Post with ${pid} is deleted `);
	} catch (error) {
		console.error("Error deleting the post: ", error);
	}
};

export const updatePost = async (pid, updatedData) => {
	try {
		await updateDoc(doc(db, "posts", pid), updatedData);
		console.log(`Post with ${pid} got updated`);
	} catch (error) {
		console.error("Error updating the post: ", error);
	}
};
