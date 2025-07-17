import React from "react";

function FormHeader({ children }) {
	return (
		<div>
			<h1 className="text-4xl font-bold text-neutral">{children || 'Default Header'}</h1>
			<p className="py-4 text-sm">
				Welcome to your corner of the internet. Let the yapping begin.
			</p>
		</div>
	);
}

export default FormHeader;
