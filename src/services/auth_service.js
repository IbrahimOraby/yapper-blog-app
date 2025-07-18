import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

// sign up
export const signUpUser = async (username, email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		await updateProfile(userCredential.user, { displayName: username });
		return userCredential;
	} catch (error) {
		throw {
			code: error.code,
			message: error.message,
			email: error.customData?.email || email,
			raw: error
		};
	}
};

//sign in
export const signInUser = async (email, password) => {
	try {
		return await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw {
			code: error.code,
			message: error.message,
			email: error.customData?.email || email,
			raw: error
		};
	}
};

//sign out
export const signOutUser = async () => {
	try {
		await signOut(auth);
		console.log('outttt')
	} catch (error) {
		throw {
			code: error.code,
			message: error.message,
			raw: error
		};
	}
};
