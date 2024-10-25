import { Box, Button, Typography } from '@mui/material';
import './ReadingPartFour.css';
import React, { useState } from 'react';
import Split from 'react-split';
import { display, fontSize } from '@mui/system';

const ReadingPartFour = () => {
	return (
		<>
			<Box
				sx={{
					// width: '1000px',
					border: '1px solid',
					minHeight: '200px',
					marginBottom: '4rem',
					borderRadius: '5px',
				}}
			>
				<Split className="split" minSize={200} sizes={[65, 35]}>
					<Box
						className="left bg-dark-layer-1"
						sx={{
							height: 'fit-content',
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'column',
							padding: '10px',
							overflowY: 'auto',
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
								Four people respond in the comments section of an online
								magazine article about education and work. Decide whose
								opinion matches the statements below. Read the texts and
								complete the questions below.
							</Box>
							<h2>
								<strong>Education and work</strong>
							</h2>
							<br />

							<Box sx={{ display: 'flex', flexDirection: 'column', gap:2,fontSize:'14px'}}>
								<Box>
									<strong>Petra</strong>
								</Box>

								<Box
									class="ql-align-justify "
									style={{ 'line-height': '0px !important' }}
								>
									As you get older, responsibilities like a job and
									family dominate your life. It can be hard to balance
									things. Studying at university is demanding. So you
									should do it at an age when you are independent and
									carefree. It is also important to learn how the world
									of business works. Spending unpaid time in a company
									is a great way to get that experience. Any course that
									can give you an opportunity to do that is worth
									considering.
								</Box>
								<Box>
									<strong>Antonio</strong>
								</Box>
								<Box class="ql-align-justify">
									Life doesn’t really get serious until you hit your
									mid-twenties. Before that, try out different things
									and get some life experience. It’s only as you
									approach your thirties that you need to get serious
									about your career. That’s the time to start thinking
									about further education. Many colleges offer
									inexpensive courses for more mature students. Going
									back to student life for a year is a great idea, and
									you can then return to the world of work at management
									level.
								</Box>
								<Box>
									<strong>Eleanor</strong>
								</Box>
								<Box class="ql-align-justify">
									Nowadays, it is popular for school leavers to take a
									break before they think about an occupation or a place
									at university. I think the most important thing is to
									start working as soon as you can. You need practical
									experience for your CV, and that can be more valuable
									than a diploma. Nevertheless, your studies do not have
									to stop just because you are working. Colleges and
									universities offer options for people who want to do
									both.
								</Box>
								<Box>
									<strong>Jermaine</strong>
								</Box>
								<Box class="ql-align-justify">
									I think we should all keep learning, but you don’t
									need a piece of paper from an institution to prove it.
									There are many free courses available online. Of
									course, not all are good, but a little research will
									help you identify which one is best for you. A lot of
									young people get into debt because they have to pay
									for their studies. With the resources available online
									these days, you can take control. You won’t regret it.
								</Box>
							</Box>
						</Box>
					</Box>

					<Box
						className="right "
						sx={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
						}}
					>
						<Box sx={{ display: 'flex', padding: '10px' }}>
							<Box className="question-right p-1  col-8">
								<Box sx={{ fontSize: '14px' }}>
									Who thinks you should study when you are older?
								</Box>
							</Box>

							<Box className="answer p-1 col-4">
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
							</Box>
						</Box>
					</Box>
				</Split>
			</Box>
		</>
	);
};

export default ReadingPartFour;
