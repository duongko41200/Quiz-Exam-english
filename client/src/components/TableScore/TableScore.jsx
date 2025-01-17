import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '5px',
	p: 4,
};

export default function TableScore({}) {
	return (
		<>
			<div
				className={`w-full flex  gap-2 font-bold items-center h-[50px] text-[18px]`}
			>
				{/* {isShowResult && (
					<div
						className="w-fit p-1 px-4 bg-blue-100 rounded-xl font-sans font-medium cursor-pointer hover:bg-blue-200"
						onClick={BackHistoryScreen}
					>
						Quay lại
					</div>
				)} */}
				{/* <div className="text-[#45368f]">
					Đáp án/transcript: Aptis Test - {partSkill} - Part{' '}
					{numberLession}
				</div> */}
				{/* {isShowResult && <div> </div>} */}
			</div>
			<Box
				sx={{
					
					display: 'flex',
					gap: 1,
					background: '#f8f9fa',
					marginBottom: `70px`,
					height: '580px',
				}}
			>
			<div className="max-w-4xl mx-auto p-4 border border-gray-300 rounded-lg">
                    <h1 className="text-xl font-bold text-purple-900 mb-2">Thông tin điểm thi lần 1</h1>
                    <hr className="border-t-2 border-purple-900 mb-4" />
                    <p className="mb-4">Ngày thi: 02/06/2024 tại 188 Cầu Giấy, Quận Cầu Giấy, Hà Nội</p>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="w-full md:w-1/2">
                            <h2 className="font-bold mb-2">Score</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>G/V:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">24</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Listening:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">24</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Reading:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">28</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Speaking:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">31</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Writing:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">36</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">119</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 mt-4 md:mt-0">
                            <h2 className="font-bold mb-2">CEFR Level</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Listening:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">B1</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Reading:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">B1</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Speaking:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">B1</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Writing:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">B1</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Overall:</span>
                                    <span className="bg-gray-200 px-4 py-1 rounded">B1</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="font-bold">Enrolment Id: </span>
                                <span className="bg-yellow-300 px-2 py-1 rounded">ESOL~0190874</span>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="h-full flex justify-center shadow-md bg-gray-100">
					<div className="p-4 pb-0 pt-3 bg-white shadow-md w-[220px] rounded-md w-full"></div>
				</div>
			</Box>
		</>
	);
}
