import React, { useState } from "react";
import { signUpUser } from "../services/auth_service";

function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const userCredential = await signUpUser(username, email, password);
			console.log("✅ Signed up:", userCredential.user);
			// You can redirect or show success UI here
		} catch (err) {
			console.error("❌ Signup error:", err);
			setError(err.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-base-200 border-base-300 rounded-box w-md border p-8 space-y-4"
		>
			<div>
				<h1 className="text-4xl font-bold text-neutral">Sign Up</h1>
				<p className="py-4 text-sm">
					Welcome to your corner of the internet. You'll never be bored again.
				</p>
			</div>

			<div className="flex flex-col">
				<label className="label">Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="input w-full"
					placeholder="Username"
				/>
			</div>

			<div className="flex flex-col">
				<label className="label">Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="input w-full"
					placeholder="Email"
				/>
			</div>

			<div className="flex flex-col">
				<label className="label">Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="input w-full"
					placeholder="Password"
				/>
			</div>

            <div className="h-1">
			{error && <p className="text-error text-sm my-2">{error}</p>}
            </div>
			<button
				className="btn btn-neutral mt-4 w-full"
				type="submit"
				disabled={loading}
			>
				{loading ? "Creating Account..." : "Sign Up"}
			</button>
		</form>
	);
}

export default Signup;
