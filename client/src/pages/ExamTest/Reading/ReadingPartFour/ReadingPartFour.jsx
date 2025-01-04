import { Box } from '@mui/material';
import './ReadingPartFour.css';
import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import {
	SET_ATTEMPTED_QUESTION,
	SET_RESPONSE_RESULT_READING,
} from '../../../../store/feature/testBank';

const PART_FOUR = 4;

const ReadingPartFour = () => {
	const [contentPartFour, setContentPartFour] = useState();
	const [subQuestion, setSubQuestion] = useState([]);
	const [answerList, setAnswerList] = useState([]);
	const dispatch = useDispatch();

	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	useEffect(() => {
		const readingPartFour = testBankData.reading.part4[RES_DATA].data;
		const content = readingPartFour?.questions?.content;
		const subQuestion = readingPartFour?.questions?.subQuestion;
		const answerList = readingPartFour?.questions?.answerList;

		setContentPartFour(content);
		setSubQuestion(subQuestion);
		setAnswerList(answerList);
	}, [testBankData]);

	const selectOption = (e, index) => {
		const value = e.target.value;

		dispatch(
			SET_RESPONSE_RESULT_READING({ part: PART_FOUR, index, value })
		);
		dispatch(
			SET_ATTEMPTED_QUESTION({
				numberQuestion: 4,
				currentExamPart: 'reading',
			})
		);
	};

	const renderContent = () => {
		if (!contentPartFour) return null;
		return contentPartFour.split('tentisspace').map((part, index) => (
			<Box
				key={index}
				className={index % 2 === 0 ? '' : 'ql-align-justify'}
				sx={{ fontSize: index === 1 ? '24px' : '15px' }}
			>
				{index % 2 === 0 || index === 1 ? (
					<strong>{part}</strong>
				) : (
					part
				)}
			</Box>
		));
	};

	return (
		<Box
			sx={{
				// border: '1px solid',
				minHeight: '200px',
				marginBottom: '4rem',
				borderRadius: '5px',
			}}
		>
			<Split className="split" minSize={200} sizes={[65, 35]}>
				<Box
					className="left bg-dark-layer-1"
					sx={{
						height: 'fit-content',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
						padding: '10px',
						overflowY: 'auto',
						gap: 2,
					}}
				>
					{renderContent()}
				</Box>

				{/* cau hoi va tra loi  */}
				<Box
					className="right"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
					}}
				>
					{subQuestion.length > 0 &&
						subQuestion.map((item, index) => {
							return (
								<Box
									sx={{ display: 'flex', padding: '10px' }}
									key={index}
								>
									<Box className="question-right p-1 col-8">
										<Box sx={{ fontSize: '14px' }}>{item.content}</Box>
									</Box>

									<Box className="answer p-1 col-4">
										<span data-lrn-template-response="">
											<span className="lrn_combobox">
												<select
													aria-label="Response input area"
													className="lrn-cloze-select lrn_cloze_response"
													data-inputid="0"
													onChange={(e) => {
														selectOption(e, index);
													}}
													defaultValue={item.responseUser}
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
								</Box>
							);
						})}
				</Box>
			</Split>
		</Box>
	);
};

export default ReadingPartFour;
