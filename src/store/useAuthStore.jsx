import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../firebaseConfig";

const useAuthStore = create((set) => ({
	curreUser: {
		uid: '',
		userName: ''
	},
	setCurrentUser: (user) => set({ currentUser: user }),
	initAuthListener: () => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				set({
					currentUser: {
						uid: user.uid,
						userName: user.displayName
					}
				}); // store only uid
			} else {
				set({
					currentUser: {
						uid: '',
						userName: ''
					}
				});
			}
		});
		return unsubscribe;
	}
}));

export default useAuthStore;
