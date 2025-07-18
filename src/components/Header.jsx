import React from "react";
import { Link } from "react-router";

function Header() {
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
					<li>
						<Link className="text-neutral font-medium" to={""}>
							Home
						</Link>
					</li>
					<li>
						<Link className="text-neutral font-medium" to={"login"}>
							Sign in
						</Link>
					</li>
					<li>
						<Link className="text-neutral font-medium" to={"signup"}>
							Sign up
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
