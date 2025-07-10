// components/CustomBarChart.jsx
import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// Custom Tooltip with glassmorphism
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="backdrop-blur-md bg-white/30 dark:bg-white/10 text-sm rounded-lg px-4 py-2 border border-white/30 shadow-md text-gray-900 dark:text-white">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CustomBarChart({ data }) {
  // ✅ Defensive fallback
  const safeData = Array.isArray(data)
    ? data
    : Array.isArray(data?.result)
      ? data.result
      : Array.isArray(data?.data)
        ? data.data
        : [];

  // ⛔ If nothing to show
  if (!safeData || safeData.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 mt-10">
        No chart data available
      </div>
    );
  }

  const allKeys = Object.keys(safeData[0]);
  const [xKey, setXKey] = useState(allKeys[0] || "");
  const [yKeys, setYKeys] = useState(allKeys.slice(1, 3));

  const toggleYKey = (key) => {
    if (yKeys.includes(key)) {
      setYKeys(yKeys.filter((k) => k !== key));
    } else {
      setYKeys([...yKeys, key]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 mt-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Result Analysis
      </h2>

      {/* Selector Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* X-Axis Selector */}
        <div className="w-full sm:w-1/3">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">X-Axis</label>
          <select
            value={xKey}
            onChange={(e) => setXKey(e.target.value)}
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
          >
            {allKeys.map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        {/* Y-Axis Checkboxes */}
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Y-Axis Bars</label>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {allKeys.filter(k => k !== xKey).map((key) => (
              <li key={key} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id={`checkbox-${key}`}
                    type="checkbox"
                    checked={yKeys.includes(key)}
                    onChange={() => toggleYKey(key)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`checkbox-${key}`}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {key}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={safeData}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {yKeys.map((key, idx) => (
            <Bar
              key={key}
              dataKey={key}
              radius={[8, 8, 0, 0]}
              fill={["#3b82f6", "#f97316", "#10b981", "#f43f5e", "#8b5cf6"][idx % 5]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
