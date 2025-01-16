import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOTAL_NUMBER_PART } from '../../Constant/global';

const setResponseReading = (questions, limit) => {
	questions.forEach((question, index) => {
		if (index < limit) {
			question['responseUser'] = '';
		}
	});
};

const setResponseWriting = (questions, limit) => {
	questions.forEach((question, index) => {
		if (index < limit) {
			question['responseUser'] = '';
		}
	});
};

const initialState = {
	testBankData: {
		title: 'đề mẫu',
		speaking: {
			part1: [],
			part2: [],
			part3: [],
			part4: [],
			part5: [],
		},
		listening: {
			part1: [],
			part2: [],
			part3: [],
			part4: [],
		},
		reading: {
			part1: [],
			part2: [],
			part3: [],
			part4: [],
			part5: [],
		},
		writing: {
			part1: [],
			part2: [],
			part3: [],
			part4: [],
			part5: [],
		},
	},

	dataOfModalList: {},
};

export const testBankReducer = createSlice({
	name: 'testBankStore',
	initialState,
	reducers: {
		SET_WORD: (state, action) => {
			state.wordObject[`${Object.keys(action.payload)}`] =
				action.payload[`${Object.keys(action.payload)}`];
		},
		SET_TYPE_TEXT: (state, action) => {
			state.typeText = action.payload;
		},
		// SET_TESTBANK_DATA: (state, action) => {
		//   state.testBankData[action.payload.type][
		//     `part${action.payload.partSkill}`
		//   ] = action.payload.newSelection;
		// },
		RESET_TESTBANK_DATA: (state, action) => {
			state.testBankData = {
				title: 'đề mẫu',
				speaking: {
					part1: [],
					part2: [],
					part3: [],
					part4: [],
					part5: [],
				},
				listening: {
					part1: [],
					part2: [],
					part3: [],
					part4: [],
				},
				reading: {
					part1: [],
					part2: [],
					part3: [],
					part4: [],
					part5: [],
				},
				writing: {
					part1: [],
					part2: [],
					part3: [],
					part4: [],
					part5: [],
				},
			};
		},

		SET_DATA_OF_MODAL_LIST: (state, action) => {
			const { testBankData, currentExamPart, currentQuestion } =
				action.payload;

			let numberQuestion = [];

			console.log('testBankData: testbank', testBankData);

			if (currentExamPart === 'reading') {
				for (let i = 0; i < 5; i++) {
					numberQuestion.push({
						question: i + 1,
						currentExamPart: currentExamPart,

						questionPart: {
							question: i + 1,
							status: false,
							isWatching: currentQuestion == i + 1 ? true : false,
							activeQuestion: currentQuestion == i + 1 ? true : false,
						},
					});
				}
			}

			if (currentExamPart === 'writing') {
				const questionPart = testBankData[currentExamPart];

				for (let i = 0; i < 4; i++) {
					numberQuestion.push({
						question: i + 1,
						currentExamPart: currentExamPart,
						activeQuestion: currentQuestion == i + 1 ? true : false,
						numberPart:
							questionPart[`part${i + 1}`][0].questions[0].subQuestion
								.length,

						questionPart: questionPart[
							`part${i + 1}`
						][0].questions[0].subQuestion.map((item, index) => {
							return {
								question: index + 1,
								status: false,
								isWatching: currentQuestion == i + 1 ? true : false,
								activeQuestion: currentQuestion == i + 1 ? true : false,
							};
						}),
					});
				}
			}

			if (currentExamPart === 'listening') {
				const questionPart = testBankData[currentExamPart];

				for (let i = 0; i < 4; i++) {
					if (i == 0 || i == 3) {
						numberQuestion.push({
							question: i + 1,
							currentExamPart: currentExamPart,
							activeQuestion: currentQuestion == i + 1 ? true : false,
							numberPart:
								questionPart[`part${i + 1}`][0].questions[0].subQuestion
									.length,

							questionPart: questionPart[
								`part${i + 1}`
							][0].questions[0].subQuestion.map((item, index) => {
								return {
									question: i == 3 ? index + 16 : index + 1,
									status: false,
									isWatching: index == i ? true : false,
									activeQuestion:
										currentQuestion == (i == 3 ? index + 16 : index + 1)
											? true
											: false,
								};
							}),
						});
						continue;
					}

					numberQuestion.push({
						question: i + 1,
						currentExamPart: currentExamPart,
						activeQuestion: currentQuestion == i + 1 ? true : false,
						numberPart: 1,

						questionPart: [
							{
								question: i + 13,
								status: false,
								isWatching: currentQuestion == i + 13 ? true : false,
								activeQuestion:
									currentQuestion == i + 13 ? true : false,
							},
						],
					});
				}
			}

			const dataOfModalList = {
				currentExamPart: currentExamPart,
				currentQuestion: 1,
				numberQuestion,
				totalPart: TOTAL_NUMBER_PART[currentExamPart],
			};

			state.dataOfModalList = dataOfModalList;
		},

		SET_UPDATE_MODAL_LIST: (state, action) => {
			const { numberQuestion, currentExamPart } = action.payload;
			let numberQuestionUpdate = [];

			if (currentExamPart === 'reading') {
				numberQuestionUpdate = state.dataOfModalList.numberQuestion.map(
					(item, index) => {
						if (item.question === numberQuestion) {
							item.questionPart.activeQuestion = true;
							item.questionPart.isWatching = true;
						} else {
							item.questionPart.activeQuestion = false;
						}
						return item;
					}
				);
			}
			if (currentExamPart === 'writing') {
				numberQuestionUpdate = state.dataOfModalList.numberQuestion.map(
					(item, index) => {
						if (item.question === numberQuestion) {
							item.activeQuestion = true;
							item.questionPart.map((item) => {
								item.isWatching = true;
								return item;
							});
						} else {
							item.activeQuestion = false;
						}
						return item;
					}
				);
			}

			if (currentExamPart === 'listening') {
				if (numberQuestion == 18) return;
				numberQuestionUpdate = state.dataOfModalList.numberQuestion.map(
					(item, index) => {
						item?.questionPart?.map((data) => {
							if (data.question === numberQuestion) {
								data.activeQuestion = true;
								data.isWatching = true;
							} else {
								data.activeQuestion = false;
							}
							return data;
						});

						let questionPart = 1;

						if (numberQuestion >= 1 && numberQuestion <= 13) {
							questionPart = 1;
						}
						if (numberQuestion == 14) {
							questionPart = 2;
						}

						if (numberQuestion == 15) {
							questionPart = 3;
						}
						if (numberQuestion == 16 || numberQuestion == 17) {
							questionPart = 4;
						}

						item.activeQuestion = item.question === questionPart;
						item.questionPart.forEach((part) => {
							if (part.question == numberQuestion) {
								part.isWatching = true;
							}
						});

						return item;
					}
				);
			}

			state.dataOfModalList.numberQuestion = numberQuestionUpdate;
		},

		SET_ATTEMPTED_QUESTION: (state, action) => {
			const { currentExamPart } = action.payload;

			let numberQuestionUpdate = [];

			if (currentExamPart === 'reading') {
				const { numberQuestion } = action.payload;
				numberQuestionUpdate = state.dataOfModalList.numberQuestion.map(
					(item, index) => {
						if (item.question === numberQuestion) {
							item.questionPart.status = true;
						}
						return item;
					}
				);
			}

			if (currentExamPart === 'writing') {
				const { part, numberQuestion } = action.payload;
				numberQuestionUpdate = state.dataOfModalList.numberQuestion.map(
					(item, index) => {
						if (
							item.currentExamPart === 'writing' &&
							item.question === numberQuestion
						) {
							item.questionPart.map((data) => {
								if (data.question === part) {
									data.status = true;
								}

								return item;
							});
						}
						return item;
					}
				);
			}

			if (currentExamPart === 'listening') {
				const { part, numberQuestion } = action.payload;
				numberQuestionUpdate = state.dataOfModalList.numberQuestion.map(
					(item, index) => {
						if (
							item.currentExamPart === 'listening' &&
							item.question === numberQuestion
						) {
							item.questionPart.map((data) => {
								if (data.question === part) {
									data.status = true;
								}

								return item;
							});
						}
						return item;
					}
				);
			}

			state.dataOfModalList.numberQuestion = numberQuestionUpdate;
		},

		SET_TESTBANK_DATA: (state, action) => {
			const testBank = action.payload;

			const { writing, reading, speaking, listening } = testBank;

			if (listening) {
				for (let i = 1; i <= 4; i++) {
					listening[`part${i}`]?.forEach((item) => {
						item.questions[0].subQuestion.forEach((subItem) => {
							subItem['isActive'] = false;

							subItem['responseUser'] = '';
						});
					});
				}
			}
			if (reading) {
				for (let i = 1; i <= 5; i++) {

					if(i === 2 || i === 3) {
						reading[`part${i}`][0].data.questions['responseUser'] = [null, null , null, null, null]
					}
				}
			}

			state.testBankData = testBank;
		},

		SET_TESTBANK_DATA_RESULT: (state, action) => {
			const testBank = action.payload;

			state.testBankData = testBank;
		},

		SET_RESPONSE_RESULT_WRITING: (state, action) => {
			const { part, index, value } = action.payload;

			state.testBankData['writing'][`part${part}`][0]['questions'][0][
				'subQuestion'
			][index]['responseUser'] = value;
		},

		SET_RESPONSE_RESULT_READING: (state, action) => {
			const { part, index, value } = action.payload;

			if (part === 1 || part === 4 || part === 5) {
				state.testBankData['reading'][`part${part}`][0]['data'][
					'questions'
				]['subQuestion'][index]['responseUser'] = value;
			}
			if (part === 2 || part === 3) {
				state.testBankData['reading'][`part${part}`][0]['data'][
					'questions'
				]['responseUser'] = value;
			}
		},
		SET_RESPONSE_RESULT_SPEAKING: (state, action) => {
			const { part, index, value } = action.payload;

			console.log({ part, index, value });

			state.testBankData['speaking'][`part${part}`][0]['questions'][0][
				'subQuestion'
			][index - 1]['responseUser'] = value;
		},
		SET_RESPONSE_RESULT_LISTENING: (state, action) => {
			const { part, index, value, number } = action.payload;

			// if (part === 4) {
			// 	state.testBankData['listening'][`part${part}`][number]['questions'][0][
			// 		'subQuestion'
			// 	][index]['responseUser'] = value;

			// 	return
			// }

			console.log({ part, index, value, number });
			state.testBankData['listening'][`part${part}`][number][
				'questions'
			][0]['subQuestion'][index]['responseUser'] = value;

			// state.testBankData['listening'][`part${1}`][0][
			// 	'questions'
			// ][0]['subQuestion'][0]['responseUser'] = value;

			// state.testBankData['listening'][`part${part}`][number]['questions'][0][
			// 	'subQuestion'
			// ][index]['isActive'] = true;

			// console.log('state.testBankData', await state.testBankData);
		},
	},
});

export const {
	SET_WORD,
	SET_TESTBANK_DATA,
	SET_TYPE_TEXT,
	RESET_TESTBANK_DATA,
	SET_RESPONSE_RESULT_WRITING,
	SET_RESPONSE_RESULT_READING,
	SET_RESPONSE_RESULT_SPEAKING,
	SET_DATA_OF_MODAL_LIST,
	SET_UPDATE_MODAL_LIST,
	SET_ATTEMPTED_QUESTION,
  SET_RESPONSE_RESULT_LISTENING,
  SET_TESTBANK_DATA_RESULT
} = testBankReducer.actions;

export default testBankReducer.reducer;
