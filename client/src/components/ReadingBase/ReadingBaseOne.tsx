import React, { useEffect, useState } from 'react';
import '../../pages/ExamTest/Reading/ExamReading.css';
import { useDispatch, useSelector } from 'react-redux';
import { POINT_REPLACE, RES_DATA } from '../../Constant/global';
import {
	SET_RESPONSE_RESULT_READING,
	SET_TESTBANK_DATA,
} from '../../store/feature/testBank';
import TestBankService from '../../services/API/testBank.service';
import { useNavigate } from 'react-router-dom';

const TITLE = 0;
const DEAR_PERSON = 1;
const FOOT_FISH = 2;
const SIGNAL = 3;

const PART_ONE = 1;
interface SubQuestion {
	content: string;
	responseUser: string;
	answerList: { content: string }[];
}

interface ContentPartOne {
	content: string;
	subQuestion: SubQuestion[];
}

const ReadingBaseOne = ({ children }) => {
	const testBankData = useSelector(
		(state: any) => state.testBankStore.testBankData
	);

	const [resReadingPartOne, setResReadingPartOne] = useState();

	const [contentPartOne, setContentPartOne] =
		useState<ContentPartOne | null>(null);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const selectOption = (e, index) => {
		const value = e.target.value;

		dispatch(
			SET_RESPONSE_RESULT_READING({ part: PART_ONE, index, value })
		);
	};

	useEffect(() => {
		if (testBankData.reading.part1.length <= 0) {
			navigate('/');
			return;
		}
		const readingPartOne = testBankData.reading.part1[RES_DATA].data;
		setResReadingPartOne(readingPartOne);
		setContentPartOne(readingPartOne?.questions);
	}, [testBankData]);

	const renderSubQuestions = (subQuestions) => {
		return subQuestions.map((item, index) => (
			<div key={index} className="flex justify-start gap-1 text-sm">
				{item.content.split(' ').map((word, idx) =>
					word !== POINT_REPLACE ? (
						<div key={idx}>{word}</div>
					) : (
						<span key={idx} data-lrn-template-response="">
							<span className="lrn_combodiv">
								<select
									aria-label="Response input area"
									className="lrn-cloze-select lrn_cloze_response"
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
				<b>{contentPartOne?.content.split(POINT_REPLACE)[TITLE]}</b>
			</div>
			<div className="lrn_response_innerbody lrn-response-validate-wrapper">
				<div className="lrn_response_input"></div>
				<p>
					{contentPartOne?.content.split(POINT_REPLACE)[DEAR_PERSON]}
				</p>
				<div className="flex justify-start flex-col gap-6">
					 { children }
				</div>
				<div>
					{contentPartOne?.content.split(POINT_REPLACE)[FOOT_FISH]}
				</div>
				<p>{contentPartOne?.content.split(POINT_REPLACE)[SIGNAL]}</p>
			</div>
		</div>
	);
};

export default ReadingBaseOne;
