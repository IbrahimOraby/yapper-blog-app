import { create } from "zustand";

const usePostModalStore = create((set) => ({
	mode: "create", // "create" or "edit"
	postData: null, // data for the post being edited

	setMode: (mode) => set({ mode }),
	openCreate: () => set({ mode: "create", postData: null }),
	openEdit: (data) => set({ mode: "edit", postData: data }),
	reset: () => set({ mode: "create", postData: null }) 
}));
export default usePostModalStore;
