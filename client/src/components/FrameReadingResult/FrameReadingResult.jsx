import * as React from 'react';

export default function FrameReadingResult({ children }) {
	return (
		<div className="flex justify-center w-full max-h-[550px] min-h-[300px] rounded-xl  shadow-md border border-gray-300">
			<div className="left max-h-[550px] overflow-y-auto w-[60%] rounded-xl bg-gray-100 py-6 px-4">
				{children[0]}
			</div>

			<div className="right max-h-[550px] overflow-y-auto w-[40%] bg-white px-6 py-4 rounded-xl">
				<div class="question-group-wrapper flex flex-col gap-8">
					{children[1]}
				</div>
			</div>
		</div>
	);
}
