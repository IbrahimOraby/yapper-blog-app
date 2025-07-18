import { Link, Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";

function App() {
	const initAuthListener = useAuthStore((s) => s.initAuthListener);

	useEffect(() => {
		const unsubscribe = initAuthListener(); // start tracking
		return () => unsubscribe(); // cleanup
	}, []);

	return (
		<>
			<Header />
			<main className="flex justify-center  py-2 px-8 flex-1">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default App;
