import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
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
