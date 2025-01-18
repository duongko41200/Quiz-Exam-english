import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SET_IS_SHOW_OVERALL_SCORE } from '../../store/general';
import { convertToCoreAptisListening } from '../../utils/covertToCoreAptis';

export default function TableScore({}) {
	const dispatch = useDispatch();
	const Score4Part = useSelector(
		(state) => state.generalStore.Score4Part
	);
	return (
		<>
			<div
				className={`w-full flex  gap-2 font-bold items-center h-[50px] text-[18px]`}
			>
				<div className="flex gap-2">
					<div
						className="w-fit p-1 px-4 bg-blue-100 rounded-xl  font-sans font-medium cursor-pointer hover:bg-blue-200"
						onClick={() => dispatch(SET_IS_SHOW_OVERALL_SCORE(true))}
					>
						Tổng quát
					</div>
					<div
						className="w-fit p-1 px-4 bg-blue-100 rounded-xl font-sans font-medium cursor-pointer hover:bg-blue-200"
						onClick={() => dispatch(SET_IS_SHOW_OVERALL_SCORE(false))}
					>
						Chi tiết
					</div>
				</div>
			</div>
			<div className="flex  gap-4 bg-[#f8f9fa] mb-[70px] h-[580px] w-full bg-gray-100">
				<div className="max-w-4xl mx-auto p-4 border border-gray-300 rounded-lg col-8 w-full">
					<h1 className="text-xl font-bold text-purple-900 mb-2">
						Thông tin điểm thi lần 1
					</h1>
					<hr className="border-t-2 border-purple-900 mb-4" />
					<div className="flex gap-2 mb-4">
						<div className="mb-4">
							Ngày thi: {Score4Part.startDate} tại{' '}
							<span className="font-bold text-md"> Aptis Academy</span>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-2 justify-between ">
						<div className="w-full md:w-1/2 p-2">
							<h2 className="font-bold mb-2">Score</h2>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span>Listening:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										{Score4Part && Score4Part.listening}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Reading:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										{Score4Part && Score4Part.reading}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Speaking:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										{Score4Part && Score4Part.speaking}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Writing:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										{Score4Part && Score4Part.writing}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Total:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										{Score4Part &&
											Score4Part.reading +
												Score4Part.listening +
												Score4Part.speaking +
												Score4Part.writing}
									</span>
								</div>
							</div>
						</div>
						<div className="w-full md:w-1/2 mt-4 md:mt-0 p-2">
							<h2 className="font-bold mb-2 flex">
								<div> CEFR Level: </div>
							</h2>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span>Listening:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										{Score4Part &&
											convertToCoreAptisListening(Score4Part.listening)}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Reading:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										{Score4Part &&
											convertToCoreAptisListening(Score4Part.reading)}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Speaking:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										---
									</span>
								</div>
								<div className="flex justify-between">
									<span>Writing:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										---
									</span>
								</div>
								<div className="flex justify-between">
									<span>Overall:</span>
									<span className="bg-gray-200 px-4 py-1 rounded">
										---
									</span>
								</div>
							</div>
						</div>
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
									kết quả được xác định dựa trên tổng số điểm từ 0 đến
									50 điểm. Tuy nhiên điểm số này được tạm tính cho 2 kỹ
									năng<strong> Listening và Reading </strong>
								</p>
							</div>
							<div className="border-b border-gray-200 p-4">
								<h2 className="font-bold">Kỹ năng còn lại</h2>
								<p>
									<strong>Speaking: </strong> Thí sinh sẽ được đánh giá
									bởi trưng tâm khi tham gia
								</p>
								<p>
									<strong>Writing: </strong> Thí sinh sẽ được chấm điểm
									bời AI được thiết kế theo tiêu chí chấm điểm của Aptis
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
