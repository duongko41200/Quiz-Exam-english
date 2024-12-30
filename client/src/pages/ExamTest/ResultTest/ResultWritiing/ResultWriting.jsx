import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import BasicTable from '../../../../components/Table/BasicTable/BasicTable';
import { Box, TextareaAutosize } from '@mui/material';
import FrameReadingResult from '../../../../components/FrameReadingResult/FrameReadingResult';
import TextareaInput from '../../../../components/TextareaAutosize/TextareaAutosize';

const PART_ONE = 1;

const ResultTestWriting = ({ resultWriting, numberLession }) => {
	console.log('resultWriting', resultWriting);

	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resWritingPartOne, setResWritingPartOne] = useState();
	const [contentPartOne, setContentPartOne] = useState();
	const [resWritingPartTwo, setResWritingPartTwo] = useState();
	const [contentPartTwo, setContentPartTwo] = useState();
	const [resWritingPartThree, setResWritingPartThree] = useState();
	const [contentPartThree, setContentPartThree] = useState();
	const dispatch = useDispatch();
	useEffect(() => {
		const writingPartOne = testBankData.writing.part1[RES_DATA];
		const writingPartTwo = testBankData.writing.part2[RES_DATA];
		const writingPartThree = testBankData.writing.part3[RES_DATA];
		setResWritingPartThree(
			writingPartThree?.questions[RES_DATA].subQuestion
		);
		setContentPartThree(writingPartThree?.questions[RES_DATA].content);
		setResWritingPartTwo(
			writingPartTwo?.questions[RES_DATA].subQuestion
		);
		setContentPartTwo(writingPartTwo?.questions[RES_DATA].content);

		setResWritingPartOne(
			writingPartOne.questions[RES_DATA].subQuestion
		);
		setContentPartOne(writingPartOne?.questions[RES_DATA].content);
	}, [testBankData]);

	const renderPartOne = () => (
		<FrameReadingResult>
			<div>
				<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
					<b>{contentPartOne}</b>
				</div>
				<div className="lrn_response_innerbody lrn-response-validate-wrapper">
					<div className="lrn_response_input"></div>

					<div className="flex justify-start flex-col gap-2">
						{resWritingPartOne &&
							resWritingPartOne.map((item, index) => {
								return (
									<Box key={index}>
										<Box>
											<Box>
												<div className="mb-2">{item.content} </div>
											</Box>
										</Box>
										<Box>
											<TextareaAutosize
												className=" text-[16px] text-bold font-normal w-full leading-normal  rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-slate-500 dark:hover:border-purple-500 focus:border-slate-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-bold dark:text-slate-300 focus-visible:outline-0 box-border p-[15px] bg-[#f8f8f8] font-sans placeholder:text-black placeholder:text-[14px]"
												aria-label="empty textarea"
												placeholder="Type your answer here"
												maxRows={1}
												minRows={1}
												defaultValue={item.responseUser}
												disabled
											/>
										</Box>
									</Box>
								);
							})}
					</div>
				</div>
			</div>
			<div></div>
		</FrameReadingResult>
	);

	const renderPartTwo = () => (
		<FrameReadingResult>
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
										maxRows={5}
										minRows={5}
										defaultValue={
											resWritingPartTwo &&
											resWritingPartTwo[0].responseUser
										}
										disabled
									/>
								</TextareaInput>
								<Box
									sx={{
										textAlign: 'end',
										padding: '10px',
										fontWeight: '500',
									}}
								>
									Word:{' '}
									{resWritingPartTwo[0].responseUser.split(' ').length}
									/45
								</Box>
							</Box>
						</Box>
					</div>
				</div>
			</div>
			<div></div>
		</FrameReadingResult>
	);

	const renderPartThree = () => (
		<FrameReadingResult>
			<div>
				<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
					<b>{contentPartThree}</b>
				</div>
				<div className="lrn_response_innerbody lrn-response-validate-wrapper">
					<div className="lrn_response_input"></div>

					<div className="flex justify-start flex-col gap-4">
						{resWritingPartThree &&
							resWritingPartThree.map((item, index) => {
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
												<Box fontSize="15px" width={500}>
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
													maxRows={4}
													minRows={4}
													defaultValue={item.responseUser}
												/>
											</TextareaInput>
											{/* <Box
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
										</Box> */}
										</Box>
									</Box>
								);
							})}
					</div>
				</div>
			</div>

			<div></div>
		</FrameReadingResult>
	);

	return (
		<div
			className="bg-[#f8f9fa] flex flex-col gap-10"
			style={{ width: 'calc(100vw - 270px)', important: 'true' }}
		>
			{numberLession === 1 && renderPartOne()}
			{numberLession === 2 && renderPartTwo()}
			{numberLession === 3 && renderPartThree()}
			{numberLession === 4 && renderPartFour()}
			{/* {numberLession === 5 && renderPartFive()} */}
		</div>

		// <div className="flex flex-col gap-10">
		// 	<div>
		// 		<h2>PART1:</h2>
		// 		<div>
		// 			{resultWriting &&
		// 				resultWriting?.[0]?.part1?.map((item, index) => {
		// 					return (
		// 						<div key={index} className="flex flex-col gap-6">
		// 							<div>{item.content}</div>
		// 							<div>
		// 								{item.responseUser
		// 									? item.responseUser
		// 									: 'khong co gia tri'}
		// 							</div>
		// 						</div>
		// 					);
		// 				})}
		// 		</div>
		// 	</div>
		// 	<div>
		// 		<h2>PART1:</h2>
		// 		<div>
		// 			{resultWriting &&
		// 				resultWriting?.[1]?.part2?.map((item, index) => {
		// 					return (
		// 						<div key={index} className="flex flex-col gap-6">
		// 							<div>{item.content}</div>
		// 							<div>
		// 								{item.responseUser
		// 									? item.responseUser
		// 									: 'khong co gia tri'}
		// 							</div>
		// 						</div>
		// 					);
		// 				})}
		// 		</div>
		// 	</div>
		// 	<div>
		// 		<h2>PART3:</h2>
		// 		<div>
		// 			{resultWriting &&
		// 				resultWriting?.[2]?.part3?.map((item, index) => {
		// 					return (
		// 						<div key={index} className="flex flex-col gap-6">
		// 							<div>{item.content}</div>
		// 							<div>
		// 								{item.responseUser
		// 									? item.responseUser
		// 									: 'khong co gia tri'}
		// 							</div>
		// 						</div>
		// 					);
		// 				})}
		// 		</div>
		// 	</div>

		// 	<div>
		// 		<h2>PART4:</h2>
		// 		<div>
		// 			{resultWriting &&
		// 				resultWriting?.[3]?.part4?.map((item, index) => {
		// 					return (
		// 						<div key={index} className="flex flex-col gap-6">
		// 							<div>{item.content}</div>
		// 							<div>
		// 								{item.responseUser
		// 									? item.responseUser
		// 									: 'khong co gia tri'}
		// 							</div>
		// 						</div>
		// 					);
		// 				})}
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default ResultTestWriting;
