import { Box, Button, Typography } from '@mui/material';
import './ReadingPartFive.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import {
	SET_ATTEMPTED_QUESTION,
	SET_RESPONSE_RESULT_READING,
} from '../../../../store/feature/testBank';

const PART_FIVE = 5;

const ReadingPartFive = () => {
	const [contentPartFour, setContentPartFour] = useState();
	const [subQuestion, setSubQuestion] = useState([]);
	const [answerList, setAnswerList] = useState([]);
	const dispatch = useDispatch();

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

	const selectOption = (e, index) => {
		const value = e.target.value;
		console.log({ value, index });

		dispatch(
			SET_RESPONSE_RESULT_READING({ part: PART_FIVE, index, value })
		);
		dispatch(
			SET_ATTEMPTED_QUESTION({
				numberQuestion: 5,
				currentExamPart: 'reading',
			})
		);
	};

	const renderContent = () => {
		if (!contentPartFour) return null;
		return contentPartFour.split('tentisspace').map((part, index) => (
			<Box
				key={index}
				className={index === 0 ? '' : 'ql-align-justify'}
				sx={{
					fontSize: index === 1 ? '24px' : '14px',
					lineHeight: '2.7rem',
				}}
			>
				{index >
					(contentPartFour.split('tentisspace')[1] === 'null'
						? 0
						: 1) && (
					<Box className="answer p-1 col-4 w-[200px]">
						<span data-lrn-template-response="">
							<span className="lrn_combobox">
								<select
									aria-label="Response input area"
									className="lrn-cloze-select lrn_cloze_response"
									data-inputid="0"
									onChange={(e) =>
										selectOption(
											e,
											index -
												(contentPartFour.split('tentisspace')[1] ===
												'null'
													? 1
													: 2)
										)
									}
									defaultValue={
										subQuestion.length > 0 &&
										subQuestion[
											index -
												(contentPartFour.split('tentisspace')[1] ===
												'null'
													? 1
													: 2)
										]?.responseUser
									}
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
