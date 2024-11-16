import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
	const theme = useTheme();
	return theme.palette.mode === 'dark';
}

export default function TextareaInput({numberRow = 1,children}) {
	// Replace this with your app logic for determining dark modes
	const isDarkMode = useIsDarkMode();

	return (
		<div
			className={isDarkMode ? 'dark' : ''}
			style={{ display: 'flex' }}
		>


{children}
		</div>
	);
}
