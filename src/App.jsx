import { Link, Outlet } from "react-router";

function App() {
	return (
		<>
			<header>
				<nav className="">
					<ul>
						<li className="nav">
							<Link className="btn" to={"about"}>
								About
							</Link>
						</li>
						<li>
							<Link className="btn" to={""}>
								Home
							</Link>
						</li>
					</ul>
				</nav>
			</header>
			<Outlet />
			<footer>
				<div>Footer</div>
			</footer>
		</>
	);
}

export default App;
