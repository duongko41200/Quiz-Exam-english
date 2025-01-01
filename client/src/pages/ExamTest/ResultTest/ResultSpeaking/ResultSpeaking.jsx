import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import BasicTable from '../../../../components/Table/BasicTable/BasicTable';
import FrameReadingResult from '../../../../components/FrameReadingResult/FrameReadingResult.jsx';

const ResultTestSpeaking = ({ numberLession }) => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resSpeakingPartOne, setResSpeakingPartOne] = useState();
	const [subQuestions, setSubQuestions] = useState([]);
	const [contentPartOne, setContentPartOne] = useState(null);

	useEffect(() => {
		const SpeakingPartOne = testBankData.speaking.part1[RES_DATA];
		setResSpeakingPartOne(SpeakingPartOne);
		setContentPartOne(SpeakingPartOne?.questions);
		setSubQuestions(SpeakingPartOne?.questions[RES_DATA].subQuestion);
	}, [testBankData]);

	const renderPartOne = () => (
		<FrameReadingResult>
			<div className="flex flex-col gap-8">
				<div className="font-bold text-[17px]">
					{contentPartOne && contentPartOne[0].content}
				</div>
				{subQuestions.length > 0 &&
					subQuestions.map((item, index) => {
						return (
							<div key={index}>
								<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
									<b>
										{index + 11}. {item.content}
									</b>
								</div>

								{item.responseUser && (
									<div style={{ marginTop: '20px' }}>
										<audio
											controls
											src={item.responseUser}
											className="w-full max-w-lg bg-white rounded-lg p-2 shadow-lg outline-none custom-audio"
										></audio>
										{/* <a
							href={item.responseUser}
							download="recording.mp3"
							style={{ display: 'block', marginTop: '10px' }}
						>
							Tải xuống
						</a> */}
									</div>
								)}
							</div>
						);
					})}
			</div>
			<></>
		</FrameReadingResult>
	);

	return (
		<div
			className="bg-[#f8f9fa] flex flex-col gap-10"
			style={{ width: 'calc(100vw - 270px)', important: 'true' }}
		>
			{numberLession === 1 && renderPartOne()}
			{/* {numberLession === 2 && renderPartTwo()}
			{numberLession === 3 && renderPartThree()}
			{numberLession === 4 && renderPartFour()}
			{numberLession === 5 && renderPartFive()} */}
		</div>
	);
};

export default ResultTestSpeaking;
