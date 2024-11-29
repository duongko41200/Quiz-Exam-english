import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RES_DATA } from '../../../../Constant/global';
import BasicTable from '../../../../components/Table/BasicTable/BasicTable';

const PART_ONE = 1;

const ResultTestWriting = ({ resultWriting }) => {
	// console.log('resultWriting', resultWriting);

	return (
		<div className="p-10">
			<h1>Wrtirng</h1>

			<div className="flex flex-col gap-10">
				<div>
					<h2>PART1:</h2>
					<div>
						{resultWriting &&
							resultWriting?.[0]?.part1?.map((item, index) => {
								return (
									<div key={index} className="flex flex-col gap-6">
										<div>{item.content}</div>
										<div>
											{item.responseUser
												? item.responseUser
												: 'khong co gia tri'}
										</div>
									</div>
								);
							})}
					</div>
				</div>
				<div>
					<h2>PART1:</h2>
					<div>
						{resultWriting &&
							resultWriting?.[1]?.part2?.map((item, index) => {
								return (
									<div key={index} className="flex flex-col gap-6">
										<div>{item.content}</div>
										<div>
											{item.responseUser
												? item.responseUser
												: 'khong co gia tri'}
										</div>
									</div>
								);
							})}
					</div>
				</div>
				<div>
					<h2>PART3:</h2>
					<div>
						{resultWriting &&
							resultWriting?.[2]?.part3?.map((item, index) => {
								return (
									<div key={index} className="flex flex-col gap-6">
										<div>{item.content}</div>
										<div>
											{item.responseUser
												? item.responseUser
												: 'khong co gia tri'}
										</div>
									</div>
								);
							})}
					</div>
				</div>

				<div>
					<h2>PART4:</h2>
					<div>
						{resultWriting &&
							resultWriting?.[3]?.part4?.map((item, index) => {
								return (
									<div key={index} className="flex flex-col gap-6">
										<div>{item.content}</div>
										<div>
											{item.responseUser
												? item.responseUser
												: 'khong co gia tri'}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultTestWriting;
