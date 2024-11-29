import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import BasicTable from '../../../../components/Table/BasicTable/BasicTable';

const PART_ONE = 1;

const ResultTestReading = ({ resultReading }) => {
	return (
		<div className="p-10">
			<h1>Reading</h1>
			<div className="flex flex-col gap-10">
				<div>
					<h2>PART 1:</h2>
					<BasicTable rows={resultReading?.[0]?.part1} />
				</div>
				<div>
					<h2>PART 2:</h2>
					<table className="border-collapse border border-gray-400">
						<thead>
							<tr>
								<th className="border border-gray-300 p-2">
									Correct Answers
								</th>
								<th className="border border-gray-300 p-2">
									User Answers
								</th>
							</tr>
						</thead>
						<tbody>
							{resultReading?.[1]?.part2?.[0]?.resultCorrect?.map(
								(item, index) => (
									<tr key={index}>
										<td className="border border-gray-300 p-2 bg-gray-50">
											<div>{item.content}</div>
										</td>
										<td className="border border-gray-300 p-2 bg-gray-50">
											<div>
												{
													resultReading?.[1]?.part2?.[0]
														?.resultOfUser?.[index]?.content
												}
											</div>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>

				<div>
					<h2>PART 3:</h2>
					<table className="border-collapse border border-gray-400">
						<thead>
							<tr>
								<th className="border border-gray-300 p-2">
									Correct Answers
								</th>
								<th className="border border-gray-300 p-2">
									User Answers
								</th>
							</tr>
						</thead>
						<tbody>
							{resultReading?.[2]?.part3?.[0]?.resultCorrect?.map(
								(item, index) => (
									<tr key={index}>
										<td className="border border-gray-300 p-2 bg-gray-50">
											<div>{item.content}</div>
										</td>
										<td className="border border-gray-300 p-2 bg-gray-50">
											<div>
												{
													resultReading?.[2]?.part3?.[0]
														?.resultOfUser?.[index]?.content
												}
											</div>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
				<div className="flex gap-10">
					<div>
						<h2>PART 4:</h2>
						<BasicTable rows={resultReading?.[3]?.part4} />
					</div>
					<div>
						<h2>PART 5:</h2>
						<BasicTable rows={resultReading?.[4]?.part5} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultTestReading;
