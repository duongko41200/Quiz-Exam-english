import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	numberQuestion: 1,
	numberQuestionEachPart: 1,
};

export const listeningReducer = createSlice({
	name: 'ListeningStore',
	initialState,
	reducers: {
		SET_INCREMENT_LISTENING: (state, action) => {
			state.numberQuestion += 1;
		},
		SET_DECREMENT_LISTENING: (state, action) => {
			state.numberQuestion -= 1;
		},

		SET_INCREMENT_LISTENING_EACH_PART: (state, action) => {
			state.numberQuestionEachPart += 1;
		},
		SET_DECREMENT_LISTENING_EACH_PART: (state, action) => {
			state.numberQuestionEachPart -= 1;
		},
		SET_RESET_NUMBER_QUESTION_LISTENING: (state, action) => {
			state.numberQuestionEachPart = 1;
		},
		SET_NUMBER_QUESTION_LISTENING: (state, action) => {
			let numberQuestionPart = action.payload.numberQuestionPart;

			const numberQuestion = action.payload.numberQuestion.question;

			if (numberQuestion === 2) {
				numberQuestionPart = 13;
			}
			if (numberQuestion === 3) {
				numberQuestionPart = 14;
			}
			if (numberQuestion === 4) {
				numberQuestionPart = 15 + numberQuestionPart;
			}

			state.numberQuestion = numberQuestion;

			state.numberQuestionEachPart = numberQuestionPart + 1;
		},

		//Actiona
	},
});

// Action creators are generated for each case reducer function
export const {
	SET_INCREMENT_LISTENING,
	SET_DECREMENT_LISTENING,
	SET_INCREMENT_LISTENING_EACH_PART,
	SET_DECREMENT_LISTENING_EACH_PART,
	SET_RESET_NUMBER_QUESTION_LISTENING,
	SET_NUMBER_QUESTION_LISTENING,
} = listeningReducer.actions;

export default listeningReducer.reducer;
