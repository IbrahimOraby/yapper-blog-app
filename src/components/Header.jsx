import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { signOutUser } from "../services/auth_service";

function Header() {
	const [currUser, setCurrUser] = useState(null);
	// const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrUser(user); // update the state on login/logout
		});
		return () => unsubscribe(); // clean up the listener
	}, []);

	const handleSignOut = () => {
		signOutUser().then(() => {
			console.log("logged out");
		});
	}

	return (
		<header className="navbar bg-base-100 --color shadow-sm mb-4">
			<div className="flex-1">
				<Link
					className="btn btn-ghost text-primary text-3xl font-extrabold"
					to={""}
				>
					Yapper
				</Link>
			</div>
			<nav className="flex-none">
				<ul className="menu menu-horizontal px-1">
					{currUser ? (
						<>
							<button
								className="btn btn-ghost text-neutral font-medium"
								onClick={handleSignOut}
							>
								Logout
							</button>
						</>
					) : (
						<>
							<li>
								<Link className="text-neutral font-medium" to="login">
									Sign in
								</Link>
							</li>
							<li>
								<Link className="text-neutral font-medium" to="signup">
									Sign up
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
