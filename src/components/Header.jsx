import { Link } from "react-router";
import { signOutUser } from "../services/auth_service";
import useAuthStore from "../store/useAuthStore";

function Header() {
	const currentUser = useAuthStore((state) => state.currentUser);
	const loading = useAuthStore((state) => state.loading);

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
					to="/"
				>
					Yapper
				</Link>
			</div>

			{/* Show nothing while loading */}
			<nav className="flex items-center min-h-14">
				{loading ? null : (
					<ul className="menu menu-horizontal items-center">
						{currentUser?.uid ? (
							<>
								<li className="dropdown dropdown-end">
									<div
										tabIndex={0}
										role="button"
										className="btn btn-ghost flex items-center gap-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 text-primary"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
											/>
										</svg>
										<p className="font-semibold text-base-content">
											{currentUser.userName || "User"}
										</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-3"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m19.5 8.25-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</div>
									<ul
										tabIndex={0}
										className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
									>
										<li>
											<button onClick={handleSignOut}>Logout</button>
										</li>
									</ul>
								</li>
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
				)}
			</nav>
		</header>
	);
}

export default Header;
