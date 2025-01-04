import * as React from 'react';

export default function FrameReadingResult({ children, percentage = 60, defaultWidth = false }) {
	return (
		<div className={`flex w-full  h-[580px] min-h-[300px] rounded-xl  shadow-md border border-gray-300 bg-white p-4 pr-0`}>
			<div className={`left max-h-[550px] overflow-y-auto min-w-[60%]  ${defaultWidth? 'w-[300px]' :'w-fit'} rounded-xl bg-[#f8f9fa] py-6 px-4`}>
				{children[0]}
			</div>

			<div className={`right max-h-[550px] overflow-y-auto w-[${100 - percentage}%] bg-white px-6 py-4 rounded-xl`}>
				<div class="question-group-wrapper flex flex-col gap-8">
					{children[1]}
				</div>
			</div>
		</div>
	);
}
