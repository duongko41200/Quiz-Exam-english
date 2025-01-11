import React, { useEffect, useState } from 'react';
import '../../Reading/ExamReading.css';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import { useNavigate } from 'react-router-dom';
import { SET_RESPONSE_RESULT_LISTENING } from '../../../../store/feature/testBank';

const convertToWord = {
	1: 'A',
	2: 'B',
	3: 'C',
	4: 'D',
};

const ListeningPartFour = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const numberQuestionEachPart = useSelector(
		(state) => state.listeningStore.numberQuestionEachPart
	);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleClick = (item, indexAnswer, indexSubQuestion) => {
		dispatch(
			SET_RESPONSE_RESULT_LISTENING({
				part: 4,
				index: indexSubQuestion,
				value: item.content,
				number: numberQuestionEachPart - 16,
			})
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className=" mb-2">
				{numberQuestionEachPart >= 16 &&
					numberQuestionEachPart <= 17 &&
					testBankData.listening.part4[numberQuestionEachPart - 16] &&
					testBankData.listening.part4[numberQuestionEachPart - 16]
						.questions[0] &&
					testBankData.listening.part4[numberQuestionEachPart - 16]
						.questions[0].content}
			</div>

			<div className="hover:underline cursor-pointer w-fit">
				Play/Stop
			</div>
			<div>
				<div className="flex flex-col gap-8">
					{numberQuestionEachPart >= 16 &&
						numberQuestionEachPart <= 17 &&
						testBankData.listening.part4[numberQuestionEachPart - 16]
							.questions[0].subQuestion.length > 0 &&
						testBankData.listening.part4[
							numberQuestionEachPart - 16
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
											<div className={`text-[2rem] w-[4.5rem]  text-center h-full flex items-center border border-r-2 border-[#d4d4d4] justify-center ${
													item.responseUser === answer.content
														? 'bg-[#fefac7]'
														: 'hover:bg-[#f8f9fa]'
												}`}>
												<div>{convertToWord[idx + 1]}</div>
											</div>

											<div
												className={`w-full bg-[#eef0f3] p-[0.7rem] flex items-center text-md  ${
													item.responseUser === answer.content
														? 'bg-[#fefac7]'
														: 'hover:bg-[#f8f9fa]'
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
	);
};

export default ListeningPartFour;
