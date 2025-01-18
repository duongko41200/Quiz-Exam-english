import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import useIndexedDB from '../../hook/useIndexedDB';
import ResultTest from '../../pages/ExamTest/ResultTest/ResultTest';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TESTBANK_DATA_RESULT } from '../../store/feature/testBank';
import { SET_IS_SHOW_RESULT } from '../../store/general';
import {
	INDEXED_DB_APTIS,
	INDEXED_DB_APTIS_STORE,
} from '../../Constant/global';
import { convertToCoreAptisListening } from '../../utils/covertToCoreAptis';

export default function TablePaginationDemo() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [isResult, setIsResult] = React.useState(false);
	const dispatch = useDispatch();
	const isShowResult = useSelector(
		(state) => state.generalStore.isShowResult
	);

	const { saveObjectToDB, getDataFromDB, isSaving, error, data } =
		useIndexedDB(INDEXED_DB_APTIS, INDEXED_DB_APTIS_STORE, 'id');

	React.useEffect(() => {
		getDataFromDB();
	}, []);

	const handleChangePage = (event, newPage) => {
		console.log({ newPage });
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleMoveResult = (item) => {
		if (item?.data) {
			dispatch(SET_TESTBANK_DATA_RESULT(item?.data));

			dispatch(SET_IS_SHOW_RESULT(true));
			// setIsResult(true);
		}
	};

	return (
		<>
			{!isShowResult ? (
				<div className="flex flex-col items-center  border-t border-gray-200 bg-white px-4 py-3  sm:px-6 rounded-b-lg shadow-sm ">
					<div className="header-body border-b-2 border-b-[#e3ebf6] flex justify-start w-full mb-2 items-center p-4 px-6 rounded-lg shadow-sm">
						<div className="text-[18px] font-sans text-[#12263F] font-medium uppercase">
							<h2>Lịch sử làm bài </h2>
						</div>
					</div>
					<div className="flex justify-between  w-full max-h-[520px] overflow-y-auto">
						<div class="relative shadow-sm sm:rounded-lg flex flex-col justify-between">
							<div className=' overflow-y-auto '>
							<table class="w-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  ">
									<tr>
										<th scope="col" class="px-6 py-3">
											ID
										</th>
										<th scope="col" class="px-6 py-3">
											Listening
										</th>
										<th scope="col" class="px-6 py-3">
											Reading
										</th>
										<th scope="col" class="px-6 py-3">
											Writing
										</th>
										<th scope="col" class="px-6 py-3">
											Speaking
										</th>

										<th scope="col" class="px-6 py-3">
											Date
										</th>
										<th scope="col" class="px-6 py-3"></th>
									</tr>
								</thead>
								<tbody>
									{data &&
										data.map((item, idx) => {
											return (
												<tr
													class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
													key={idx}
												>
													<th
														scope="row"
														class="px-6 py-4 text-[18px] font-medium text-gray-900 whitespace-nowrap dark:text-white"
													>
														{idx + 1}
													</th>
													<td class="px-6 py-4 text-[18px] font-medium">
														<div className="bg-gray-100 p-1 w-fit rounded-lg font-bold font-sans">
															{item?.coreListening &&
																item.coreListening}
															:
															{item?.coreListening &&
																convertToCoreAptisListening(
																	item.coreListening
																)}
														</div>
													</td>
													<td class="px-6 py-4 text-[18px] font-medium">
														<div className="bg-gray-100 p-1 w-fit rounded-lg font-bold font-sans">
															{item?.coreReading && item.coreReading}:
															{item?.coreReading &&
																convertToCoreAptisListening(
																	item.coreReading
																)}
														</div>
													</td>
													<td class="px-6 py-4 text-[18px] font-medium">
														---
													</td>
													<td class="px-6 py-4 text-[18px] font-medium">
														---
													</td>
													<td class="px-6 py-4 text-[16px] font-medium">
														{item?.dateTest && item.dateTest}
													</td>
													<td
														class="px-6 py-4 text-blue-500 text-[15px] font-medium cursor-pointer uppercase"
														onClick={() => handleMoveResult(item)}
													>
														xem
													</td>
												</tr>
											);
										})}
								</tbody>
								</table>
								</div>
							<div>
								<TablePagination
									component="div"
									count={data?.length}
									page={page}
									onPageChange={handleChangePage}
									rowsPerPage={rowsPerPage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									className="bg-gray-50"
									sx={{
										fontWeight: 'bold',
										margin: 0,
										'& .MuiTablePagination-actions': {
											marginBottom: '16px',
										},
										'& .MuiTablePagination-input': {
											fontSize: '16px',
											fontWeight: 'bold',
										},
										'& .MuiTablePagination-select': {
										 marginBottom: '16px',
										},
									}}
								/>
							</div>
						</div>

						<div className="h-full flex justify-center shadow-md bg-gray-100 col-4 w-1/3">
							<div className="max-w-md mx-auto h-full overflow-y-auto">
								<div className="bg-[#23075b] text-white text-center py-2 rounded-t-md h-[50px] flex justify-center items-center">
									<div className="font-bold text-xl ">CHÚ THÍCH:</div>
								</div>
								<hr className="border-t-2 border-purple-900" />
								<div className="bg-white shadow-md rounded-b-md">
									<div className="border-b border-gray-200 p-4">
										<h2 className="font-bold"> Kết quả </h2>
										<p className="line-height-1">
											kết quả được xác định dựa trên tổng số điểm từ 0
											đến 50 điểm. Tuy nhiên điểm số này được tạm tính
											cho 2 kỹ năng
											<strong> Listening và Reading </strong>
										</p>
									</div>
									<div className="border-b border-gray-200 p-4">
										<h2 className="font-bold">Kỹ năng còn lại</h2>
										<p>
											<strong>Speaking: </strong> Thí sinh sẽ được đánh
											giá bởi trưng tâm khi tham gia
										</p>
										<p>
											<strong>Writing: </strong> Thí sinh sẽ được chấm
											điểm bời AI được thiết kế theo tiêu chí chấm điểm
											của Aptis
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>
					<ResultTest />
				</div>
			)}
		</>
	);
}
