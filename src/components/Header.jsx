import { Link } from "react-router";
import { signOutUser } from "../services/auth_service";
import useAuthStore from "../store/useAuthStore";

function Header() {
	const currentUser = useAuthStore((s) => s.currentUser);

	const handleSignOut = () => {
		signOutUser().then(() => {
			console.log("logged out");
		});
	};

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
					{currentUser && currentUser.uid ? (
						<>
							<div className="flex items-center">
								<p className="text-sm font-semibold text-base-content flex flex-row justify-center items-center gap-1 px-6 border-e">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6 text-primary"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
									{currentUser.userName}
								</p>

								<button
									className="btn btn-link no-underline hover:underline text-neutral font-medium"
									onClick={handleSignOut}
								>
									Logout
								</button>
							</div>
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
