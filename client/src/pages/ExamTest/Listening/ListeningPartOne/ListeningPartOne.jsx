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
};

const ListeningPartOne = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const numberQuestionEachPart = useSelector(
		(state) => state.listeningStore.numberQuestionEachPart
	);

	const [resSpeakingPartOne, setResSpeakingPartOne] = useState();
	const [contentPartOne, setContentPartOne] = useState();
	const [subQuestions, setSubQuestions] = useState([]);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleClick = (item, index) => {
		console.log('item', item);
		console.log('index', index);

		dispatch(
			SET_RESPONSE_RESULT_LISTENING({
				part: 1,
				index: numberQuestionEachPart - 1,
				value: item.content,
				number: 0,
			})
		);
	};

	useEffect(() => {
		// if (testBankData.speaking.part1.length <= 0) {
		// 	navigate('/');
		// 	return;
		// }

		const ListeningPartOne = testBankData.listening.part1[RES_DATA];

		console.log('ListeningPartOne', ListeningPartOne);
		console.log('testBankData', testBankData);

		setResSpeakingPartOne(ListeningPartOne);
		setContentPartOne(ListeningPartOne?.questions);

		setSubQuestions(ListeningPartOne?.questions[RES_DATA].subQuestion);
	}, [testBankData]);

	return (
		<div className="flex flex-col gap-4">
			<div className=" mb-2">
				{subQuestions.length > 0 &&
					subQuestions[numberQuestionEachPart - 1].content}
			</div>

			<div className="hover:underline cursor-pointer w-fit">
				Play/Stop
			</div>
			<div className="flex flex-col gap-1">
				{subQuestions.length > 0 &&
					subQuestions[numberQuestionEachPart - 1].answerList.map(
						(item, index) => (
							<div
								className="flex h-[65px] w-full  border border-[#d4d4d4] cursor-pointer "
								onClick={() => {
									handleClick(item, index);
								}}
							>
								<div
									className={`text-[2rem] w-[4.5rem]  text-center h-full flex items-center border border-r-2 border-[#d4d4d4] justify-center ${
										subQuestions[numberQuestionEachPart - 1]
											?.responseUser === item.content
											? 'bg-[#fefac7]'
											: 'hover:bg-[#f8f9fa]'
									}`}
								>
									<div>{convertToWord[index + 1]}</div>
								</div>

								<div
									className={`w-full bg-[#eef0f3] p-[0.7rem] flex items-center text-md  ${
										subQuestions[numberQuestionEachPart - 1]
											?.responseUser === item.content
											? 'bg-[#fefac7]'
											: 'hover:bg-[#f8f9fa]'
									}`}
								>
									<div>{item?.content}</div>
								</div>
							</div>
						)
					)}
			</div>
		</div>
	);
};

export default ListeningPartOne;
