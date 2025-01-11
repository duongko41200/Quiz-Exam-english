import { Box } from '@mui/material';
import React from 'react';
import './ExamListening.css';
// import ReadingPartOne from './ReadingPartOne/ReadingPartOne';
import { useDispatch, useSelector } from 'react-redux';
import ListeningPartOne from './ListeningPartOne/ListeningPartOne';
import ListeningPartTwo from './ListeningPartTwo/ListeningPartTwo';
import ListeningPartThree from './ListeningPartThree/ListeningPartThree';
import ListeningPartFour from './ListeningPartFour/ListeningPartFour';
// import ReadingPartTwo from './ReadingPartTwo/ReadingPartTwo';
// import ReadingPartThree from './ReadingPartThree/ReadingPartThree';
// import ReadingPartFour from './ReadingPartFour/ReadingPartFour';
// import ReadingPartFive from './ReadingPartFive/ReadingPartFive';

const ExamListening = () => {
	const numberQuestion = useSelector(
		(state) => state.listeningStore.numberQuestion
	);
	const numberQuestionEachPart = useSelector(
		(state) => state.listeningStore.numberQuestionEachPart
	);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					// padding: "1rem",
					marginBottom: '4rem',
				}}
				className="fluid"
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '3.25rem',
						padding: '1rem',
						width: '100%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							marginTop: '1rem',
							padding: '1rem',
							width: '65%',
						}}
					>
						<Box
							sx={{
								fontWeight: '600',
								fontSize: '1.275rem',
							}}
						>
							Listening
						</Box>
						<Box>
							<Box className="row">
								<Box
									style={{
										marginBottom: '1.5em',
										marginTop: 0,
										fontWeight: '600',
										fontSize: '1.275rem',
									}}
								>
									Question {numberQuestionEachPart} of 17
								</Box>
							</Box>
						</Box>
						{numberQuestion && numberQuestion === 1 && (
							<ListeningPartOne />
						)}
						{numberQuestion && numberQuestion === 2 && (
							<ListeningPartTwo />
						)}
						{numberQuestion && numberQuestion === 3 && (
							<ListeningPartThree />
						)}
						{numberQuestion && numberQuestion === 4 && (
							<ListeningPartFour />
						)}
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ExamListening;
