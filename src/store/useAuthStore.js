import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../firebaseConfig";

const useAuthStore = create((set) => ({
	currentUser: {
		uid: "",
		userName: ""
	},
	loading: true,

	setCurrentUser: (user) => set({ currentUser: user }),
	initAuthListener: () => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				set({
					currentUser: {
						uid: user.uid,
						userName: user.displayName
					},
					loading: false
				}); // store only uid
			} else {
				set({
					currentUser: {
						uid: "",
						userName: ""
					},
					loading: false
				});
			}
		});
		return unsubscribe;
	}
}));

export default useAuthStore;
