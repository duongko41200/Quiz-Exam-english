import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

export default function BasicTable({ rows }) {
	return (
		<TableContainer component={Paper} sx={{ maxWidth: 700 }}>
			<Table sx={{ minWidth: 350 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>STT</TableCell>
						<TableCell align="right">Đáp án </TableCell>
						<TableCell align="right">Câu trả lời của bạn</TableCell>
						<TableCell align="right">Kết quả</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.id}
							</TableCell>
							<TableCell align="right">{row.resultCorrect}</TableCell>
							<TableCell align="right">{row.resultOfUser}</TableCell>
							<TableCell align="right">{row.reviewAnswer}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
