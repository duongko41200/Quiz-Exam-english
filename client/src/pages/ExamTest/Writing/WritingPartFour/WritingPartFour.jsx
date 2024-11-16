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

const WritingPartFour = () => {
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
			<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5 flex flex-col gap-2">
				<div className="font-bold text-lg">
					You have received this email from the club:
				</div>

				<div>Dear Member,</div>
				<div>
					We are writing to tell you that the famous travel writer Mr
					David Price will unfortunately not be able to attend our next
					club meeting. Although Mr Price will not be there to sign
					copies of his new book Around The World In Eighty Ways,
					members of the club will be able to buy a copy at the price of
					twenty five pounds. If you would like to reserve a copy of the
					book, please contact the club secretary.
				</div>
				<div>The President</div>
			</div>
			<div className="lrn_response_innerbody lrn-response-validate-wrapper mt-10">
				<div className="lrn_response_input"></div>

				<div className="flex justify-start flex-col gap-4">
					{/* {contentPartOne?.subQuestion &&
						renderSubQuestions(contentPartOne.subQuestion)} */}

					<Box
						sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
					>
						<Box>
							<Box>
								<Box fontSize="0.9rem" fontWeight={700} width={500}>
									Write an email to your friend. Write about your
									feelings and what you think the club should do about
									the situation. Write about 50 words. Recommended time:
									10 minutes.
								</Box>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
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
								Word: {result1.length}/75
							</Box>
						</Box>
					</Box>

					<Box
						sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
					>
						<Box>
							<Box>
								<Box fontSize="0.9rem" fontWeight={700} width={500}>
									Write an email to your friend. Write about your
									feelings and what you think the club should do about
									the situation. Write about 50 words. Recommended time:
									10 minutes.
								</Box>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
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
								Word: {result1.length}/225
							</Box>
						</Box>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default WritingPartFour;
