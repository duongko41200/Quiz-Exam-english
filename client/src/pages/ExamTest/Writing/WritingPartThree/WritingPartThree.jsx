import React, { useCallback, useEffect, useState } from 'react';
import '../../Reading/ExamReading.css';
import { useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import TextareaInput from '../../../../components/TextareaAutosize/TextareaAutosize';
import { Box, Button, Checkbox, TextareaAutosize } from '@mui/material';

const QUESTON_FIRST = 0;
const QUESTON_SECOND = 1;
const QUESTON_THIRD = 2;

const WritingPartThree = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resWritingPartOne, setResWritingPartOne] = useState();
	const [contentPartOne, setContentPartOne] = useState();

	const [result1, setResult1] = useState([]);
	const [result2, setResult2] = useState([]);
	const [result3, setResult3] = useState([]);

	const debounce = (func, wait) => {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	};
	const handleChangeTextarea = useCallback(
		debounce((e, index) => {
			console.log('values text:', e.target.value);

			const value = e.target.value;

			const inputWords = value
				.toLowerCase()
				.split(/\s+/)
				.filter((word) => word.length > 0);

			console.log({ inputWords });

			if (index === QUESTON_FIRST) setResult1(inputWords);
			if (index === QUESTON_SECOND) setResult2(inputWords);
			if (index === QUESTON_THIRD) setResult3(inputWords);
		}, 300),
		[]
	);

	useEffect(() => {
		const writingPartThree = testBankData.writing.part3[RES_DATA];
		setResWritingPartOne(
			writingPartThree?.questions[RES_DATA].subQuestion
		);
		setContentPartOne(writingPartThree?.questions[RES_DATA].content);
	}, [testBankData]);

	return (
		<div>
			<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
				<b>{contentPartOne}</b>
			</div>
			<div className="lrn_response_innerbody lrn-response-validate-wrapper">
				<div className="lrn_response_input"></div>

				<div className="flex justify-start flex-col gap-4">
					{resWritingPartOne &&
						resWritingPartOne.map((item, index) => {
							return (
								<Box
									key={index}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										gap: 2,
									}}
								>
									<Box>
										<Box>
											<Box fontSize="1rem" width={500}>
												{item.content}
											</Box>
										</Box>
									</Box>
									<Box>
										<TextareaInput>
											<TextareaAutosize
												className=" text-md text-bold font-normal w-full leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[17px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-lg"
												aria-label="empty textarea"
												placeholder="Type your answer here"
												onChange={(e) => handleChangeTextarea(e, index)}
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
											Word:
											{index === 0
												? result1.length
												: index === 1
												? result2.length
												: result3.length}
											/64
										</Box>
									</Box>
								</Box>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default WritingPartThree;
