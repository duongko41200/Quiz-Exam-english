import React, { useEffect, useState } from 'react';
import '../../Reading/ExamReading.css';
import { useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import TextareaInput from '../../../../components/TextareaAutosize/TextareaAutosize';
import { Box, Button, Checkbox, TextareaAutosize } from '@mui/material';

const TITLE = 0;
const DEAR_PERSON = 1;
const FOOT_FISH = 2;
const SIGNAL = 3;

const WritingPartOne = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resWritingPartOne, setResWritingPartOne] = useState();
	const [contentPartOne, setContentPartOne] = useState();

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
					You want to join a travel club. You have 5 messages from a
					member of the club. Write short answers (1–5 words) to each
					message. Recommended time: 3 minutes.
				</b>
			</div>
			<div className="lrn_response_innerbody lrn-response-validate-wrapper">
				<div className="lrn_response_input"></div>

				<div className="flex justify-start flex-col gap-6">
					{/* {contentPartOne?.subQuestion &&
						renderSubQuestions(contentPartOne.subQuestion)} */}

					<Box>
						<Box>
							<Box>
								<p>What do you usually do in the morning? </p>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									maxRows={1}
									minRows={1}
								/>
							</TextareaInput>
						</Box>
					</Box>

					<Box>
						<Box>
							<Box>
								<p>What do you usually do in the morning? </p>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									maxRows={1}
									minRows={1}
								/>
							</TextareaInput>
						</Box>
					</Box>

					<Box>
						<Box>
							<Box>
								<p>What do you usually do in the morning? </p>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									maxRows={1}
									minRows={1}
								/>
							</TextareaInput>
						</Box>
					</Box>

					<Box>
						<Box>
							<Box>
								<p>What do you usually do in the morning? </p>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									maxRows={1}
									minRows={1}
								/>
							</TextareaInput>
						</Box>
					</Box>

					<Box>
						<Box>
							<Box>
								<p>What do you usually do in the morning? </p>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									maxRows={1}
									minRows={1}
								/>
							</TextareaInput>
						</Box>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default WritingPartOne;
