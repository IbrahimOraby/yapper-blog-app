import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile
} from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";

// const provider = new GoogleAuthProvider();

// // google register
// export const signInWithGoogle = async () => {
// 	try {
// 		const result = await signInWithPopup(auth, provider);
// 		const credential = GoogleAuthProvider.credentialFromResult(result);
// 		const token = credential.accessToken;
// 		const user = result.user;
// 		const additionalInfo = getAdditionalUserInfo(result);

// 		return {
// 			user,
// 			token,
// 			isNewUser: additionalInfo?.isNewUser,
// 			providerId: additionalInfo?.providerId
// 		};
// 	} catch (error) {
// 		throw {
// 			code: error.code,
// 			message: error.message,
// 			email: error.customData?.email,
// 			credential: GoogleAuthProvider.credentialFromError(error),
// 			raw: error
// 		};
// 	}
// };

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
	} catch (error) {
		throw {
			code: error.code,
			message: error.message,
			raw: error
		};
	}
};
