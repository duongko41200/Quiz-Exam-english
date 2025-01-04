import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MODAL_LIST } from '../../store/general';

export default function FooterTest({
	moveExamSkill,
	previousQuestion,
	nextQuestion,
}) {
	const dispatch = useDispatch();
	const { isModalList } = useSelector((state) => state.generalStore);
	const currentExamPart = useSelector(
		(state) => state.generalStore.currentExamPart
	);

	const openModalList = () => {
		dispatch(SET_MODAL_LIST(!isModalList));
	};

	return (
		<Box className="footer-test">
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				{(currentExamPart !== 'speaking' && currentExamPart !== 'result') && (
						<IconBox onClick={openModalList}>
							<ListIcon sx={{ fontSize: '1.75rem' }} />
						</IconBox>
					)}

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
					<KeyboardBackspaceIcon sx={{ marginRight: '5px' }} /> Previous
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
	);
}

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
