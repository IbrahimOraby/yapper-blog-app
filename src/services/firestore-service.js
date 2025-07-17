import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
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

export const createPost = async (userData, content) => {
	try {
		await addDoc(collection(db, "posts"), {
			uid: userData.uid,
			userName: userData.displayName,
			createdAt: serverTimestamp(),
			postContent: content
		});
		console.log("Post created successfully with uid:", userData.uid);
	} catch (error) {
		console.error("Error creating post", error);
	}
};
