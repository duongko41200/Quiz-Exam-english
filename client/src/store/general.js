import { createSlice } from '@reduxjs/toolkit';

const convertCurrentExamSkill = (currentExamPart) => {
	switch (currentExamPart) {
		case 1:
			return 'listening';
		case 2:
			return 'reading';
		case 3:
			return 'writing';
		case 4:
			return 'speaking';
		default:
			return 'reading';
	}
};
const initialState = {
	openModalBottom: false,
	currentExamPart: 'reading',
	pointExam: 2,
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
			state.currentExamPart = convertCurrentExamSkill(
				state.pointExam + 1
			);
		},
		SET_RESET_PART_SKILL: (state, action) => {
			state.currentExamPart = 'reading';
			state.pointExam = 2;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	SET_OPEN_MODAL_BOTTOM,
	SET_MOVE_EXAM_SKILL,
	SET_RESET_PART_SKILL,
} = generalReducer.actions;

export default generalReducer.reducer;
