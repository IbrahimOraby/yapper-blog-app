import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/login",
				element: <Login />
			},
			{
				path: "/signup",
				element: <Signup />
			},
			{
				path: "/about",
				element: <About />
			}
		]
	}
]);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
