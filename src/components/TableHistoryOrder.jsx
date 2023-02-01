import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import { classNames } from "./shared/admin/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./shared/admin/Icons";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { Button, PageButton } from "./shared/admin/Button";

// --------------------------------------------------
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex items-baseline gap-x-2">
      {/* <span className="text-xs text-gray-700">Search: </span>
      <input
        type="text"
        className="text-xs border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      /> */}
    </label>
  );
}
// --------------------------------------------------

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <div
      className="block w-full text-xs rounded-md shadow-lg border-gray-00 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      name={id}
      id={id}
      value={filterValue}
      onClick={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto md:mr-auto">
          <button
            value="ที่ต้องชำระ"
            className="px-3 py-1 m-1 bg-gray-100 border-0 rounded hover:text-gray-900 hover:bg-gray-200"
          >
            ที่ต้องชำระ
          </button>
          <button
            value="รอตรวจสอบการชำระ"
            className="px-3 py-1 m-1 bg-gray-100 border-0 rounded hover:text-gray-900 hover:bg-gray-200"
          >
            รอตรวจสอบการชำระเงิน
          </button>
          <button
            value="ที่ต้องจัดส่ง"
            className="px-3 py-1 m-1 bg-gray-100 border-0 rounded hover:text-gray-900 hover:bg-gray-200"
          >
            ที่ต้องจัดส่ง
          </button>
          <button
            value="กำลังจัดส่ง"
            className="px-3 py-1 m-1 bg-gray-100 border-0 rounded hover:text-gray-900 hover:bg-gray-200"
          >
            กำลังจัดส่ง
          </button>
          <button
            value="สำเร็จ"
            className="px-3 py-1 m-1 bg-gray-100 border-0 rounded hover:text-gray-900 hover:bg-gray-200"
          >
            สำเร็จ
          </button>
          <button
            value="ยกเลิกออเดอร์"
            className="px-3 py-1 m-1 bg-gray-100 border-0 rounded hover:text-gray-900 hover:bg-gray-200"
          >
            ยกเลิกออเดอร์
          </button>
        </nav>
      </div>
    </div>
  );
}
// --------------------------------------------------

export function StatusPill({ value }) {
  const orderStatus = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        orderStatus.startsWith("ที่ต้องชำระ")
          ? "bg-slate-100 text-slate-800 text-xs"
          : null,
        orderStatus.startsWith("รอตรวจสอบการชำระเงิน")
          ? "bg-slate-100 text-slate-800 text-xs"
          : null,
        orderStatus.startsWith("ที่ต้องจัดส่ง")
          ? "bg-yellow-100 text-yellow-800 text-xs"
          : null,
        orderStatus.startsWith("กำลังจัดส่ง")
          ? "bg-blue-100 text-blue-800 text-xs"
          : null,
        orderStatus.startsWith("สำเร็จ")
          ? "bg-green-100 text-green-800 text-xs"
          : null,
        orderStatus.startsWith("ยกเลิกออเดอร์")
          ? "bg-red-100 text-red-800 text-xs"
          : null
      )}
    >
      {orderStatus}
    </span>
  );
}
// --------------------------------------------------

function TableHistoryOrder({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, 
    useGlobalFilter,
    useSortBy,
    usePagination 
  );

  return (
    <>
      <div className="items-center mb-10">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div>

      <div className="w-full mb-3 overflow-hidden rounded-lg shadow-xs">
        {/* table */}
        <div className="w-full overflow-x-auto">
          {/* <div className="w-full overflow-x-auto"> */}
          <table {...getTableProps()} className="w-full whitespace-no-wrap">
            <thead className="text-xs tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 dark:text-gray-400 whitespace-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      scope="col"
                      className="px-6 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase group"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className="flex items-center justify-between">
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortDownIcon className="w-4 h-4 text-gray-400" />
                            ) : (
                              <SortUpIcon className="w-4 h-4 text-gray-400" />
                            )
                          ) : (
                            <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.map((row, i) => {
                // new
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-2 whitespace-nowrap"
                          role="cell"
                        >
                          {cell.column.Cell.name === "defaultRenderer" ? (
                            <div className="flex items-center text-xs break-all">
                              {cell.render("Cell")}
                            </div>
                          ) : (
                            cell.render("Cell")
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between py-1">
          <div className="flex justify-between flex-1 text-xs sm:hidden">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-x-2">
              <span className="text-xs text-gray-700">
                Page <span className="font-medium">{state.pageIndex + 1}</span>{" "}
                of <span className="font-medium">{pageOptions.length}</span>
              </span>
              <label>
                <span className="sr-only">Items Per Page</span>
                <select
                  className="block w-full mt-1 text-xs border-gray-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={state.pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 20].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <nav
                className="relative inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <PageButton
                  className="rounded-l-md"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">First</span>
                  <ChevronDoubleLeftIcon
                    className="w-3 h-3 text-gray-400"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon
                    className="w-3 h-3 text-gray-400"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon
                    className="w-3 h-3 text-gray-400"
                    aria-hidden="true"
                  />
                </PageButton>
                <PageButton
                  className="rounded-r-md"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Last</span>
                  <ChevronDoubleRightIcon
                    className="w-3 h-3 text-gray-400"
                    aria-hidden="true"
                  />
                </PageButton>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableHistoryOrder;
