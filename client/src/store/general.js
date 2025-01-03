import { createSlice } from '@reduxjs/toolkit';

const convertCurrentExamSkill = (currentExamPart) => {
	switch (currentExamPart) {
		case 1:
			return 'speaking';
		case 2:
			return 'reading';
		case 3:
			return 'writing';
		case 4:
			return 'result';
		// case 5:
		// 	return 'result';
		default:
			return 'speaking';
	}
};
const initialState = {
	openModalBottom: false,
	currentExamPart: 'speaking',
	pointExam: 1, // current point skill exam
};

export const generalReducer = createSlice({
	name: 'generalStore',
	initialState,
	reducers: {
		SET_OPEN_MODAL_BOTTOM: (state, action) => {
			console.log('auth', action.payload);
			state.openModalBottom = action.payload;
		},

		SET_MOVE_EXAM_SKILL: (state, action) => {

			console.log("part:",convertCurrentExamSkill(
				state.pointExam + 1
			))
			state.currentExamPart = convertCurrentExamSkill(
				state.pointExam + 1
			);
			state.pointExam = state.pointExam + 1;
		},
		SET_RESET_PART_SKILL: (state, action) => {
			state.currentExamPart = 'speaking';
			state.pointExam = 1;
		},
		SET_RESULT_TEST: (state, action) => {
			state.currentExamPart = 'result';
			state.pointExam = 5;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	SET_OPEN_MODAL_BOTTOM,
	SET_MOVE_EXAM_SKILL,
	SET_RESET_PART_SKILL,
	SET_RESULT_TEST,
} = generalReducer.actions;

export default generalReducer.reducer;
