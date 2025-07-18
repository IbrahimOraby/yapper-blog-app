import React from "react";

function AddButton() {
	return (
		<button
			className="btn btn-primary rounded-full fixed bottom-18 right-8 py-6 px-3 hover:scale-108"
			type="button"
			onClick={() => document.getElementById("post_modal").showModal()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={2.8}
				stroke="currentColor"
				className="size-6 text-primary-content"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 4.5v15m7.5-7.5h-15"
				/>
			</svg>
		</button>
	);
}

export default AddButton;
