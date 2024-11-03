import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import '../../Reading/ExamReading.css';
import { useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';

const ReadingPartOne = () => {
	const testBankData = useSelector(
		(state) => state.testBankStore.testBankData
	);

	const [resReadingPartOne, setResReadingPartOne] = React.useState();
	const [contentPartOne, setContentPartOne] = React.useState();

	useEffect(() => {
		console.log({ testBankData });

		const readingPartOne = testBankData.reading.part1[RES_DATA].data;
		setResReadingPartOne(readingPartOne);

		setContentPartOne(readingPartOne?.questions.subQuestion);
	}, []);
	return (
		<>
			<div>
				<div className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
					<b>Read the email from Janice to her friend.&nbsp;</b>
					<strong>
						Choose one word from the list for each gap. The first one is
						done for you.
					</strong>
					{/* {resReadingPartOne?.questions.content} */}
				</div>

				<div>
					<div class=" lrn_response_innerbody lrn-response-validate-wrapper">
						<div class=" lrn_response_input">
							<div class="">
								<p>Dear Sally,</p>

								<div className="flex justify-start flex-col gap-6">
									{contentPartOne?.map((item, index) => {
										return (
											<>
												<div className="flex justify-start gap-1 text-sm">
													{item.content
														.split(' ')
														.map((word, index) => {
															return word !== 'tentisspace' ? (
																<div>{word}</div>
															) : (
																<span data-lrn-template-response="">
																	<span className="lrn_combodiv">
																		<select
																			aria-label="Response input area"
																			className="lrn-cloze-select lrn_cloze_response "
																			data-inputid="1"
																		>
																			<option
																				role="option"
																				value=""
																				aria-label="Please select an option - "
																			></option>

																			{item.answerList.length > 0 &&
																				item.answerList.map(
																					(answer, index) => {
																						return (
																							<option
																								role="option"
																								value={answer.content}
																							>
																								{answer.content}
																							</option>
																						);
																					}
																				)}
																		</select>
																	</span>
																</span>
															);
														})}
												</div>
											</>
										);
									})}
								</div>

								<p>Love,</p>

								<p>Janice</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReadingPartOne;
