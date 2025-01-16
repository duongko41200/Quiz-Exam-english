import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INDEXED_DB_APTIS, INDEXED_DB_APTIS_STORE, RES_DATA } from '../../../Constant/global';
import BasicTable from '../../../components/Table/BasicTable/BasicTable';
import BasicTabsResult from '../../../components/Tabs/TabsMenu';
import { SET_MODAL_LIST } from '../../../store/general';
import { use } from 'react';
import useIndexedDB from '../../../hook/useIndexedDB';

const PART_ONE = 1;

const checkResult = (resultOfUser, resultCorrect) => {
	if (resultOfUser === '') return 'Chưa trả lời';
	return resultOfUser === resultCorrect ? 'Đúng' : 'Sai';
};

const displayCorrectAnswer = (correctAnswer, correct) => {
	if (!correct || !correctAnswer) return [];
	const contentMap = correct.reduce((map, item) => {
		map[item.numberOrder] = item.content;
		return map;
	}, {});
	return correctAnswer.map((number) => contentMap[number]);
};
const getResult = (partData, isSubQuestion = false) => {
	const questions = isSubQuestion ? partData.subQuestion : partData;
	return questions.map((item, index) => ({
		id: index + 1,
		resultOfUser: item.responseUser,
		resultCorrect: item.correctAnswer,
		reviewAnswer: checkResult(item.responseUser, item.correctAnswer),
	}));
};

const getResultWithDisplay = (partData) => {
	let resultCorrect = [];
	for (let i = 0; i < partData.correctAnswer.length; i++) {
		for (let j = 0; j < partData.answerList.length; j++) {
			if (
				partData.answerList[j].numberOrder === partData.correctAnswer[i]
			) {
				resultCorrect.push(partData.answerList[j]);
			}
		}
	}

	return {
		id: 1,
		resultOfUser: partData.responseUser,
		resultCorrect,
		reviewAnswer: '',
	};
};

const ResultTest = () => {
	const { saveObjectToDB, getDataFromDB, isSaving, error } = useIndexedDB(
    INDEXED_DB_APTIS,
INDEXED_DB_APTIS_STORE,
    "id"
  );
	const [people, setPeople] = useState([]);

	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resultReading, setResultReading] = useState([
		{ part1: [] },
		{ part2: [] },
		{ part3: [] },
		{ part4: [] },
		{ part5: [] },
	]);

	const [resultWriting, setResultWriting] = useState();
	const [resultSpeaking, setResultSpeaking] = useState();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(SET_MODAL_LIST(false));
	}, []);

	useEffect(() => {

		 getDataFromDB();
		const objectsToSave = {
			id: Date.now(),
			data: testBankData,
		};

		console.log({ objectsToSave });

		saveObjectToDB(objectsToSave);
	}, []);

	useEffect(() => {
		const readingPartOne = getResult(
			testBankData.reading.part1[RES_DATA].data.questions,
			true
		);
		const readingPartFour = getResult(
			testBankData.reading.part4[RES_DATA].data.questions,
			true
		);
		const readingPartFive = getResult(
			testBankData.reading.part5[RES_DATA]?.data?.questions,
			true
		);

		const readingPartTwo = getResultWithDisplay(
			testBankData.reading.part2[RES_DATA].data.questions
		);
		const readingPartThree = getResultWithDisplay(
			testBankData.reading.part3[RES_DATA].data.questions
		);

		const resultReading = [
			{ part1: readingPartOne },
			{ part2: [readingPartTwo] },
			{ part3: [readingPartThree] },
			{ part4: readingPartFour },
			{ part5: readingPartFive },
		];

		const writingPartOne =
			testBankData.writing.part1[RES_DATA].questions[0].subQuestion;
		const writingPartTwo =
			testBankData.writing.part2[RES_DATA].questions[0].subQuestion;
		const writingPartThree =
			testBankData.writing.part3[RES_DATA].questions[0].subQuestion;
		const writingPartFour =
			testBankData.writing.part4[RES_DATA].questions[0].subQuestion;

		const resultWriting = [
			{ part1: writingPartOne },
			{ part2: writingPartTwo },
			{ part3: writingPartThree },
			{ part4: writingPartFour },
		];

		// const speakingPartOne = getResult(
		// 	testBankData.speaking.part1[RES_DATA].questions,
		// 	true
		// );

		setResultReading(resultReading);
		setResultWriting(resultWriting);
	}, [testBankData]);

	return (
		<div className="p-4 bg-[#f8f9fa]">
			<div>
				<BasicTabsResult
					resultReading={resultReading}
					resultWriting={resultWriting}
				/>
			</div>
		</div>
	);
};

export default ResultTest;
