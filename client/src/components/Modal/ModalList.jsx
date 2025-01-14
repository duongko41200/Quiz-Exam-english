import * as React from 'react';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import { SET_MODAL_LIST } from '../../store/general';
import { SET_NUMBER_QUESTION_READING } from '../../store/feature/reading';
import { SET_UPDATE_MODAL_LIST } from '../../store/feature/testBank';
import { SET_NUMBER_QUESTION_WRITING } from '../../store/feature/writing';
import { SET_NUMBER_QUESTION_LISTENING } from '../../store/feature/listening';

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
	// console.log('dataOfModalList', dataOfModalList);

	const moveToQuestion = (item) => {
		console.log('item', item);
		if (item.currentExamPart === 'reading') {
			dispatch(SET_NUMBER_QUESTION_READING(item.questionPart.question));
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: item.questionPart.question,
					currentExamPart: item.currentExamPart,
				})
			);
		}
		if (item.currentExamPart === 'writing') {
			dispatch(SET_NUMBER_QUESTION_WRITING(item.question));
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: item.question,
					currentExamPart: item.currentExamPart,
				})
			);
		}

		if (item.numberQuestion.currentExamPart === 'listening') {

			console.log("item.question", item)
			let numberQuestionPart = item.numberQuestionPart;

			const numberQuestion = item.numberQuestion.question;
			
			if (numberQuestion === 2) {
				numberQuestionPart = 13;
			}
			if (numberQuestion === 3) {
				numberQuestionPart = 14;
			}
			if (numberQuestion === 4) {
				numberQuestionPart = 15 + numberQuestionPart;
			}
			dispatch(SET_NUMBER_QUESTION_LISTENING(item));
			dispatch(
				SET_UPDATE_MODAL_LIST({
					numberQuestion: numberQuestionPart + 1,
					currentExamPart: item.numberQuestion.currentExamPart,
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
									<>
										{item && item?.currentExamPart === 'reading' && (
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
														{item.questionPart.status
															? 'Attempted'
															: 'Not Attempted'}
													</div>
												</div>
											</div>
										)}

										{item && item?.currentExamPart === 'writing' && (
											<div className="w-full flex flex-col border border-[#e5e5e5] rounded-[6px]">
												<div className="w-full flex flex-col gap-1 rounded-[6px]">
													<div
														className={`w-full flex justify-between items-center  p-2 rounded-[6px] ${
															item.activeQuestion
																? 'bg-[#c3c1ddc4]'
																: 'hover:bg-[#e7e6f1] cursor-pointer'
														}  `}
														key={index}
														onClick={() => moveToQuestion(item)}
													>
														<div>
															<div className="text-md font-bold">
																0{item.question}
															</div>
															<div className="w-full flex justify-between items-center text-sm">
																<div>{item?.numberPart} Parts</div>
															</div>
														</div>
														<div className="p-2 w-[24px] h-[24px] border border-[#0000001f] flex justify-center items-center rounded-[4px] cursor-pointer hover:bg-[#f4f4f5] hover:bg-[#e7e6f1] bg-[#c3c1dd] shadow-[inset 0 0 10px rgba(0, 8, 206, 0.25)]">
															<div>-</div>
														</div>
													</div>
													<div className="w-full flex flex-col gap-2 p-2 ">
														{item.questionPart.map((data, idx) => {
															return (
																<div
																	className={`w-full flex flex-col   border border-[#e5e5e5] p-2 rounded-[6px] p-2 hover:bg-[#e7e6f1] cursor-pointer   `}
																	key={idx}
																	onClick={() => moveToQuestion(item)}
																>
																	<div className="text-md font-bold">
																		Part {data.question}
																	</div>
																	<div className="w-full flex justify-between items-center text-sm">
																		<div>
																			{data.isWatching
																				? 'Seen'
																				: 'Unseen'}
																		</div>
																		<div>
																			{data.status
																				? 'Attempted'
																				: 'Not Attempted'}
																		</div>
																	</div>
																</div>
															);
														})}
													</div>
												</div>
											</div>
										)}

										{item && item?.currentExamPart === 'listening' && (
											<div className="w-full flex flex-col border border-[#e5e5e5] rounded-[6px]">
												<div className="w-full flex flex-col gap-1 rounded-[6px]">
													<div
														className={`w-full flex justify-between items-center  p-2 rounded-[6px] ${
															item.activeQuestion
																? 'bg-[#c3c1ddc4]'
																: 'hover:bg-[#e7e6f1] cursor-pointer'
														}  `}
														key={index}
														// onClick={() => moveToQuestion(item)}
													>
														<div>
															<div className="text-md font-bold">
																0{item.question}
															</div>
															<div className="w-full flex justify-between items-center text-sm">
																<div>{item?.numberPart} Parts</div>
															</div>
														</div>
														<div className="p-2 w-[24px] h-[24px] border border-[#0000001f] flex justify-center items-center rounded-[4px] cursor-pointer hover:bg-[#f4f4f5] hover:bg-[#e7e6f1] bg-[#c3c1dd] shadow-[inset 0 0 10px rgba(0, 8, 206, 0.25)]">
															<div>-</div>
														</div>
													</div>
													<div className="w-full flex flex-col gap-2 p-2 ">
														{item?.questionPart?.map((data, idx) => {
															return (
																<div
																	className={`w-full flex flex-col   border border-[#e5e5e5] p-2 rounded-[6px] p-2 hover:bg-[#e7e6f1] cursor-pointer  ${
																		data.activeQuestion
																			? 'bg-[#c3c1ddc4]'
																			: 'hover:bg-[#e7e6f1] cursor-pointer'
																	}   `}
																	key={idx}
																	onClick={() => moveToQuestion({ numberQuestion:item, numberQuestionPart:idx })}
																>
																	<div className="text-md font-bold">
																		Part {data.question}
																	</div>
																	<div className="w-full flex justify-between items-center text-sm">
																		<div>
																			{data.isWatching
																				? 'Seen'
																				: 'Unseen'}
																		</div>
																		<div>
																			{data.status
																				? 'Attempted'
																				: 'Not Attempted'}
																		</div>
																	</div>
																</div>
															);
														})}
													</div>
												</div>
											</div>
										)}
									</>
								))}
							</div>
						</div>
					</Box>
				</div>
			)}
		</div>
	);
}
