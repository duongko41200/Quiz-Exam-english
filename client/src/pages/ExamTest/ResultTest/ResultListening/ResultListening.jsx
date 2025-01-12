import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POINT_REPLACE, RES_DATA } from '../../../../Constant/global';
import BasicTable from '../../../../components/Table/BasicTable/BasicTable';
import ReadingBaseOne from '../../../../components/ReadingBase/ReadingBaseOne.tsx';
import FrameReadingResult from '../../../../components/FrameReadingResult/FrameReadingResult.jsx';
import { Box } from '@mui/material';

const TITLE = 0;
const DEAR_PERSON = 1;
const FOOT_FISH = 2;
const convertToWord = {
	1: 'A',
	2: 'B',
	3: 'C',
	4: 'D',
};
const ResultTestListening = ({ numberLession, numberListening }) => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [subQuestions, setSubQuestions] = useState([]);
	const [contentPartTwo, setContentPartTwo] = useState();
	const [subQuestionsTwo, setSubQuestionsTwo] = useState([]);
	const [contentPartThree, setContentPartThree] = useState([]);
	const [subQuestionsThree, setSubQuestionsThree] = useState([]);

	useEffect(() => {
		// if (testBankData.reading.part1.length <= 0) {
		// 	navigate('/');
		// 	return;
		// }

		const ListeningPartOne = testBankData.listening.part1[RES_DATA];

		const ListeningPartTwo = testBankData.listening.part2[RES_DATA];

		const ListeningPartThree = testBankData.listening.part3[RES_DATA];

		setContentPartThree(ListeningPartThree?.questions);

		setSubQuestionsThree(
			ListeningPartThree?.questions[RES_DATA].subQuestion
		);

		setContentPartTwo(ListeningPartTwo?.questions);

		setSubQuestionsTwo(
			ListeningPartTwo?.questions[RES_DATA].subQuestion
		);

		setSubQuestions(ListeningPartOne?.questions[RES_DATA].subQuestion);
	}, [testBankData]);

	const renderPartOne = () => (
		<FrameReadingResult>
			<div className="flex flex-col gap-4">
				<div className=" mb-2">
					{subQuestions.length > 0 &&
						subQuestions[numberListening - 1].content}
				</div>

				<div className="hover:underline cursor-pointer w-fit">
					Play/Stop
				</div>
				<div className="flex flex-col gap-1">
					{subQuestions.length > 0 &&
						subQuestions[numberListening - 1].answerList.map(
							(item, index) => (
								<div
									className="flex h-[65px] w-full  border border-[#d4d4d4] cursor-pointer "
									// onClick={() => {
									// 	handleClick(item, index);
									// }}
								>
									<div
										className={`text-[2rem] w-[4.5rem]  text-center h-full flex items-center border border-r-2 border-[#d4d4d4] justify-center ${
											subQuestions[numberListening - 1]
												?.responseUser ===
												subQuestions[numberListening - 1]
													?.correctAnswer &&
											subQuestions[numberListening - 1]
												?.responseUser === item.content
												? 'bg-[#69c18ed4]'
												: ''
										}   ${
											subQuestions[numberListening - 1]
												?.responseUser !==
												subQuestions[numberListening - 1]
													?.correctAnswer &&
											subQuestions[numberListening - 1]
												?.responseUser === item.content
												? 'bg-red-400'
												: ''
										}`}
									>
										<div>{convertToWord[index + 1]}</div>
									</div>

									<div
										className={`w-full bg-[#eef0f3] p-[0.7rem] flex items-center text-md  ${
											subQuestions[numberListening - 1]
												?.responseUser ===
												subQuestions[numberListening - 1]
													?.correctAnswer &&
											subQuestions[numberListening - 1]
												?.responseUser === item.content
												? 'bg-[#69c18ed4]'
												: ''
										}   ${
											subQuestions[numberListening - 1]
												?.responseUser !==
												subQuestions[numberListening - 1]
													?.correctAnswer &&
											subQuestions[numberListening - 1]
												?.responseUser === item.content
												? 'bg-red-400'
												: ''
										}`}
									>
										<div>{item?.content}</div>
									</div>
								</div>
							)
						)}
				</div>
			</div>

			{/* {resultReading?.[0]?.part1 &&
				resultReading?.[0]?.part1.map((item, index) => (
					<div className="questions-wrapper" key={index}>
						<div className="question-wrapper flex gap-2">
							<div className="question-number">
								<strong className="rounded-full bg-[#e8f2ff] text-[#35509a] w-[40px] h-[40px] leading-[40px] text-[15px] text-center inline-block">
									{index + 1}
								</strong>
							</div>
							<div className="question-content">
								<div className="mt-2 text-success text-[#3cb46e] text-[15px]">
									{item.resultCorrect}
								</div>
							</div>
						</div>
					</div>
				))} */}
			<div>ksdjfklsd</div>
		</FrameReadingResult>
	);

	const renderPartTwo = () => (
		<FrameReadingResult>
			<div className="flex flex-col gap-4">
				<div className=" mb-2">
					{contentPartTwo &&
						contentPartTwo[RES_DATA] &&
						contentPartTwo[RES_DATA].content}
				</div>

				<div className="hover:underline cursor-pointer w-fit">
					Play/Stop
				</div>
				<div className="flex flex-col gap-6">
					{subQuestionsTwo.length > 0 &&
						subQuestionsTwo.map((item, index) => (
							<div className="flex h-[40px] w-full   cursor-pointer  ">
								<div className="w-[7rem]   text-[15px] h-full flex items-center justify-start">
									<div> Speaker {convertToWord[index + 1]}</div>
								</div>

								<div className="w-1/2  px-[0.7rem] flex items-center text-md ">
									<select
										aria-label="Response input area"
										className={` h-full w-full font-medium ${
											item.responseUser === item.correctAnswer
												? 'text-green-400'
												: 'text-red-500'
										} `}
										data-inputid="1"
										defaultValue={item.responseUser}
										disabled
									>
										<option
											role="option"
											value=""
											aria-label="Please select an option - "
										></option>
										{contentPartTwo[RES_DATA] &&
											contentPartTwo[RES_DATA].answerList.map(
												(answer, idx) => (
													<option
														key={idx}
														role="option"
														value={answer.content}
													>
														{answer.content}
													</option>
												)
											)}
									</select>
								</div>
							</div>
						))}
				</div>
			</div>
			{/* {resultReading?.[1]?.part2?.[0]?.resultCorrect?.map(
				(item, index) => (
					<div className="questions-wrapper" key={index}>
						<div className="question-wrapper flex gap-2">
							<div className="question-number">
								<strong
									className={`rounded-full bg-[#e8f2ff] text-[#35509a] w-[40px] h-[40px] leading-[40px] text-[15px] text-center inline-block `}
								>
									{index + 1}
								</strong>
							</div>
							<div className="question-content">
								<div className="mt-2 text-success text-[#3cb46e] text-[15px]">
									{item?.content}
								</div>
							</div>
						</div>
					</div>
				)
			)} */}

			<div>duongko123</div>
		</FrameReadingResult>
	);

	const renderPartThree = () => (
		<FrameReadingResult>
			<div className="flex flex-col gap-4 ">
				<div className=" mb-2">
					{contentPartThree &&
						contentPartThree[RES_DATA] &&
						contentPartThree[RES_DATA].content}
				</div>

				<div className="hover:underline cursor-pointer w-fit">
					Play/Stop
				</div>
				<div className="flex flex-col gap-6">
					<div className="font-medium">
						Who expresses which opinion?
					</div>
					{subQuestionsThree.length > 0 &&
						subQuestionsThree.map((item, index) => (
							<div className="flex h-[40px] w-full   cursor-pointer  ">
								<div className="w-fit   text-[15px] h-full flex items-center font-medium justify-start">
									<div>
										{index + 1}. {item.content}
									</div>
								</div>

								<div className="w-fit px-[0.8rem] flex items-center text-md ">
									<select
										aria-label="Response input area"
										className={`  w-full font-medium  ${
											item.responseUser === item.correctAnswer
												? 'text-green-500'
												: 'text-red-500'
										}`}
										data-inputid="1"
										defaultValue={item.responseUser}
										disabled
									>
										<option
											role="option"
											value=""
											aria-label="Please select an option - "
										></option>
										{contentPartThree[RES_DATA] &&
											contentPartThree[RES_DATA].answerList.map(
												(answer, idx) => (
													<option
														key={idx}
														role="option"
														value={answer.content}
													>
														{answer.content}
													</option>
												)
											)}
									</select>
								</div>
							</div>
						))}
				</div>
			</div>
			{/* {resultReading?.[2]?.part3?.[0]?.resultCorrect?.map(
				(item, index) => (
					<div className="questions-wrapper" key={index}>
						<div className="question-wrapper flex gap-2">
							<div className="question-number">
								<strong
									className={`rounded-full bg-[#e8f2ff] text-[#35509a] w-[40px] h-[40px] leading-[40px] text-[15px] text-center inline-block `}
								>
									{index + 1}
								</strong>
							</div>
							<div className="question-content">
								<div className="mt-2 text-success text-[#3cb46e] text-[15px]">
									{item?.content}
								</div>
							</div>
						</div>
					</div>
				)
			)} */}

			<div>sjfsdkjf</div>
		</FrameReadingResult>
	);

	const renderPartFour = () => (
		<FrameReadingResult percentage={50}>
			<div className="flex flex-col gap-4">
				<div className=" mb-2">
					{numberListening >= 16 &&
						numberListening <= 17 &&
						testBankData.listening.part4[numberListening - 16] &&
						testBankData.listening.part4[numberListening - 16]
							.questions[0] &&
						testBankData.listening.part4[numberListening - 16]
							.questions[0].content}
				</div>

				<div className="hover:underline cursor-pointer w-fit">
					Play/Stop
				</div>
				<div>
					<div className="flex flex-col gap-8">
						{numberListening >= 16 &&
							numberListening <= 17 &&
							testBankData.listening.part4[numberListening - 16]
								.questions[0].subQuestion.length > 0 &&
							testBankData.listening.part4[
								numberListening - 16
							].questions[0].subQuestion.map((item, index) => (
								<div className="flex flex-col gap-2" key={index}>
									<div>{item.content}</div>
									<div className="flex flex-col gap-1">
										{item.answerList.map((answer, idx) => (
											<div
												className="flex h-[65px] w-full  border border-[#d4d4d4] cursor-pointer "
												key={idx}
												onClick={() => {
													handleClick(answer, idx, index);
												}}
											>
												<div
													className={`text-[2rem] w-[4.5rem]  text-center h-full flex items-center border border-r-2 border-[#d4d4d4] justify-center ${
														item?.responseUser ===
															item?.correctAnswer &&
														item?.responseUser === answer.content
															? 'bg-[#69c18ed4]'
															: ''
													}   ${
														item?.responseUser !==
															item?.correctAnswer &&
														item?.responseUser === answer.content
															? 'bg-red-400'
															: ''
													}`}
												>
													<div>{convertToWord[idx + 1]}</div>
												</div>

												<div
													className={`w-full bg-[#eef0f3] p-[0.7rem] flex items-center text-md  ${
														item?.responseUser ===
															item?.correctAnswer &&
														item?.responseUser === answer.content
															? 'bg-[#69c18ed4]'
															: ''
													}   ${
														item?.responseUser !==
															item?.correctAnswer &&
														item?.responseUser === answer.content
															? 'bg-red-400'
															: ''
													}`}
												>
													<div>{answer?.content}</div>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
			{/* {resultReadingFour &&
				resultReadingFour?.map((item, index) => (
					<div className="questions-wrapper" key={index}>
						<div className="question-wrapper flex gap-2">
							<div className="question-number">
								<strong className="rounded-full bg-[#e8f2ff] text-[#35509a] w-[40px] h-[40px] leading-[40px] text-[15px] text-center inline-block">
									{index + 1}
								</strong>
							</div>
							<div className="question-content">
								<div className="mt-2 text-success text-[#3cb46e] text-[15px]">
									<span className="text-gray-700 text-lg font-bold">
										{item?.content}
									</span>
									<u className="no-underline">
										{item.resultSystem &&
											item.resultSystem.map((item, index) => {
												return (
													<li
														key={index}
														className="text-green-500 text-none mt-2 no-underline text-sm"
													>
														{item}
													</li>
												);
											})}
									</u>
								</div>
							</div>
						</div>
					</div>
				))} */}

			<div>duongabc ksj</div>
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
		</div>
	);
};

export default ResultTestListening;
