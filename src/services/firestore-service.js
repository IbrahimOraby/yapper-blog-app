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
	setDoc
} from "firebase/firestore";
import { app } from "../../firebaseConfig";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const createUser = async (userData) => {
	try {
		await setDoc(doc(db, "users", userData.uid), {
			uid: userData.uid,
			userName: userData.displayName,
			createdAt: serverTimestamp()
		});
		console.log("User created successfully");
	} catch (error) {
		console.error("Error creating user: ", error);
	}
};

export const createPost = async (userData, postData) => {
	try {
		await addDoc(collection(db, "posts"), {
			uid: userData.uid,
			userName: userData.displayName,
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
	} catch (error) {
		console.error("Error: ", error);
	}
};