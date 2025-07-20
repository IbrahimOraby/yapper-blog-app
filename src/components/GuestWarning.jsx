import React from "react";
import { Link } from "react-router";

function GuestWarning() {
	return (
		<div className="bg-warning text-warning-content px-6 py-3 text-sm rounded-box">
			Welcome to <strong>Yapper</strong> — feel free to browse all posts! But if
			you wanna <strong>yap</strong> yourself, you'll need to{" "}
			<Link
				to="/login"
				className="underline hover:text-warning-content/80 font-semibold"
			>
				sign in
			</Link>
			.
		</div>
	);
}

export default GuestWarning;
