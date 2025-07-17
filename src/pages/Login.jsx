import React from "react";

function Login() {
	return (
		<form className=" bg-base-200 border-base-300 rounded-box w-md border p-8">
			<div>
				<h1 className="text-4xl font-bold text-neutral">Sign In</h1>
				<p className="py-4 text-sm">
					Welcome to your corner of the internet. You'll never be bored again.
				</p>
			</div>
			<div className="flex flex-col">
				<label className="label">Email</label>
				<input type="email" className="input w-full" placeholder="Email" />
				<p className="text-error text-sm my-1">error</p>
			</div>
			<div className="flex flex-col">
				<label className="label">Password</label>
				<input type="password" className="input w-full" placeholder="Password" />
				<p className="text-error text-sm my-1">error</p>
			</div>

			<button className="btn btn-neutral mt-4 w-full">Login</button>
		</form>
	);
}

export default Login;
