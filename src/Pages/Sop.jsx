import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUploadDashboard from "../Components/FileUploadDashboard";
import Table from "../Components/table";
import Graph from "../Components/graph";

// Transform function to convert {columns, data[]} to array of objects
const transformData = ({ columns, data }) => {
  if (!columns || !data) return [];
  return data.map(row =>
    Object.fromEntries(columns.map((col, i) => [col, row[i]]))
  );
};

export default function Sop({ setPopup }) {
  const [showOptimized, setShowOptimized] = useState(false);
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowOptimized(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const formattedResult =
    backendData?.result && backendData.result.columns && backendData.result.data
      ? transformData(backendData.result)
      : null;

  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-32 px-4 pb-32 space-y-10">
      <AnimatePresence mode="wait">
        {!showOptimized ? (
          <motion.h1
            key="broken"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center font-extrabold text-2xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"
          >
            who broke your &nbsp;&nbsp;&nbsp;&nbsp; belongings
          </motion.h1>
        ) : (
          <motion.h1
            key="optimized"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center font-extrabold"
          >
            <span className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Space
            </span>
            <span className="inline-block mx-2 md:mx-4"></span>
            <span className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Optimization
            </span>
            <br />
            <span className="text-xl md:text-3xl text-white dark:text-white mt-2 inline-block">
              that's, palletfriendly!!
            </span>
          </motion.h1>
        )}
      </AnimatePresence>


      {showOptimized && (
        <motion.div
          key="uploader"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full"
        >
          <FileUploadDashboard
            setPopup={setPopup}
            endpoint="https://mlapi-232i.onrender.com/api/sop/"
            sampleFilePath="./sop.csv"
            setResponse={setBackendData}
          />
        </motion.div>
      )}

      {/* Glass UI Table + Graph */}
      {formattedResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-6 mb-12 w-full max-w-7xl p-4 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 shadow-lg overflow-x-auto"
        >
          <Table data={formattedResult} />
          <Graph data={formattedResult} />
        </motion.div>
      )}

    </section>
  );
}
