import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ExamReading from './Reading/ExamReading.jsx';
import ExamWriting from './Writing/ExamWriting.jsx';
import './RoomExam.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	SET_DECREMENT,
	SET_INCREMENT,
} from '../../store/feature/reading.js';
import { SET_MOVE_EXAM_SKILL } from '../../store/general.js';
import {
	SET_DECREMENT_WRITING,
	SET_INCREMENT_WRITING,
} from '../../store/feature/writing.js';
import BasicModal from '../../components/Modal/ModalBasic.jsx';
import ModalCountDown from '../../components/Modal/ModalCoutdown.jsx';
import ExamSpeaking from './Speaking/ExamSpeaking.jsx';
import { timecountSpeaking } from '../../Constant/speaking.js';
import {
	SET_INCREMENT_SPEAKING,
	SET_INCREMENT_SPEAKING_EACH_PART,
	SET_RESET_NUMBER_QUESTION_SPEAKING,
} from '../../store/feature/speaking.js';
import ResultTest from './ResultTest/ResultTest.jsx';
import { speechToText } from '../../utils/speechToText.js';

const RoomExam = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);
	const currentExamPart = useSelector(
		(state) => state.generalStore.currentExamPart
	);
	const numberQuestion = useSelector(
		(state) => state.readingStore.numberQuestion
	);
	const numberQuestionWriting = useSelector(
		(state) => state.writingStore.numberQuestion
	);
	const numberQuestionSpeaking = useSelector(
		(state) => state.speakingStore.numberQuestion
	);
	const numberQuestionEachPart = useSelector(
		(state) => state.speakingStore.numberQuestionEachPart
	);

	/////////// ABOVE REDUX //////////
	const dispatch = useDispatch();
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [timeLeft, setTimeLeft] = useState(null);
	const [intervalId, setIntervalId] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		if (currentExamPart === 'writing') {
			setMinutes(50);
			setTimeLeft(50 * 60);
		} else if (currentExamPart === 'reading') {
			setMinutes(30);
			setTimeLeft(30 * 60);
		}
	}, [currentExamPart]);

	//// XỬ LÝ THỜI GIAN CHO SPEAKING ////////

	useEffect(() => {
		if (currentExamPart === 'speaking') {
			/**
			 * b1: check xem part nào đang là part cuối cùng
			 * b2: cho đọc câu hỏi
			 * b3: đếm thời gian công thu âm
			 * b4: lưu file thu âm vào store
			 *
			 */
			setTimeout(() => {
				if (!window.speechSynthesis) {
					alert('Trình duyệt của bạn không hỗ trợ Text-to-Speech.');
					return;
				}

				setMinutes(0);
				setTimeLeft(timecountSpeaking[numberQuestionSpeaking]);
			}, 1000);
		}
	}, [numberQuestionSpeaking, numberQuestionEachPart]);

	////////////////////////////////////////////

	///////////// XỬ LÝ HÀNH ĐỘNG KHI HẾT THỜI GIAN //////////////////////
	useEffect(() => {
		if (timeLeft > 0) {
			const id = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
			setIntervalId(id);
			return () => clearInterval(id);
		}
		if (timeLeft === 0 && currentExamPart !== 'speaking') {
			moveExamSkill();
		}
		if (timeLeft === 0 && currentExamPart === 'speaking') {
			console.log({ numberQuestionEachPart });
			if (numberQuestionSpeaking !== 4 && numberQuestionEachPart < 4) {
				if (numberQuestionEachPart === 3) {
					nextQuestion();
					return;
				}
				dispatch(SET_INCREMENT_SPEAKING_EACH_PART());
			} else {
				moveExamSkill();
			}
		}
	}, [timeLeft]);

	///////////// XỬ LÝ HÀNH ĐỘNG KHI HẾT THỜI GIAN //////////////////////

	useEffect(() => {
		const remainingHours = Math.floor(timeLeft / 3600);
		const remainingMinutes = Math.floor((timeLeft % 3600) / 60);
		const remainingSeconds = timeLeft % 60;

		setHours(remainingHours);
		setMinutes(remainingMinutes);
		setSeconds(remainingSeconds);
	}, [timeLeft]);

	const resetCountdown = () => {
		clearInterval(intervalId);
		setMinutes(50);
		setSeconds(0);
		setTimeLeft(50 * 60);
	};

	const nextQuestion = () => {
		if (numberQuestion < 5 && currentExamPart === 'reading') {
			dispatch(SET_INCREMENT());
		}
		if (numberQuestionWriting < 4 && currentExamPart === 'writing') {
			dispatch(SET_INCREMENT_WRITING());
		}
		if (numberQuestionSpeaking < 4 && currentExamPart === 'speaking') {
			dispatch(SET_RESET_NUMBER_QUESTION_SPEAKING());
			dispatch(SET_INCREMENT_SPEAKING());
		}
	};

	const previousQuestion = () => {
		if (numberQuestion > 1 && currentExamPart === 'reading') {
			dispatch(SET_DECREMENT());
		}
		if (numberQuestionWriting > 1 && currentExamPart === 'writing') {
			dispatch(SET_DECREMENT_WRITING());
		}
	};

	const moveExamSkill = () => {
		setOpenModal(true);
	};
	const closeModal = () => {
		setOpenModal(false);
	};

	const nextPartSkill = () => {
		dispatch(SET_MOVE_EXAM_SKILL());
		// dispatch(SET_RESET_NUMBER_QUESTION());
		setOpenModal(false);
	};

	return (
		<>
			<Box>
				{currentExamPart && currentExamPart !== 'speaking' ? (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'end',
							alignItems: 'center',
							padding: '1rem',
							height: '3.75rem',
							width: '100%',
							backgroundColor: '#fff',
							position: 'fixed',
							zIndex: 1000,
						}}
					>
						<Box
							sx={{
								position: 'fixed',
								padding: '20px',
								paddingTop: '30px',
							}}
						>
							<Box
								sx={{
									margin: 0,
									color: '#161616',
									fontWeight: 'bold',
									fontSize: '1.5em',
								}}
							>
								<span>{hours.toString().padStart(2, '0')}</span>:
								<span>{minutes.toString().padStart(2, '0')}</span>:
								<span>{seconds.toString().padStart(2, '0')}</span>
							</Box>
							<Box sx={{ fontSize: '14px' }}>Time remaining</Box>
						</Box>
					</Box>
				) : (
					<ModalCountDown seconds={seconds} />
				)}
				{currentExamPart === 'speaking' && <ExamSpeaking />}
				{currentExamPart === 'reading' && <ExamReading />}
				{currentExamPart === 'writing' && <ExamWriting />}
				{currentExamPart === 'result' && <ResultTest />}

				<Box className="footer-test">
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<IconBox>
							<ListIcon sx={{ fontSize: '1.75rem' }} />
						</IconBox>
						<IconBox>
							<InfoIcon sx={{ fontSize: '1.25rem' }} />
						</IconBox>
						<IconBox>
							<SettingsIcon />
						</IconBox>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<IconBox onClick={moveExamSkill}>
							<ExitToAppIcon fontSize="medium" />
						</IconBox>
						<Button
							variant="outlined"
							sx={{ color: '#45368f', padding: '0.5rem 1rem' }}
							onClick={previousQuestion}
						>
							<KeyboardBackspaceIcon sx={{ marginRight: '5px' }} />{' '}
							Previous
						</Button>
						<Button
							variant="contained"
							className="pt-3 shadow mr-1"
							sx={{
								backgroundColor: '#45368f',
								padding: '0.5rem 1rem',
							}}
							onClick={nextQuestion}
						>
							Next <TrendingFlatIcon />
						</Button>
					</Box>
				</Box>
			</Box>

			<BasicModal
				open={openModal}
				handleClose={closeModal}
				label="Move to another skill"
			>
				<Button
					variant="contained"
					className="pt-3 shadow mr-1"
					sx={{
						backgroundColor: '#45368f',
						padding: '0.5rem 1rem',
					}}
					onClick={nextPartSkill}
				>
					Next
				</Button>
			</BasicModal>
		</>
	);
};

const IconBox = ({ children, onClick }) => (
	<Box
		sx={{
			border: '1px solid #b0b0b0',
			boxSizing: 'border-box',
			width: '45px',
			height: '45px',
			textAlign: 'center',
			verticalAlign: 'baseline',
			outline: 'none',
			cursor: 'pointer',
			borderRadius: '6px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			overflow: 'hidden',
		}}
		onClick={onClick}
	>
		{children}
	</Box>
);

export default RoomExam;
