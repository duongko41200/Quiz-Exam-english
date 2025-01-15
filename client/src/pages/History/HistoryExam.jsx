import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RESET_WORD, SET_TYPE_TEXT } from '../../store/feature/word';
import { toast, Toaster } from 'react-hot-toast';
import PaginationHistory from '../../components/Pagination/PaginationHistory';
import useIndexedDB from '../../hook/useIndexedDB';

function HistoryExam() {
	const navigate = useNavigate();
	// const typeText = useSelector((state) => state.wordStore.typeText);

	const dispatch = useDispatch();

	const chooseWord = (typeText) => {
		dispatch(SET_TYPE_TEXT(typeText));
		navigate('/formWord/step1');
	};

	useEffect(() => {
		dispatch(RESET_WORD());
	}, []);

	return (
		<>
			<div className="overflow-auto">
				<div className="header pt-[2rem] px-16 h-fit ">
					<div className="">
						<div className="target-score w-full mb-[16px]">
							<div className="flex gap-[16px] w-full h-full">
								<div className="box-shadow-table w-[50%] md:mb-0 bg-white rounded-[12px]">
									<div className="cursor-pointer flex items-center gap-[6px] border-neutral-06 border-b-[1px] px-[16px] py-[8px]">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
										>
											<path
												d="M11.3346 8C11.3346 9.84095 9.84225 11.3333 8.0013 11.3333C6.16035 11.3333 4.66797 9.84095 4.66797 8C4.66797 6.15906 6.16035 4.66667 8.0013 4.66667"
												stroke="black"
												stroke-linecap="round"
											></path>
											<path
												d="M9.33398 1.46669C8.90317 1.37924 8.45727 1.33334 8.00065 1.33334C4.31875 1.33334 1.33398 4.3181 1.33398 8C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8C14.6673 7.54338 14.6214 7.09748 14.534 6.66667"
												stroke="black"
												stroke-linecap="round"
											></path>
											<path
												d="M11.0688 4.93125L8 8M11.0688 4.93125L10.8521 4.10086C10.688 3.47181 10.9126 2.7461 11.4324 2.2263L12.1987 1.46004C12.4027 1.25601 12.7186 1.30646 12.783 1.55338L13.1273 2.87275L14.4466 3.21699C14.6935 3.28141 14.744 3.59728 14.54 3.80131L13.7737 4.56757C13.2539 5.08737 12.5282 5.31204 11.8991 5.14791L11.0688 4.93125Z"
												stroke="black"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
										</svg>
										<div className="md:h8 h9">Mục tiêu của bạn</div>
									</div>
									<div className="md:flex gap-[10px] justify-between md:p-[8px] lg:p-[10px] p-[10px]">
										<div className="mb-[10px] md:mb-0 cursor-pointer flex flex-col justify-between w-full md:w-[25%] rounded-[10px] px-[10px] pt-[10px] pb-[2px] bg-primary2 text-primary1">
											<div className="md:caption-3 lg:body03 xl:caption-3 body-3 mb-[2px]">
												Overall score
											</div>
											<div className="flex items-end gap-[5px] justify-between">
												<div className="overflow-hidden">
													<div className="relative opacity-100 transform-none">
														<p className="h4 lg:h3">_</p>
													</div>
												</div>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="#ff6d3a"
													className="mb-[10px] w-[23px]"
												>
													<path
														d="M3.26538 21.9613L3.28499 21.2115H3.28498L3.26538 21.9613ZM2.03608 20.5662L2.78381 20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358L4.78943 13.9445ZM2.06308 20.2197L1.31534 20.1614H1.31534L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183H3.52576L3.54536 21.9686ZM21.6159 5.38093L22.2781 5.02866L21.6159 5.38093ZM20.1543 10.097L19.634 9.55682L20.1543 10.097ZM21.5703 8.5507L20.9187 8.17934L21.5703 8.5507ZM18.6904 2.39232L18.3263 3.04804L18.6904 2.39232ZM14.0737 3.88545L14.6248 4.39413L14.0737 3.88545ZM15.5874 2.43893L15.204 1.79431V1.79431L15.5874 2.43893ZM14.0337 3.97305C13.7408 3.68015 13.2659 3.68015 12.973 3.97305C12.6802 4.26594 12.6802 4.74081 12.973 5.03371L14.0337 3.97305ZM19.0854 11.1461C19.3783 11.439 19.8532 11.439 20.1461 11.1461C20.439 10.8532 20.439 10.3783 20.1461 10.0854L19.0854 11.1461ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM22 22.75C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25V22.75ZM19.634 9.55682L10.2303 18.6141L11.2709 19.6945L20.6746 10.6372L19.634 9.55682ZM5.34056 14.4532L14.6248 4.39413L13.5226 3.37677L4.2383 13.4358L5.34056 14.4532ZM3.56497 21.2188L3.28499 21.2115L3.24577 22.711L3.52576 22.7183L3.56497 21.2188ZM2.78381 20.6244L2.81081 20.2779L1.31534 20.1614L1.28835 20.5079L2.78381 20.6244ZM3.28498 21.2115C3.12547 21.2073 2.99912 21.204 2.89063 21.1983C2.78169 21.1926 2.7103 21.1854 2.66125 21.1772C2.56902 21.1618 2.63793 21.1566 2.7063 21.2342L1.58088 22.2259C1.83132 22.5101 2.14789 22.6123 2.41442 22.6568C2.65767 22.6974 2.95477 22.7034 3.24577 22.711L3.28498 21.2115ZM1.28835 20.5079C1.26514 20.8057 1.24028 21.1043 1.25407 21.3517C1.26897 21.6191 1.33267 21.9442 1.58088 22.2259L2.7063 21.2342C2.77242 21.3092 2.7575 21.3715 2.75175 21.2682C2.74487 21.1448 2.7573 20.9648 2.78381 20.6244L1.28835 20.5079ZM4.2383 13.4358C3.06241 14.7098 2.3488 15.4688 1.93583 16.4194L3.31159 17.0171C3.60008 16.3531 4.09646 15.8011 5.34056 14.4532L4.2383 13.4358ZM2.81081 20.2779C2.95467 18.4314 3.02254 17.6824 3.31159 17.0171L1.93583 16.4194C1.52341 17.3686 1.45135 18.4157 1.31534 20.1614L2.81081 20.2779ZM10.2303 18.6141C8.6878 20.0998 8.05899 20.6868 7.2952 20.9851L7.84093 22.3823C8.94901 21.9495 9.81795 21.0939 11.2709 19.6945L10.2303 18.6141ZM3.52576 22.7183C5.52172 22.7705 6.73118 22.8158 7.84093 22.3823L7.2952 20.9851C6.53307 21.2828 5.68469 21.2743 3.56497 21.2188L3.52576 22.7183ZM19.7091 4.31741C20.5143 5.13994 20.7985 5.4413 20.9538 5.73319L22.2781 5.02866C21.9958 4.49815 21.512 4.01486 20.781 3.26811L19.7091 4.31741ZM20.6746 10.6372C21.4267 9.91278 21.9244 9.44408 22.2219 8.92206L20.9187 8.17934C20.7552 8.46624 20.4626 8.75877 19.634 9.55682L20.6746 10.6372ZM20.9538 5.73319C21.361 6.49847 21.3475 7.42702 20.9187 8.17934L22.2219 8.92206C22.9056 7.72256 22.9267 6.24777 22.2781 5.02866L20.9538 5.73319ZM20.781 3.26811C20.051 2.52241 19.5767 2.02656 19.0544 1.7366L18.3263 3.04804C18.6091 3.20504 18.9029 3.49383 19.7091 4.31741L20.781 3.26811ZM14.6248 4.39413C15.4069 3.54677 15.6924 3.24909 15.9708 3.08354L15.204 1.79431C14.6905 2.09971 14.2308 2.6094 13.5226 3.37677L14.6248 4.39413ZM19.0544 1.7366C17.8496 1.06772 16.3886 1.0898 15.204 1.79431L15.9708 3.08354C16.6969 2.65172 17.5886 2.63846 18.3263 3.04804L19.0544 1.7366ZM12.973 5.03371L19.0854 11.1461L20.1461 10.0854L14.0337 3.97305L12.973 5.03371ZM14 22.75H22V21.25H14V22.75Z"
														fill="#ff6d3a"
														fill-opacity="1"
													></path>
												</svg>
											</div>
										</div>
										<div className="grid md:grid-cols-4 grid-cols-2 gap-[10px] w-full md:w-[75%]">
											<div className="rounded-[10px] border-neutral-04 border-[0.6px] md:p-[8px] flex flex-col justify-between lg:p-[10px] p-[10px] w-full false">
												<p className=" md:caption-3 lg:body03 xl:caption-3 body-3 mb-[2px]">
													Reading
												</p>
												<div className="overflow-hidden">
													<div className="relative opacity-100 transform-none">
														<p className="md:h6 h9">_</p>
													</div>
												</div>
											</div>
											<div className="rounded-[10px] border-neutral-04 border-[0.6px] md:p-[8px] flex flex-col justify-between lg:p-[10px] p-[10px] w-full false">
												<p className=" md:caption-3 lg:body03 xl:caption-3 body-3 mb-[2px]">
													Listening
												</p>
												<div className="overflow-hidden">
													<div className="relative opacity-100 transform-none">
														<p className="md:h6 h9">_</p>
													</div>
												</div>
											</div>
											<div className="rounded-[10px] border-neutral-04 border-[0.6px] md:p-[8px] flex flex-col justify-between lg:p-[10px] p-[10px] w-full false">
												<p className="text-sm xl:caption-3 body-3 mb-[2px]">
													Writing
												</p>
												<div className="overflow-hidden">
													<div className="relative opacity-100 transform-none">
														<p className="md:h6 h9">_</p>
													</div>
												</div>
											</div>
											<div className="rounded-[10px] border-neutral-04 border-[0.6px] md:p-[8px] flex flex-col justify-between lg:p-[10px] p-[10px] w-full false">
												<p className=" md:caption-3 lg:body03 xl:caption-3 body-3 mb-[2px]">
													Speaking
												</p>
												<div className="overflow-hidden">
													<div className="relative opacity-100 transform-none">
														<p className="md:h6 h9">_</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="box-shadow-table w-[50%] flex flex-col gap-0 bg-white rounded-[12px]">
									<div className="cursor-pointer flex items-center gap-[6px] border-neutral-06 border-b-[1px] px-[16px] py-[8px]">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="16"
											viewBox="0 0 14 16"
											fill="none"
										>
											<path
												d="M6.33203 8.66667H9.66536M4.33203 8.66667H4.33802M7.66536 11.3333H4.33203M9.66536 11.3333H9.65938"
												stroke="black"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M11 1.33334V2.66667M3 1.33334V2.66667"
												stroke="black"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M0.666016 8.16216C0.666016 5.25729 0.666016 3.80486 1.50076 2.90243C2.33551 2 3.67901 2 6.36602 2H7.63268C10.3197 2 11.6632 2 12.4979 2.90243C13.3327 3.80486 13.3327 5.25729 13.3327 8.16216V8.5045C13.3327 11.4094 13.3327 12.8618 12.4979 13.7642C11.6632 14.6667 10.3197 14.6667 7.63268 14.6667H6.36602C3.67901 14.6667 2.33551 14.6667 1.50076 13.7642C0.666016 12.8618 0.666016 11.4094 0.666016 8.5045V8.16216Z"
												stroke="black"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M1 5.33334H13"
												stroke="black"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
										</svg>
										<div className="md:h8 h9">Lịch thi</div>
									</div>
									<div className="p-[10px] grid md:grid-cols-2 grid-cols-1 gap-[10px] h-full">
										<div className="cursor-pointer gap-[10px] rounded-[10px] border-neutral-04 border-[0.6px] p-[10px] w-full">
											<div className="h-full">
												<p className="caption-2 mb-[2px]">
													Ngày dự thi
												</p>
												<div className="overflow-hidden flex items-center justify-between h-[80%]">
													<div className="relative opacity-100 transform-none">
														<p className="md:h8 h9">03/02/2025</p>
													</div>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														className="w-[20px] h-[20px]"
													>
														<path
															d="M3.26538 21.9613L3.28499 21.2115H3.28498L3.26538 21.9613ZM2.03608 20.5662L2.78381 20.6244L2.03608 20.5662ZM4.78943 13.9445L4.2383 13.4358L4.78943 13.9445ZM2.06308 20.2197L1.31534 20.1614H1.31534L2.06308 20.2197ZM10.7506 19.1543L10.2303 18.6141L10.7506 19.1543ZM3.54536 21.9686L3.52576 22.7183H3.52576L3.54536 21.9686ZM21.6159 5.38093L22.2781 5.02866L21.6159 5.38093ZM20.1543 10.097L19.634 9.55682L20.1543 10.097ZM21.5703 8.5507L20.9187 8.17934L21.5703 8.5507ZM18.6904 2.39232L18.3263 3.04804L18.6904 2.39232ZM14.0737 3.88545L14.6248 4.39413L14.0737 3.88545ZM15.5874 2.43893L15.204 1.79431V1.79431L15.5874 2.43893ZM14.0337 3.97305C13.7408 3.68015 13.2659 3.68015 12.973 3.97305C12.6802 4.26594 12.6802 4.74081 12.973 5.03371L14.0337 3.97305ZM19.0854 11.1461C19.3783 11.439 19.8532 11.439 20.1461 11.1461C20.439 10.8532 20.439 10.3783 20.1461 10.0854L19.0854 11.1461ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM22 22.75C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25V22.75ZM19.634 9.55682L10.2303 18.6141L11.2709 19.6945L20.6746 10.6372L19.634 9.55682ZM5.34056 14.4532L14.6248 4.39413L13.5226 3.37677L4.2383 13.4358L5.34056 14.4532ZM3.56497 21.2188L3.28499 21.2115L3.24577 22.711L3.52576 22.7183L3.56497 21.2188ZM2.78381 20.6244L2.81081 20.2779L1.31534 20.1614L1.28835 20.5079L2.78381 20.6244ZM3.28498 21.2115C3.12547 21.2073 2.99912 21.204 2.89063 21.1983C2.78169 21.1926 2.7103 21.1854 2.66125 21.1772C2.56902 21.1618 2.63793 21.1566 2.7063 21.2342L1.58088 22.2259C1.83132 22.5101 2.14789 22.6123 2.41442 22.6568C2.65767 22.6974 2.95477 22.7034 3.24577 22.711L3.28498 21.2115ZM1.28835 20.5079C1.26514 20.8057 1.24028 21.1043 1.25407 21.3517C1.26897 21.6191 1.33267 21.9442 1.58088 22.2259L2.7063 21.2342C2.77242 21.3092 2.7575 21.3715 2.75175 21.2682C2.74487 21.1448 2.7573 20.9648 2.78381 20.6244L1.28835 20.5079ZM4.2383 13.4358C3.06241 14.7098 2.3488 15.4688 1.93583 16.4194L3.31159 17.0171C3.60008 16.3531 4.09646 15.8011 5.34056 14.4532L4.2383 13.4358ZM2.81081 20.2779C2.95467 18.4314 3.02254 17.6824 3.31159 17.0171L1.93583 16.4194C1.52341 17.3686 1.45135 18.4157 1.31534 20.1614L2.81081 20.2779ZM10.2303 18.6141C8.6878 20.0998 8.05899 20.6868 7.2952 20.9851L7.84093 22.3823C8.94901 21.9495 9.81795 21.0939 11.2709 19.6945L10.2303 18.6141ZM3.52576 22.7183C5.52172 22.7705 6.73118 22.8158 7.84093 22.3823L7.2952 20.9851C6.53307 21.2828 5.68469 21.2743 3.56497 21.2188L3.52576 22.7183ZM19.7091 4.31741C20.5143 5.13994 20.7985 5.4413 20.9538 5.73319L22.2781 5.02866C21.9958 4.49815 21.512 4.01486 20.781 3.26811L19.7091 4.31741ZM20.6746 10.6372C21.4267 9.91278 21.9244 9.44408 22.2219 8.92206L20.9187 8.17934C20.7552 8.46624 20.4626 8.75877 19.634 9.55682L20.6746 10.6372ZM20.9538 5.73319C21.361 6.49847 21.3475 7.42702 20.9187 8.17934L22.2219 8.92206C22.9056 7.72256 22.9267 6.24777 22.2781 5.02866L20.9538 5.73319ZM20.781 3.26811C20.051 2.52241 19.5767 2.02656 19.0544 1.7366L18.3263 3.04804C18.6091 3.20504 18.9029 3.49383 19.7091 4.31741L20.781 3.26811ZM14.6248 4.39413C15.4069 3.54677 15.6924 3.24909 15.9708 3.08354L15.204 1.79431C14.6905 2.09971 14.2308 2.6094 13.5226 3.37677L14.6248 4.39413ZM19.0544 1.7366C17.8496 1.06772 16.3886 1.0898 15.204 1.79431L15.9708 3.08354C16.6969 2.65172 17.5886 2.63846 18.3263 3.04804L19.0544 1.7366ZM12.973 5.03371L19.0854 11.1461L20.1461 10.0854L14.0337 3.97305L12.973 5.03371ZM14 22.75H22V21.25H14V22.75Z"
															fill="#3C3C43"
															fill-opacity="1"
														></path>
													</svg>
												</div>
											</div>
										</div>
										<div className="rounded-[10px] border-neutral-04 border-[0.6px] p-[10px] w-full">
											<div className="h-full">
												<p className="caption-2 mb-[2px]">
													Số ngày còn lại
												</p>
												<div className="overflow-hidden flex items-center justify-between h-[80%]">
													<div className="relative opacity-100 transform-none">
														<p className="text-xl font-bold h-full flex justify-center items-center">
															21 ngày
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="px-16 pb-[2rem] ">
					<PaginationHistory />
				</div>
			</div>
		</>
	);
}

export default HistoryExam;
