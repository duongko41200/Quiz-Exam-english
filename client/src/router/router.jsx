import App from '../App';
import MainDash from '../pages/MainDash/MainDash';
import Review from '../pages/Review/Review';
import Speaking from '../pages/Speaking/Speaking';
import Settings from '../pages/Settings/Settings';
import Word from '../pages/Review/Word/Word';
import CheckList from '../pages/Review/CkeckList/CheckList';
import PenddingCheck from '../pages/Review/PenddingCheck/PenddingCheck';
import SignUp from '../pages/SignUp/SignUp';
import { createBrowserRouter } from 'react-router-dom';
import SignIn from '../pages/Login/SignIn';

import RoomExam from '../pages/ExamTest/RoomExams';
import HistoryExam from '../pages/History/HistoryExam';

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '', element: <MainDash /> },
			{ path: 'history', element: <HistoryExam /> },
			{
				path: 'review/',
				element: <Review />,
				children: [
					{ path: '', element: <Word /> },
					{ path: 'review/check', element: <CheckList /> },
					{ path: 'review/pendding', element: <PenddingCheck /> },
				],
			},
			{ path: 'speaking', element: <Speaking /> },
			{ path: 'setting', element: <Settings /> },
		],
	},

	{
		path: '/exam-test',
		element: <RoomExam />,
	},
	{ path: '/signup', element: <SignUp /> },
	{ path: '/login', element: <SignIn /> },

	////// feature ADD newm Word/Sentence
];

const router = createBrowserRouter(routes);

export default router;
