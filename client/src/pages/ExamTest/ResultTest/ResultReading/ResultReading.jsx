import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import BasicTable from '../../../../components/Table/BasicTable/BasicTable';
import ReadingBaseOne from '../../../../components/ReadingBase/ReadingBaseOne.tsx';
import FrameReadingResult from '../../../../components/FrameReadingResult/FrameReadingResult.jsx';

const PART_ONE = 1;
const TITLE = 0;
const DEAR_PERSON = 1;
const FOOT_FISH = 2;
const SIGNAL = 3;

const ResultTestReading = ({ resultReading }) => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resReadingPartOne, setResReadingPartOne] = useState();

	const [contentPartOne, setContentPartOne] = useState(null);

	useEffect(() => {
		if (testBankData.reading.part1.length <= 0) {
			navigate('/');
			return;
		}
		const readingPartOne = testBankData.reading.part1[RES_DATA].data;
		setResReadingPartOne(readingPartOne);
		setContentPartOne(readingPartOne?.questions);
	}, [testBankData]);
	return (
		<div className="px-10 py-6 bg-gray-100 flex flex-col gap-10">
			<FrameReadingResult>
				<ReadingBaseOne>
					{contentPartOne?.subQuestion.length > 0 &&
						contentPartOne?.subQuestion.map((item, index) => {
							return (
								<div
									key={index}
									className="flex justify-start gap-1 text-sm"
								>
									{item.content.split(' ').map((word, idx) =>
										word !== 'tentisspace' ? (
											<div key={idx}>{word}</div>
										) : (
											<span key={idx} className="">
												<span>
													<select
														className={`font-medium text-[15px] ${
															item.responseUser === item.correctAnswer
																? 'text-green-700'
																: 'text-red-700'
														} ${
															!item.responseUser && 'bg-gray-200'
														}  border border-gray-400 rounded-md p-1 w-20`}
														defaultValue={item.responseUser}
														disabled
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
							);
						})}
				</ReadingBaseOne>
				{resultReading?.[0]?.part1 &&
					resultReading?.[0]?.part1.map((item, index) => {
						return (
							<div class="questions-wrapper " key={index}>
								<div class="question-wrapper flex gap-2">
									<div class="question-number">
										<strong className="rounded-full bg-[#e8f2ff] text-[#35509a] w-[40px] h-[40px] leading-[40px] text-[15px] text-center inline-block">
											{index + 1}
										</strong>
									</div>

									<div class="question-content ">
										<div class="mt-2 text-success text-[#3cb46e] text-lg">
											{item.resultCorrect}
										</div>
									</div>
								</div>
							</div>
						);
					})}
			</FrameReadingResult>

			<FrameReadingResult>
				<div className="flex flex-col gap-6">
					{resultReading?.[1]?.part2?.[0]?.resultCorrect?.map(
						(item, index) => (
							<div
								className="border border-gray-300 p-2 bg-gray-50 min-h-[50px]"
								key={index}
							>
								<div>
									{
										resultReading?.[1]?.part2?.[0]?.resultOfUser?.[
											index
										]?.content
									}
								</div>
							</div>
						)
					)}
				</div>

				{resultReading?.[1]?.part2?.[0]?.resultCorrect?.map(
					(item, index) => {
						return (
							<div class="questions-wrapper " key={index}>
								<div class="question-wrapper flex gap-2">
									<div class="question-number">
										<strong className="rounded-full bg-[#e8f2ff] text-[#35509a] w-[40px] h-[40px] leading-[40px] text-[15px] text-center inline-block">
											{index + 1}
										</strong>
									</div>

									<div class="question-content ">
										<div class="mt-2 text-success text-[#3cb46e] text-lg">
											{item.content}
										</div>
									</div>
								</div>
							</div>
						);
					}
				)}
			</FrameReadingResult>

			<FrameReadingResult>
				<div className="flex flex-col gap-6">
					{resultReading?.[2]?.part3?.[0]?.resultCorrect?.map(
						(item, index) => (
							<div
								className="border border-gray-300 p-2 bg-gray-50 min-h-[50px]"
								key={index}
							>
								<div>
									{
										resultReading?.[1]?.part2?.[0]?.resultOfUser?.[
											index
										]?.content
									}
								</div>
							</div>
						)
					)}
				</div>

				{resultReading?.[2]?.part3?.[0]?.resultCorrect?.map(
					(item, index) => {
						return (
							<div class="questions-wrapper " key={index}>
								<div class="question-wrapper flex gap-2">
									<div class="question-number">
										<strong className="rounded-full bg-[#e8f2ff] text-[#35509a] w-[40px] h-[40px] leading-[40px] text-[15px] text-center inline-block">
											{index + 1}
										</strong>
									</div>

									<div class="question-content ">
										<div class="mt-2 text-success text-[#3cb46e] text-lg">
											{item.content}
										</div>
									</div>
								</div>
							</div>
						);
					}
				)}
			</FrameReadingResult>

			<div className="flex flex-col gap-10">
				<div className="flex gap-10">
					<div>
						<h2>PART 4:</h2>
						<BasicTable rows={resultReading?.[3]?.part4} />
					</div>
					<div>
						<h2>PART 5:</h2>
						<BasicTable rows={resultReading?.[4]?.part5} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultTestReading;
