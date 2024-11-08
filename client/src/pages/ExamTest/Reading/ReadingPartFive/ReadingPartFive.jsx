import { Box, Button, Typography } from '@mui/material';
import './ReadingPartFive.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';

const ReadingPartFive = () => {
	const [contentPartFour, setContentPartFour] = useState();
	const [subQuestion, setSubQuestion] = useState([]);
	const [answerList, setAnswerList] = useState([]);

	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	useEffect(() => {
		const readingPartFive = testBankData.reading.part5[RES_DATA].data;
		const content = readingPartFive?.questions?.content;
		const subQuestion = readingPartFive?.questions?.subQuestion;
		const answerList = readingPartFive?.questions?.answerList;

		setContentPartFour(content);
		setSubQuestion(subQuestion);
		setAnswerList(answerList);
	}, [testBankData]);

	const renderContent = () => {
		if (!contentPartFour) return null;
		return contentPartFour.split('tentisspace').map((part, index) => (
			<Box
				key={index}
				className={index % 2 === 0 ? '' : 'ql-align-justify'}
				sx={{ fontSize: index === 1 ? '24px' : '14px',lineHeight: '2.7rem' }}
			>
				{index > 1 && (
					<Box className="answer p-1 col-4 w-[200px]">
						<span data-lrn-template-response="">
							<span className="lrn_combobox">
								<select
									aria-label="Response input area"
									className="lrn-cloze-select lrn_cloze_response"
									data-inputid="0"
								>
									<option
										role="option"
										value=""
										aria-label="Please select an option - "
									></option>
									{answerList.length > 0 &&
										answerList.map((answer, idx) => (
											<option
												key={idx}
												role="option"
												value={answer.content}
											>
												{answer.content}
											</option>
										))}
								</select>
							</span>
						</span>
					</Box>
				)}
				{index === 1 || index === 0 ? <strong>{part}</strong> : part}
			</Box>
		));
	};
	return (
		<>
			<Box
				sx={{
					minHeight: '200px',
					marginBottom: '4rem',
					borderRadius: '5px',
				}}
			>
				<Box
					className="left bg-dark-layer-1"
					sx={{
						height: 'fit-content',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
						gap: 3,
					}}
				>
					{renderContent()}

			
				</Box>
			</Box>
		</>
	);
};

export default ReadingPartFive;
