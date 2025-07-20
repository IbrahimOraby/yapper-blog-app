import React from "react";

function PostSkeleton() {
	return (
		<div className="bg-base-100 border border-base-300 rounded-xl px-5 py-4 animate-pulse space-y-4 min-w-xl">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="skeleton w-6 h-6 rounded-full" />
					<div className="skeleton w-24 h-4 rounded" />
				</div>
				<div className="skeleton w-20 h-3 rounded" />
			</div>

			<div className="skeleton h-5 w-1/2 rounded" />

			<div className="space-y-2">
				<div className="skeleton h-4 w-full rounded" />
				<div className="skeleton h-4 w-5/6 rounded" />
				<div className="skeleton h-4 w-4/6 rounded" />
			</div>

			<div className="skeleton w-full h-48 rounded-lg" />

			<div className="flex justify-end gap-2 pt-2">
				<div className="skeleton w-16 h-8 rounded" />
				<div className="skeleton w-16 h-8 rounded" />
			</div>
		</div>
	);
}

export default PostSkeleton;
