import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './feature/countSlide';
import wordReducer from './feature/word';
import authReducer from './feature/auth';
import generalReducer from './general';
import readingReducer from './feature/reading';
import testBankReducer from './feature/testBank';
import writingReducer from './feature/writing';
import speakingReducer  from './feature/speaking';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		wordStore: wordReducer,
		authStore: authReducer,
		generalStore: generalReducer,
		readingStore: readingReducer,
		writingStore: writingReducer,
		speakingStore: speakingReducer,
		testBankStore: testBankReducer,
	},
});
