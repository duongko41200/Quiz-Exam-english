import { Box } from '@mui/material';
import React from 'react';
import './ExamWriting.css';
import { useDispatch, useSelector } from 'react-redux';
import WritingPartOne from './WritingPartOne/WritingPartOne';
import WritingPartTwo from './WritingPartTwo/WritingPartTwo';
import WritingPartThree from './WritingPartThree/WritingPartThree';
import WritingPartFour from './WritingPartFour/WritingPartFour';

const ExamReading = () => {
	const numberQuestion = useSelector(
		(state) => state.writingStore.numberQuestion
	);

	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
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
						flexDirection: 'column',
						justifyContent: 'start',
						width: 'fit-content',
						marginTop: '3.25rem',
						padding: '1rem',
						width: 'calc(100% - 500px)',
					}}
				>
					<Box
						sx={{
							fontWeight: '600',
							fontSize: '1.275rem',
						}}
					>
						Writing
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
								Question {numberQuestion} of 4
							</Box>
						</Box>
					</Box>
					{numberQuestion && numberQuestion === 1 && <WritingPartOne />}
					{numberQuestion && numberQuestion === 2 && <WritingPartTwo />}

					{numberQuestion && numberQuestion === 3 && (
						<WritingPartThree />
					)}
					{numberQuestion && numberQuestion === 4 && (
						<WritingPartFour />
					)}
				</Box>
			</Box>
		</>
	);
};

export default ExamReading;
