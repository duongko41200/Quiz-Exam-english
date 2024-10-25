import { Box, Button, Typography } from '@mui/material';
import './ReadingPartFive.css';
import React, { useState } from 'react';

const ReadingPartFive = () => {
	return (
		<>
			<Box
				sx={{
					minHeight: '200px',
					marginBottom: '4rem',
					borderRadius: '5px',
				}}
			>
				<Box
					className="left bg-dark-layer-1"
					sx={{
						height: 'fit-content',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
					}}
				>
					<Box>
						<Box
							sx={{
								fontWeight: '500',
								marginBottom: '10px',
								fontSize: '15px',
							}}
						>
							Read the passage quickly. Choose a heading for each
							numbered paragraph (1–7) from the drop-down box. There is
							one more heading than you need.
						</Box>
						<Box sx={{ fontSize: '20px' }}>
							<strong>Mission to Mars</strong>
						</Box>
						<br />

						<Box>
							<Box className="answer p-1 col-4 w-[200px]">
								<span className="lrn_combobox">
									<span>
										<select>
											<option
												role="option"
												value=""
												aria-label="Please select an option - "
											></option>
											<option role="option" value="large">
												larges sadfsdfsdfsdf
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
							</Box>

							<Box>
								<p class="ql-align-justify ">
									1. On 3 June 2010, an international crew of six
									astronauts entered a spaceship and prepared themselves
									for a 520-day voyage to the planet Mars and back. The
									module that was to be their home for the next year and
									a half contained their sleeping quarters, a
									kitchen/dining room, a living room, a control room and
									a toilet. There was also space for food storage, a
									small greenhouse, a bathroom, a sauna and even a gym.
									The Mars landing was scheduled for 12 February 2011,
									following a 255-day flight, and would involve a full
									two days of exploration of the planet's surface. An
									equally long return journey would see the astronauts
									return to Earth on 4 November 2011.
								</p>
							</Box>
						</Box>

						<Box>
							<Box className="answer p-1 col-4 w-[200px]">
								<span className="lrn_combobox">
									<span>
										<select>
											<option
												role="option"
												value=""
												aria-label="Please select an option - "
											></option>
											<option role="option" value="large">
												larges sadfsdfsdfsdf
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
							</Box>

							<Box>
								<p class="ql-align-justify ">
									1. On 3 June 2010, an international crew of six
									astronauts entered a spaceship and prepared themselves
									for a 520-day voyage to the planet Mars and back. The
									module that was to be their home for the next year and
									a half contained their sleeping quarters, a
									kitchen/dining room, a living room, a control room and
									a toilet. There was also space for food storage, a
									small greenhouse, a bathroom, a sauna and even a gym.
									The Mars landing was scheduled for 12 February 2011,
									following a 255-day flight, and would involve a full
									two days of exploration of the planet's surface. An
									equally long return journey would see the astronauts
									return to Earth on 4 November 2011.
								</p>
							</Box>
						</Box>

						<Box>
							<Box className="answer p-1 col-4 w-[200px]">
								<span className="lrn_combobox">
									<span>
										<select>
											<option
												role="option"
												value=""
												aria-label="Please select an option - "
											></option>
											<option role="option" value="large">
												larges sadfsdfsdfsdf
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
							</Box>

							<Box>
								<p class="ql-align-justify ">
									1. On 3 June 2010, an international crew of six
									astronauts entered a spaceship and prepared themselves
									for a 520-day voyage to the planet Mars and back. The
									module that was to be their home for the next year and
									a half contained their sleeping quarters, a
									kitchen/dining room, a living room, a control room and
									a toilet. There was also space for food storage, a
									small greenhouse, a bathroom, a sauna and even a gym.
									The Mars landing was scheduled for 12 February 2011,
									following a 255-day flight, and would involve a full
									two days of exploration of the planet's surface. An
									equally long return journey would see the astronauts
									return to Earth on 4 November 2011.
								</p>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ReadingPartFive;
