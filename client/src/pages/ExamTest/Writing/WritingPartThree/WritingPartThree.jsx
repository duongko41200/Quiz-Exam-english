import React, { useCallback, useEffect, useState } from 'react';
import '../../Reading/ExamReading.css';
import { useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import TextareaInput from '../../../../components/TextareaAutosize/TextareaAutosize';
import { Box, Button, Checkbox, TextareaAutosize } from '@mui/material';

const TITLE = 0;
const DEAR_PERSON = 1;
const FOOT_FISH = 2;
const SIGNAL = 3;

const WritingPartThree = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resWritingPartOne, setResWritingPartOne] = useState();
	const [contentPartOne, setContentPartOne] = useState();

	const [result1, setResult1] = useState([]);

	const debounce = (func, wait) => {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	};
	const handleChangeTextarea = useCallback(
		debounce((e) => {
			// const value = e.target.value
			// setInput(value);

			console.log('values text:', e.target.value);

			const value = e.target.value;

			const inputWords = value
				.toLowerCase()
				.split(/\s+/)
				.filter((word) => word.length > 0);

			console.log({ inputWords });

			setResult1(inputWords);

			// setUserCode(inputWords)
		}, 300),
		[]
	);

	useEffect(() => {
		const readingPartOne = testBankData.reading.part1[RES_DATA].data;
		setResWritingPartOne(readingPartOne);
		setContentPartOne(readingPartOne?.questions);
	}, [testBankData]);

	const renderSubQuestions = (subQuestions) => {
		return subQuestions.map((item, index) => (
			<div key={index} className="flex justify-start gap-1 text-sm">
				{item.content.split(' ').map((word, idx) =>
					word !== 'tentisspace' ? (
						<div key={idx}>{word}</div>
					) : (
						<span key={idx} data-lrn-template-response="">
							<span className="lrn_combodiv">
								<select
									aria-label="Response input area"
									className="lrn-cloze-select lrn_cloze_response"
									data-inputid="1"
								>
									<option
										role="option"
										value=""
										aria-label="Please select an option - "
									></option>
									{item.answerList.map((answer, idx) => (
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
					)
				)}
			</div>
		));
	};

	return (
		<div>
			<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
				<b>
					You are communicating with other members of the club in the
					chat room. Reply to their questions. Write in sentences. Use
					30–40 words per answer. Recommended time: 10 minutes.
				</b>
			</div>
			<div className="lrn_response_innerbody lrn-response-validate-wrapper">
				<div className="lrn_response_input"></div>

				<div className="flex justify-start flex-col gap-4">
					{/* {contentPartOne?.subQuestion &&
						renderSubQuestions(contentPartOne.subQuestion)} */}

					<Box
						sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
					>
						<Box>
							<Box>
								<Box fontSize="1 rem">
									Sam: Hi! Welcome to the club. Can you remember the
									first time you went on a journey by yourself? What was
									it like?
								</Box>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-xl"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									onChange={handleChangeTextarea}
									maxRows={4}
									minRows={4}
								/>
							</TextareaInput>
							<Box
								sx={{
									textAlign: 'end',
									padding: '10px',
									fontWeight: '500',
								}}
							>
								Word: {result1.length}/64
							</Box>
						</Box>
					</Box>

					<Box
						sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
					>
						<Box>
							<Box>
								<Box fontSize="1 rem">
									Sam: Hi! Welcome to the club. Can you remember the
									first time you went on a journey by yourself? What was
									it like?{' '}
								</Box>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-xl"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									onChange={handleChangeTextarea}
									maxRows={4}
									minRows={4}
								/>
							</TextareaInput>
							<Box
								sx={{
									textAlign: 'end',
									padding: '10px',
									fontWeight: '500',
								}}
							>
								Word: {result1.length}/64
							</Box>
						</Box>
					</Box>

					<Box
						sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
					>
						<Box>
							<Box>
								<Box fontSize="1 rem">
									Sam: Hi! Welcome to the club. Can you remember the
									first time you went on a journey by yourself? What was
									it like?{' '}
								</Box>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-xl"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									onChange={handleChangeTextarea}
									maxRows={4}
									minRows={4}
								/>
							</TextareaInput>
							<Box
								sx={{
									textAlign: 'end',
									padding: '10px',
									fontWeight: '500',
								}}
							>
								Word: {result1.length}/64{' '}
							</Box>
						</Box>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default WritingPartThree;
