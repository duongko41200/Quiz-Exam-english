import React, { useCallback, useEffect, useState } from 'react';
import '../../Reading/ExamReading.css';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import TextareaInput from '../../../../components/TextareaAutosize/TextareaAutosize';
import { Box, Button, Checkbox, TextareaAutosize } from '@mui/material';
import { SET_ATTEMPTED_QUESTION, SET_RESPONSE_RESULT_WRITING } from '../../../../store/feature/testBank';

const PART_ONE = 1;

const WritingPartOne = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resWritingPartOne, setResWritingPartOne] = useState();
	const [contentPartOne, setContentPartOne] = useState();
	const dispatch = useDispatch();

	const debounce = (func, wait) => {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	};
	const handleChangeTextarea = useCallback(
		debounce((e, index) => {
			const value = e.target.value;

			const inputWords = value
				.toLowerCase()
				.split(/\s+/)
				.filter((word) => word.length > 0);

			console.log({ inputWords });

			dispatch(
				SET_RESPONSE_RESULT_WRITING({ part: PART_ONE, index, value })
			);
			dispatch(
				SET_ATTEMPTED_QUESTION({
					part: index + 1,
					numberQuestion: 1,
					currentExamPart: 'writing',
					
				})
			);
		}, 300),
		[]
	);

	useEffect(() => {
		const writingPartOne = testBankData.writing.part1[RES_DATA];

		setResWritingPartOne(
			writingPartOne.questions[RES_DATA].subQuestion
		);
		setContentPartOne(writingPartOne?.questions[RES_DATA].content);
	}, [testBankData]);

	return (
		<div>
			<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
				<b>{contentPartOne}</b>
			</div>
			<div className="lrn_response_innerbody lrn-response-validate-wrapper">
				<div className="lrn_response_input"></div>

				<div className="flex justify-start flex-col gap-6">
					{resWritingPartOne &&
						resWritingPartOne.map((item, index) => {
							return (
								<Box key={index}>
									<Box>
										<Box>
											<p>{item.content} </p>
										</Box>
									</Box>
									<Box>
										<TextareaInput>
											<TextareaAutosize
												className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
												aria-label="empty textarea"
												placeholder="Type your answer here"
												onChange={(e) => handleChangeTextarea(e, index)}
												maxRows={1}
												minRows={1}
												defaultValue={item.responseUser}
											/>
										</TextareaInput>
									</Box>
								</Box>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default WritingPartOne;
