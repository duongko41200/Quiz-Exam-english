import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { height } from '@mui/system';
import zIndex from '@mui/material/styles/zIndex';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MODAL_LIST } from '../../store/general';
import { current } from '@reduxjs/toolkit';
import { SET_NUMBER_QUESTION_READING } from '../../store/feature/reading';
import { SET_UPDATE_MODAL_LIST } from '../../store/feature/testBank';

const style = {
	position: 'fixed',
	top: '0.675rem',
	left: '.675rem!important',
	width: '21rem!important',
	height: 'calc(100% - .675rem * 3 - 3.75rem)!important',
	bgcolor: 'background.paper',
	border: '.5px solid #f8f8f8',
	boxShadow: '0 0 20px 2px var(--primary-100, #cbcdf4)',
	borderRadius: '.375rem',
	p: 4,
	overflow: 'auto',
	overflowX: 'hidden',
	zIndex: 1000,
	padding: '.675rem!important',
};

export default function ModalList({ children, open, label }) {
	const dispatch = useDispatch();
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);


	const dataOfModalList = useSelector(
		(state) => state.testBankStore.dataOfModalList
	);

	const moveToQuestion = (item) => {

		if (item.currentExamPart === 'reading') {
			dispatch(SET_NUMBER_QUESTION_READING(item.questionPart.question));
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: item.questionPart.question,currentExamPart:item.currentExamPart
				})
			);
		}
	};

	const closeModelList = () => {
		dispatch(SET_MODAL_LIST(false));
	};
	return (
		<div>
			{open && (
				<div>
					<Box sx={style}>
						<div className="w-full mb-[2rem] h-[45px] flex justify-between items-center">
							<div className="text-lg font-medium text-[#161616]">
								Question List
							</div>
							<div
								className="w-[50px] h-[50px] border border-[#0000001f] flex justify-center items-center rounded-[6px] cursor-pointer hover:bg-[#f4f4f5]"
								onClick={closeModelList}
							>
								<div className="text-xl font-medium">X</div>
							</div>
						</div>
						<div className="w-full mb-[1rem] mi-h-[45px] flex flex-col items-center border border-[#e5e5e5] rounded-[6px] p-2 ">
							<div className="w-full flex justify-between items-center ">
								<div>
									<div className="text-md font-bold text-[#161616]">
										{dataOfModalList?.currentExamPart.toUpperCase()}
									</div>
									<div className="text-sm  text-[#161616]">
										{dataOfModalList?.totalPart} Questions
									</div>
								</div>

								<div>
									<div className="p-2 w-[24px] h-[24px] border border-[#0000001f] flex justify-center items-center rounded-[4px] cursor-pointer hover:bg-[#f4f4f5] hover:bg-[#e7e6f1] bg-[#c3c1dd] shadow-[inset 0 0 10px rgba(0, 8, 206, 0.25)]">
										<div>-</div>
									</div>
								</div>
							</div>
							<div className="mt-4 w-full flex flex-col gap-4">
								{dataOfModalList?.numberQuestion?.map((item, index) => (
									<div
										className={`w-full flex flex-col  border border-[#e5e5e5] p-2 rounded-[6px] ${
											item.questionPart.activeQuestion
												? 'bg-[#c3c1ddc4]'
												: 'hover:bg-[#e7e6f1] cursor-pointer'
										}  `}
										key={index}
										onClick={() => moveToQuestion(item)}
									>
										<div className="text-md font-bold">
											0{item.question}
										</div>
										<div className="w-full flex justify-between items-center text-sm">
											<div>
												{item.questionPart.isWatching
													? 'Seen'
													: 'Unseen'}
											</div>
											<div>
												{' '}
												{item.questionPart.status
													? 'Attempted'
													: 'Not Attempted'}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</Box>
				</div>
			)}
		</div>
	);
}
