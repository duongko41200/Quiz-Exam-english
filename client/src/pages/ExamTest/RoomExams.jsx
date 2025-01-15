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
import useAudioRecorder from '../../hook/useAudioRecorder.js';
import FooterTest from '../../components/FooterTest/FooterTest.jsx';
import ModalList from '../../components/Modal/ModalList.jsx';
import {
	SET_DATA_OF_MODAL_LIST,
	SET_UPDATE_MODAL_LIST,
} from '../../store/feature/testBank.js';
import ExamListening from './Listening/ExamListening.jsx';
import {
	SET_DECREMENT_LISTENING,
	SET_DECREMENT_LISTENING_EACH_PART,
	SET_INCREMENT_LISTENING,
	SET_INCREMENT_LISTENING_EACH_PART,
} from '../../store/feature/listening.js';
import {
	NUMBER_PART_FOUR,
	NUMBER_PART_ONE,
	NUMBER_PART_THREE,
	NUMBER_PART_TWO,
} from '../../Constant/global.js';

const RoomExam = () => {
	const testBankData = useSelector((state) => state.testBankStore.testBankData);
	const currentExamPart = useSelector((state) => state.generalStore.currentExamPart);
	const numberQuestion = useSelector((state) => state.readingStore.numberQuestion);
	const numberQuestionWriting = useSelector((state) => state.writingStore.numberQuestion);
	const numberQuestionSpeaking = useSelector((state) => state.speakingStore.numberQuestion);
	const numberQuestionEachPart = useSelector((state) => state.speakingStore.numberQuestionEachPart);
	const numberQuestionEachPartListening = useSelector((state) => state.listeningStore.numberQuestionEachPart);
	const numberQuestionListening = useSelector((state) => state.listeningStore.numberQuestion);
	const { isModalList } = useSelector((state) => state.generalStore);
  
	const dispatch = useDispatch();
  
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [timeLeft, setTimeLeft] = useState(null);
	const [intervalId, setIntervalId] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const audioRef = useRef(null);
  
	const { isRecording, audioURL, errorMessage, startRecording, stopRecording } = useAudioRecorder();
  
	// Handle time setup for different exam parts
	useEffect(() => {

		if (intervalId) {
			clearInterval(intervalId); 
		  }
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
	  } else if (currentExamPart === 'listening') {
		dispatch(
		  SET_DATA_OF_MODAL_LIST({
			testBankData: testBankData,
			currentExamPart: currentExamPart,
			currentQuestion: numberQuestion,
		  })
		);
		setMinutes(30);
		setTimeLeft(30 * 60);
	  }
	}, [currentExamPart]);
  
	// Handle speaking section audio and time
	useEffect(() => {
	  if (currentExamPart === 'speaking') {
		const audioSrc =
		  currentExamPart === 'speaking'
			? testBankData[currentExamPart]?.[ `part${numberQuestionSpeaking}`]?.[0]?.['questions']?.[0]?.['subQuestion']?.[numberQuestionEachPart - 1]?.file
			: undefined;
  
		console.log({ audioSrc });
  
		if (audioSrc) {
		  if (audioRef.current) {
			audioRef.current.pause();
		  }
		  audioRef.current = new Audio(audioSrc);
		}
  
		  if (!window.speechSynthesis) {
			alert('Trình duyệt của bạn không hỗ trợ microphone');
			return;
		  }
  
		  playAudio(audioSrc);
		  
		  
		//   setMinutes(0);
		//   setTimeLeft(timecountSpeaking[numberQuestionSpeaking]);
	
	  }
	}, [numberQuestionSpeaking, numberQuestionEachPart]);
  
	// Set up the interval for counting time
	useEffect(() => {
	  if (timeLeft !== null && timeLeft > 0) {
		// Clear any existing interval before setting a new one
		if (intervalId) clearInterval(intervalId);
  
		const id = setInterval(() => {
		  setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);
		  setIntervalId(id);
		  
		  return () => clearInterval(id); 
	  } else if (timeLeft === 0) {
		// Handle actions when time runs out
		if (currentExamPart !== 'speaking') {
		  moveExamSkill();
		} else {
		  if (numberQuestionSpeaking !== 4 && numberQuestionEachPart < 4) {
			if (numberQuestionEachPart === 3) {
			  stopRecording();
			  nextQuestion();
			} else {
			  stopRecording();
			  dispatch(SET_INCREMENT_SPEAKING_EACH_PART());
			}
		  } else {
			stopRecording();
			moveExamSkill();
		  }
		}
	  }
  
	  return () => {
		if (intervalId) {
		  clearInterval(intervalId); // Cleanup interval when component unmounts
		}
	  };
	}, [timeLeft, currentExamPart, numberQuestionSpeaking, numberQuestionEachPart]);
  
	// Update hours, minutes, seconds when timeLeft changes
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

		if (
			numberQuestionListening <= 4 &&
			currentExamPart === 'listening'
		) {
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: numberQuestionEachPartListening + 1,
					currentExamPart,
				})
			);

			if (numberQuestionEachPartListening === 17) {
				moveExamSkill();
				return;
			}

			const partLimits = {
				[NUMBER_PART_ONE]: 13,
				[NUMBER_PART_TWO]: 14,
				[NUMBER_PART_THREE]: 15,
				[NUMBER_PART_FOUR]: 17,
			};

			dispatch(SET_INCREMENT_LISTENING_EACH_PART());

			if (
				numberQuestionEachPartListening ===
				partLimits[numberQuestionListening]
			) {
				dispatch(SET_INCREMENT_LISTENING());
				return;
			}

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

		if (
			numberQuestionListening >= 1 &&
			currentExamPart === 'listening'
		) {
			if (numberQuestionEachPartListening === 1) {
				return;
			}
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: numberQuestionEachPartListening - 1,
					currentExamPart,
				})
			);
			const partLimits = {
				[NUMBER_PART_ONE]: 13,
				[NUMBER_PART_TWO]: 14,
				[NUMBER_PART_THREE]: 15,
				[NUMBER_PART_FOUR]: 16,
			};

			dispatch(SET_DECREMENT_LISTENING_EACH_PART());
			console.log({ numberQuestionListening ,numberQuestionEachPartListening});
			if (
				numberQuestionEachPartListening ===
				partLimits[numberQuestionListening]
			) {
				if (numberQuestionListening > 1) {
					dispatch(SET_DECREMENT_LISTENING());
				}

				return;
			}

			return;
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
				audioRef.current.onended = async () => {
					await startRecording();

					setMinutes(0);

					/// thêm logic check thời gian 
					setTimeLeft(timecountSpeaking[numberQuestionSpeaking]);
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
	const nextPartSkill = async() => {
		await stopRecord();
		dispatch(SET_MOVE_EXAM_SKILL());
		// dispatch(SET_RESET_NUMBER_QUESTION());
		setOpenModal(false);
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
				{currentExamPart === 'listening' && <ExamListening />}
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
