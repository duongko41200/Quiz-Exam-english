import { Box, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
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
import useAudioRecorder from '../../hook/useAudioRecorder.js';
import FooterTest from '../../components/FooterTest/FooterTest.jsx';
import ModalList from '../../components/Modal/ModalList.jsx';
import {
	SET_DATA_OF_MODAL_LIST,
	SET_UPDATE_MODAL_LIST,
} from '../../store/feature/testBank.js';

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
	const { isModalList } = useSelector((state) => state.generalStore);

	const dispatch = useDispatch();

	/////////// ABOVE REDUX //////////

	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [timeLeft, setTimeLeft] = useState(null);
	const [intervalId, setIntervalId] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const audioRef = useRef(null);

	const {
		isRecording,
		audioURL,
		errorMessage,
		startRecording,
		stopRecording,
	} = useAudioRecorder();

	useEffect(() => {
		if (currentExamPart === 'writing') {
			setMinutes(50);
			setTimeLeft(50 * 60);
			dispatch(
				SET_DATA_OF_MODAL_LIST({
					testBankData: testBankData,
					currentExamPart: currentExamPart,
					currentQuestion: numberQuestionWriting,
				})
			);
		} else if (currentExamPart === 'reading') {
			setMinutes(30);
			setTimeLeft(30 * 60);
			dispatch(
				SET_DATA_OF_MODAL_LIST({
					testBankData: testBankData,
					currentExamPart: currentExamPart,
					currentQuestion: numberQuestion,
				})
			);
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
			const audioSrc =
				currentExamPart === 'speaking'
					? testBankData[currentExamPart]?.[
							`part${numberQuestionSpeaking}`
					  ]?.[0]?.['questions']?.[0]?.['subQuestion']?.[
							numberQuestionEachPart - 1
					  ]?.file
					: undefined;

			console.log({ audioSrc });

			if (audioSrc) {
				if (audioRef.current) {
					audioRef.current.pause();
				}

				audioRef.current = new Audio(audioSrc);
			}

			setTimeout(() => {
				if (!window.speechSynthesis) {
					alert('Trình duyệt của bạn không hỗ trợ Text-to-Speech.');
					return;
				}

				setMinutes(0);
				setTimeLeft(timecountSpeaking[numberQuestionSpeaking]);

				// console.log({ testBankData });
				playAudio(audioSrc);
				// startRecording();
			}, 2000);
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
			return;
		}
		if (timeLeft === 0 && currentExamPart === 'speaking') {
			if (numberQuestionSpeaking !== 4 && numberQuestionEachPart < 4) {
				if (numberQuestionEachPart === 3) {
					stopRecording();
					nextQuestion();
					return;
				}

				stopRecording();

				dispatch(SET_INCREMENT_SPEAKING_EACH_PART());
			} else {
				stopRecord();
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
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: numberQuestion + 1,
					currentExamPart,
				})
			);
			dispatch(SET_INCREMENT());
			return;
		}
		if (numberQuestionWriting < 4 && currentExamPart === 'writing') {
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: numberQuestionWriting + 1,
					currentExamPart,
				})
			);
			dispatch(SET_INCREMENT_WRITING());
			return;
		}
		if (numberQuestionSpeaking < 4 && currentExamPart === 'speaking') {
			dispatch(SET_RESET_NUMBER_QUESTION_SPEAKING());
			dispatch(SET_INCREMENT_SPEAKING());
			return;
		}

		moveExamSkill();
	};

	const previousQuestion = () => {
		if (numberQuestion > 1 && currentExamPart === 'reading') {
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: numberQuestion - 1,
					currentExamPart,
				})
			);
			dispatch(SET_DECREMENT());
		}
		if (numberQuestionWriting > 1 && currentExamPart === 'writing') {
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: numberQuestionWriting - 1,
					currentExamPart,
				})
			);
			dispatch(SET_DECREMENT_WRITING());
		}
	};
	const stopRecord = () => {
		stopRecording();
	};

	const moveExamSkill = () => {
		setOpenModal(true);
	};
	const closeModal = () => {
		setOpenModal(false);
	};
	const playAudio = async (audioSrc) => {
		if (audioSrc && audioRef.current) {
			try {
				await audioRef.current.play();

				// Lắng nghe sự kiện khi audio phát xong
				audioRef.current.onended = () => {
					startRecording();
				};
				return;
			} catch (error) {
				console.error('Error playing audio:', error);
			}
		}
		// startRecording();
	};

	const pauseAudio = () => {
		if (audioRef.current) {
			audioRef.current.pause();
		}
	};

	// move to next part skill
	const nextPartSkill = () => {
		dispatch(SET_MOVE_EXAM_SKILL());
		// dispatch(SET_RESET_NUMBER_QUESTION());
		setOpenModal(false);
		stopRecord();
	};

	return (
		<>
			<Box>
				{currentExamPart && currentExamPart !== 'result' && (
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
							<ModalCountDown
								seconds={seconds}
								stopRecord={stopRecord}
							/>
						)}
					</Box>
				)}

				{currentExamPart === 'speaking' && <ExamSpeaking />}
				{currentExamPart === 'reading' && <ExamReading />}
				{currentExamPart === 'writing' && <ExamWriting />}
				{currentExamPart === 'result' && <ResultTest />}

				<ModalList open={isModalList} />

				{/* ////////////////////////// FOOTER //////////////////////////
				////////////////////////// FOOTER ////////////////////////// */}

				<FooterTest
					moveExamSkill={moveExamSkill}
					previousQuestion={previousQuestion}
					nextQuestion={nextQuestion}
				/>
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

export default RoomExam;
