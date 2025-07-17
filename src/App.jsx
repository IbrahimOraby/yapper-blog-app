import { Link, Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";

function App() {
	return (
		<>
			<Header />
			<main className="flex justify-center items-center py-2 px-8 flex-1">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default App;
