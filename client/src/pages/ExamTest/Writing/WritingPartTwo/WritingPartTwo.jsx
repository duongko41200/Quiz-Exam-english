import React, { useCallback, useEffect, useState } from 'react';
import '../../Reading/ExamReading.css';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import TextareaInput from '../../../../components/TextareaAutosize/TextareaAutosize';
import { Box, Button, Checkbox, TextareaAutosize } from '@mui/material';
import { SET_RESPONSE_RESULT_WRITING } from '../../../../store/feature/testBank';

const PART_TWO = 2;

const WritingPartTwo = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);
	const [result, setResult] = useState([]);

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

			setResult(inputWords);
			dispatch(
				SET_RESPONSE_RESULT_WRITING({ part: PART_TWO, index: 0, value })
			);

			// setUserCode(inputWords)
		}, 500),
		[]
	);

	useEffect(() => {
		const writingPartTwo = testBankData.writing.part2[RES_DATA];
		setResWritingPartOne(
			writingPartTwo?.questions[RES_DATA].subQuestion
		);
		setContentPartOne(writingPartTwo?.questions[RES_DATA].content);
	}, [testBankData]);

	useEffect(() => {
		const writingPartTwo = testBankData.writing.part2[RES_DATA].questions[0].subQuestion

		console.log("testBankData",testBankData)

		// if (writingPartTwo) {

		// 	console.log('writingPartTwo:', writingPartTwo);
		// 	const inputWords = writingPartTwo[0].responseUser
		// 		.toLowerCase()
		// 		.split(/\s+/)
		// 		.filter((word) => word.length > 0);
		// 	setResult(inputWords);
		// }
	}, []);

	return (
		<div>
			<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
				<b>{contentPartOne}</b>
			</div>
			<div className="lrn_response_innerbody lrn-response-validate-wrapper">
				<div className="lrn_response_input"></div>

				<div className="flex justify-start flex-col gap-6">
					<Box>
						<Box>
							<Box>
								<p>
									{resWritingPartOne && resWritingPartOne[0].content}
								</p>
							</Box>
						</Box>
						<Box>
							<TextareaInput>
								<TextareaAutosize
									className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600 dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
									aria-label="empty textarea"
									placeholder="Type your answer here"
									onChange={handleChangeTextarea}
									maxRows={5}
									minRows={5}
									defaultValue={
										resWritingPartOne &&
										resWritingPartOne[0].responseUser
									}
								/>
							</TextareaInput>
							<Box
								sx={{
									textAlign: 'end',
									padding: '10px',
									fontWeight: '500',
								}}
							>
								Word: {result.length}/45
							</Box>
						</Box>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default WritingPartTwo;
