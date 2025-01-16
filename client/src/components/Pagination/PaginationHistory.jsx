import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import useIndexedDB from "../../hook/useIndexedDB";
import ResultTest from "../../pages/ExamTest/ResultTest/ResultTest";
import { useDispatch, useSelector } from "react-redux";
import { SET_TESTBANK_DATA_RESULT } from "../../store/feature/testBank";
import { isFulfilled } from "@reduxjs/toolkit";
import { SET_IS_SHOW_RESULT } from "../../store/general";
import {
  INDEXED_DB_APTIS,
  INDEXED_DB_APTIS_STORE,
} from "../../Constant/global";

export default function TablePaginationDemo() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isResult, setIsResult] = React.useState(false);
  const dispatch = useDispatch();
  const isShowResult = useSelector((state) => state.generalStore.isShowResult);

  const { saveObjectToDB, getDataFromDB, isSaving, error,data } = useIndexedDB(
    INDEXED_DB_APTIS,
    INDEXED_DB_APTIS_STORE,
    "id"
  );

  React.useEffect(() => {
    getDataFromDB();
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log({ newPage });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMoveResult = (item) => {
    if (item?.data) {
      dispatch(SET_TESTBANK_DATA_RESULT(item?.data));

      dispatch(SET_IS_SHOW_RESULT(true));
      // setIsResult(true);
    }
  };

  return (
    <>
      {!isShowResult ? (
        <div className="flex flex-col items-center  border-t border-gray-200 bg-white px-4 py-3  sm:px-6 rounded-b-lg shadow-sm ">
          <div className="header-body border-b-2 border-b-[#e3ebf6] flex justify-start w-full mb-2 items-center p-4 px-6 rounded-lg shadow-sm">
            <div className="text-[18px] font-sans text-[#12263F] font-medium uppercase">
              <h2>Lịch sử làm bài </h2>
            </div>
          </div>
          <div className=" justify-between items-center w-full max-h-[300px] overflow-y-auto">
            <div class="relative overflow-x-auto shadow-sm sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      ID
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
                  {data &&
                    data.map((item, idx) => {
                      return (
                        <tr
                          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          key={idx}
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {idx + 1}
                          </th>
                          <td class="px-6 py-4">Silver</td>
                          <td class="px-6 py-4">Laptop</td>
                          <td class="px-6 py-4">$2999</td>
                          <td
                            class="px-6 py-4 text-blue-500 text-[15px] font-medium cursor-pointer uppercase"
                            onClick={() => handleMoveResult(item)}
                          >
                            xem
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <TablePagination
            component="div"
            count={data?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <div>
          <ResultTest />
        </div>
      )}
    </>
  );
}
