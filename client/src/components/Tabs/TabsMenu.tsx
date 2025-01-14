import * as React from 'react';

import Box from '@mui/material/Box';
import ResultTestReading from '../../pages/ExamTest/ResultTest/ResultReading/ResultReading';
import ResultTestWriting from '../../pages/ExamTest/ResultTest/ResultWritiing/ResultWriting';
import ResultTestSpeaking from '../../pages/ExamTest/ResultTest/ResultSpeaking/ResultSpeaking';
import ResultTestListening from '../../pages/ExamTest/ResultTest/ResultListening/ResultListening';
import { useDispatch, useSelector } from 'react-redux';
import { SET_IS_SHOW_RESULT } from '../../store/general';

export default function BasicTabsResult({
	resultReading,
	resultWriting,
}) {
	const [value, setValue] = React.useState(0);
	const [partSkill, setPartSkill] = React.useState('Reading');
	const [numberLession, setNumberLession] = React.useState(1);
	const isShowResult = useSelector(
		(state: any) => state.generalStore.isShowResult
	);

	const dispatch = useDispatch();

	const [numberListening, setNumberListening] = React.useState(1);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const passages = [
		{
			title: 'Speaking',
			questions: Array.from({ length: 4 }, (_, i) => i + 1),
		},
		{
			title: 'Listening',
			questions: Array.from({ length: 17 }, (_, i) => i + 1),
		},
		{
			title: 'Reading',
			questions: Array.from({ length: 5 }, (_, i) => i + 1),
		},
		{
			title: 'Writing',
			questions: Array.from({ length: 4 }, (_, i) => i + 1),
		},
	];

	const moveLession = (number: number, title: string) => {
		if (title != partSkill) {
			setPartSkill(title);
		}
		if (number >= 1 && number <= 13 && title === 'Listening') {
			setNumberLession(1);
			setNumberListening(number);
			return;
		}
		if (number == 14 && title === 'Listening') {
			setNumberLession(2);
			setNumberListening(number);
			return;
		}
		if (number == 15 && title === 'Listening') {
			setNumberLession(3);
			setNumberListening(number);
			return;
		}
		if (number >= 16 && title === 'Listening') {
			setNumberLession(4);
			setNumberListening(number);
			return;
		}

		setNumberLession(number);
	};

	const BackHistoryScreen = () => {
		dispatch(SET_IS_SHOW_RESULT(false));
	};
	return (
		<>
			<div
				className={` w-full flex ${
					!isShowResult ? 'justify-center' : 'justify-between gap-20'
				} gap-2 font-bold items-center h-[50px] text-[18px] `}
			>
				{isShowResult && (
					<div
						className="w-fit p-1 px-4 bg-blue-100 rounded-xl font-sans font-medium cursor-pointer hover:bg-blue-200"
						onClick={BackHistoryScreen}
					>
						Quay lại
					</div>
				)}

				<div className="text-[#45368f] ">
					Đáp án/transcript: Aptis Test - {partSkill} - Part
					{numberLession}
				</div>
				{isShowResult && <div> </div>}
			</div>
			<Box
				sx={{
					width: `${
						!isShowResult
							? 'calc(100vw - 40px) !important'
							: '100% !important'
					}`,
					display: 'flex',
					gap: 1,
					background: '#f8f9fa',
					marginBottom: `${isShowResult ? '0px' : '70px'}`,
					height: '580px',
					
				}}
			>
				<Box>
					{partSkill && partSkill === 'Reading' && (
						<ResultTestReading
							resultReading={resultReading}
							numberLession={numberLession}
						/>
					)}
					{partSkill && partSkill === 'Writing' && (
						<ResultTestWriting
							resultWriting={resultWriting}
							numberLession={numberLession}
						/>
					)}
					{partSkill && partSkill === 'Speaking' && (
						<ResultTestSpeaking numberLession={numberLession} />
					)}
					{partSkill && partSkill === 'Listening' && (
						<ResultTestListening
							numberLession={numberLession}
							numberListening={numberListening}
						/>
					)}
				</Box>
				<div className="h-full flex justify-center shadow-md bg-gray-100">
					<div className="p-4 pb-0 pt-3 bg-white shadow-md w-[220px] rounded-md w-full">
						{passages.map((passage, index) => (
							<div key={index} className="mb-4">
								<h2 className="font-bold mb-2">{passage.title}</h2>
								<div className="grid xl:grid-cols-4 sm:grid-cols-3 2xl:xl:grid-cols-5 gap-1">
									{passage.questions.map((question, idx) => (
										<button
											key={idx}
											className="w-10 h-10 border border-gray-500 font-medium rounded-md hover:text-white hover:bg-[#45368f] focus:bg-[#45368f] focus:text-white"
											onClick={() =>
												moveLession(question, passage.title)
											}
										>
											{question}
										</button>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</Box>
		</>
	);
}
