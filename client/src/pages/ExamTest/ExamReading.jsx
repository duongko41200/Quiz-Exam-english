import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import './ExamReading.css';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ExamReading = () => {
	return (
		<>
			<Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'end',
						alignItems: 'center',
						padding: '1rem',
						height: '3.75rem',
						width: '100%',
						// position: 'absolute',
						// top: 0,
						// right: 0,
						backgroundColor: '#fff',
						position: 'fixed',
						zIndex: 1000,
					}}
				>
					<Box
						sx={{
							position: 'fixed !important',
						}}
					>
						Time remaining: 00:00:00
					</Box>
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '1rem',
					}}
					className="fluid"
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'start',
							width: '60.666667%',
							marginTop: '3.25rem',
						}}
					>
						<Box
							sx={{
								fontWeight: '600',
								fontSize: '1.275rem',
							}}
						>
							Reading
						</Box>
						<Box>
							<Box className="row">
								<Box
									style={{
										marginBottom: '1.5em',
										marginTop: 0,
										fontWeight: '600',
										fontSize: '1.275rem',
									}}
								>
									Question 1 of 5
								</Box>
							</Box>
						</Box>
						<Box>
							<Box className="lrn_stimulus_content lrn_clearfix lrn_question mb-5">
								<b>Read the email from Janice to her friend.&nbsp;</b>
								<strong>
									Choose one word from the list for each gap. The first
									one is done for you.
								</strong>
							</Box>
							<Box>
								<div class=" lrn_response_innerbody lrn-response-validate-wrapper">
									<div class=" lrn_response_input">
										<div class="">
											<p>Dear Sally,</p>

											<p>
												Tim and I are on holiday in Greece. We have a
												nice&nbsp;
												<span
													class="example-interaction"
													example-interaction="InlineChoice"
												>
													<select
														no-init-selection=""
														ui-select=""
														fdprocessedid="tzikvs"
													>
														<option
															disabled="disabled"
															selected="selected"
														>
															view
														</option>
														<option disabled="disabled"></option>
													</select>
												</span>
												&nbsp;of the sea from our hotel.
											</p>

											<p>
												The weather is{' '}
												<span data-lrn-template-response="">
													<span class=" lrn_combobox">
														<select
															aria-label="Response input area"
															class=" lrn-cloze-select lrn_cloze_response"
															data-inputid="0"
															fdprocessedid="0o584j"
														>
															<option
																role="option"
																value=""
																aria-label="Please select an option - "
															></option>
															<option role="option" value="large">
																large
															</option>
															<option role="option" value="great">
																great
															</option>
															<option role="option" value="big">
																big
															</option>
														</select>
													</span>
												</span>
												&nbsp;and it’s really hot.
											</p>

											<p>
												Yesterday we went on a{' '}
												<span data-lrn-template-response="">
													<span class=" lrn_combobox">
														<select
															aria-label="Response input area"
															class=" lrn-cloze-select lrn_cloze_response"
															data-inputid="1"
															fdprocessedid="rn7h4"
														>
															<option
																role="option"
																value=""
																aria-label="Please select an option - "
															></option>
															<option role="option" value="boat">
																boat
															</option>
															<option role="option" value="train">
																train
															</option>
															<option role="option" value="bus">
																bus
															</option>
														</select>
													</span>
												</span>
												&nbsp;on the lake and caught some fish.
											</p>

											<p>
												We had lunch and then&nbsp;we visited an
												old&nbsp;
												<span data-lrn-template-response="">
													<span class=" lrn_combobox">
														<select
															aria-label="Response input area"
															class=" lrn-cloze-select lrn_cloze_response"
															data-inputid="2"
															fdprocessedid="bheoz"
														>
															<option
																role="option"
																value=""
																aria-label="Please select an option - "
															></option>
															<option role="option" value="window.">
																window.
															</option>
															<option role="option" value="cup.">
																cup.
															</option>
															<option role="option" value="town.">
																town.
															</option>
														</select>
													</span>
												</span>
											</p>

											<p>
												Tomorrow we are going to take a car and{' '}
												<span data-lrn-template-response="">
													<span class=" lrn_combobox">
														<select
															aria-label="Response input area"
															class=" lrn-cloze-select lrn_cloze_response"
															data-inputid="3"
															fdprocessedid="sug0hs"
														>
															<option
																role="option"
																value=""
																aria-label="Please select an option - "
															></option>
															<option role="option" value="drive">
																drive
															</option>
															<option role="option" value="walk">
																walk
															</option>
															<option role="option" value="fly">
																fly
															</option>
														</select>
													</span>
												</span>
												&nbsp;around.
											</p>

											<p>
												We are going to visit some{' '}
												<span data-lrn-template-response="">
													<span class=" lrn_combobox">
														<select
															aria-label="Response input area"
															class=" lrn-cloze-select lrn_cloze_response"
															data-inputid="4"
															fdprocessedid="yxrco"
														>
															<option
																role="option"
																value=""
																aria-label="Please select an option - "
															></option>
															<option role="option" value="books">
																books
															</option>
															<option role="option" value="shops">
																shops
															</option>
															<option role="option" value="brothers">
																brothers
															</option>
														</select>
													</span>
												</span>
												&nbsp;and buy clothes.
											</p>

											<p>Love,</p>

											<p>Janice</p>
										</div>
									</div>
								</div>
							</Box>
						</Box>
					</Box>
				</Box>

				{/* Fottter */}

				<Box className=" footer-test  ">
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Box
							sx={{
								border: '1px solid var(--secondary-400, #b0b0b0)',
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
						>
							<ListIcon
								sx={{ fontSize: ' calc(1.75rem ) !important' }}
							></ListIcon>
						</Box>
						<Box
							sx={{
								border: '1px solid var(--secondary-400, #b0b0b0)',
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
						>
							<InfoIcon
								sx={{ fontSize: ' calc(1.25rem ) !important' }}
							/>
						</Box>
						<Box
							sx={{
								border: '1px solid var(--secondary-400, #b0b0b0)',
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
						>
							<SettingsIcon></SettingsIcon>
						</Box>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Box
							sx={{
								border: '1px solid var(--secondary-400, #b0b0b0)',
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
						>
							<ExitToAppIcon fontSize="medium"></ExitToAppIcon>
						</Box>


						<Button
							variant="outlined"
					
							sx={{color: '#45368f',padding: '0.5rem 1rem'}}
						>
							<KeyboardBackspaceIcon sx={{marginRight:'5px'}}/>   Previous
						</Button>

						<Button
							variant="contained"
							className="pt-3  shadow mr-1"
							sx={{backgroundColor: '#45368f',padding: '0.5rem 1rem'}}
						>
							Next <TrendingFlatIcon></TrendingFlatIcon>
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ExamReading;
