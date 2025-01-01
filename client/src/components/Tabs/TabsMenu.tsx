import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ResultTestReading from '../../pages/ExamTest/ResultTest/ResultReading/ResultReading';
import ResultTestWriting from '../../pages/ExamTest/ResultTest/ResultWritiing/ResultWriting';
import { Button, Grid, Typography } from '@mui/material';
import ResultTestSpeaking from '../../pages/ExamTest/ResultTest/ResultSpeaking/ResultSpeaking';

export default function BasicTabsResult({
	resultReading,
	resultWriting,
}) {
	const [value, setValue] = React.useState(0);
	const [partSkill, setPartSkill] = React.useState('Reading');
	const [numberLession, setNumberLession] = React.useState(1);

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
		setNumberLession(number);
		if (title != partSkill) {
			setPartSkill(title);
		}
	};
	return (
		<>
			<div className="w-full flex justify-center font-bold items-center h-[50px] text-[18px] ">
				Đáp án/transcript: Aptis Test - {partSkill} - Part{' '}
				{numberLession}
			</div>
			<Box
				sx={{
					width: 'calc(100vw - 40px) !important',
					display: 'flex',
					gap: 1,
					background: '#f8f9fa',
					marginBottom: '70px',
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
						<ResultTestSpeaking
							numberLession={numberLession}
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
