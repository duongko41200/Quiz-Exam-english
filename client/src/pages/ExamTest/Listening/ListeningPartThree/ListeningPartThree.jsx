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

const ListeningPartThree = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const numberQuestionEachPart = useSelector(
		(state) => state.listeningStore.numberQuestionEachPart
	);

	const [resSpeakingPartTwo, setResSpeakingPartTwo] = useState();
	const [contentPartTwo, setContentPartTwo] = useState();
	const [subQuestions, setSubQuestions] = useState([]);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const selectOption = (e, index) => {
		console.log('e.target.value', e.target.value);
		console.log('index', index);

		dispatch(
			SET_RESPONSE_RESULT_LISTENING({
				part: 3,
				index: index,
				value: e.target.value,
				number: 0,
			})
		);
	};

	useEffect(() => {
		if (testBankData.speaking.part1.length <= 0) {
			navigate('/');
			return;
		}

		const ListeningPartThree = testBankData.listening.part3[RES_DATA];

		setResSpeakingPartTwo(ListeningPartThree);
		setContentPartTwo(ListeningPartThree?.questions);

		setSubQuestions(
			ListeningPartThree?.questions[RES_DATA].subQuestion
		);
	}, [testBankData]);

	return (
		<div className="flex flex-col gap-4 ">
			<div className=" mb-2">
				{contentPartTwo &&
					contentPartTwo[RES_DATA] &&
					contentPartTwo[RES_DATA].content}
			</div>

			<div className="hover:underline cursor-pointer w-fit">
				Play/Stop
			</div>
			<div className="flex flex-col gap-6">
				<div className='font-medium'>Who expresses which opinion?</div>
				{subQuestions.length > 0 &&
					subQuestions.map((item, index) => (
						<div className="flex h-[40px] w-full   cursor-pointer  ">
							<div className="w-fit   text-[15px] h-full flex items-center font-medium justify-start">
								<div>
									{index + 1}. {item.content}
								</div>
							</div>

							<div className="w-fit px-[0.8rem] flex items-center text-md ">
								<select
									aria-label="Response input area"
									className="lrn-cloze-select lrn_cloze_response  w-full font-medium"
									data-inputid="1"
									onChange={(e) => {
										selectOption(e, index);
									}}
									defaultValue={item.responseUser}
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
	);
};

export default ListeningPartThree;
