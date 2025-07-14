import React from "react";
import { Link } from "react-router";

function Header() {
	return (
		<header className="navbar bg-base-100 --color shadow-sm">
			<div className="flex-1">
				<Link className="btn btn-ghost text-xl" to={""}>
					Yapper
				</Link>
			</div>
			<nav className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link className="" to={"about"}>
							About
						</Link>
					</li>
					<li>
						<Link to={""}>Home</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
