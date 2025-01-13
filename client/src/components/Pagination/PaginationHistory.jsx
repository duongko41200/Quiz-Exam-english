import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function TablePaginationDemo() {
	const [page, setPage] = React.useState(2);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			<div className="flex flex-col items-center  border-t border-gray-200 bg-white px-4 py-3  sm:px-6 rounded-b-lg shadow-sm">

			<div className="header-body border-b-2 border-b-[#e3ebf6] flex justify-start w-full mb-2 items-center p-4 px-6 rounded-lg shadow-sm">
				
									<div className="text-[18px] font-sans text-[#12263F] font-medium uppercase">
										<h2>Lịch sử làm bài </h2>
									</div>
								</div>
				<div className=" justify-between items-center w-full">
					<div class="relative overflow-x-auto shadow-sm sm:rounded-lg">
						<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" class="px-6 py-3">
										Product name
									</th>
									<th scope="col" class="px-6 py-3">
										Color
									</th>
									<th scope="col" class="px-6 py-3">
										Category
									</th>
									<th scope="col" class="px-6 py-3">
										Price
									</th>
									<th scope="col" class="px-6 py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
									<th
										scope="row"
										class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Apple MacBook Pro 17"
									</th>
									<td class="px-6 py-4">Silver</td>
									<td class="px-6 py-4">Laptop</td>
									<td class="px-6 py-4">$2999</td>
									<td class="px-6 py-4">
										<a
											href="#"
											class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>
											Edit
										</a>
									</td>
								</tr>
								<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
									<th
										scope="row"
										class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Microsoft Surface Pro
									</th>
									<td class="px-6 py-4">White</td>
									<td class="px-6 py-4">Laptop PC</td>
									<td class="px-6 py-4">$1999</td>
									<td class="px-6 py-4">
										<a
											href="#"
											class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>
											Edit
										</a>
									</td>
								</tr>
								<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
									<th
										scope="row"
										class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Magic Mouse 2
									</th>
									<td class="px-6 py-4">Black</td>
									<td class="px-6 py-4">Accessories</td>
									<td class="px-6 py-4">$99</td>
									<td class="px-6 py-4">
										<a
											href="#"
											class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>
											Edit
										</a>
									</td>
								</tr>

								
				
							</tbody>
						</table>
					</div>
				</div>

				<TablePagination
					component="div"
					count={100}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>



			
		</>
	);
}
