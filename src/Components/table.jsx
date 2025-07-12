// VERSION 1

import React from "react";

export default function Table({ data }) {
  // Defensive checks
  if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== "object") {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        No data available
      </p>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Predicted ML Classifications and Data Info
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Dynamically Generated ML Classifications Mapped with High Frequency and Stack Inventory
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={col} scope="col" className="px-6 py-3">
                {col.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {row[col] !== null && row[col] !== undefined ? row[col] : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}