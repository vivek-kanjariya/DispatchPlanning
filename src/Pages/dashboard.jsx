// import React, { useState } from "react";
// import FileUploadDashboard from "../Components/FileUploadDashboard";

// export default function Dashboard({ setPopup }) {
//   const [dashboardResponse, setDashboardResponse] = useState(null); // ✅ Define it

//   return (
//     <section>
//       <div className="flex justify-center pt-20">
//         <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl text-center">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-sky-400 dark:to-emerald-400">
//             Simple Drag n Drop
//           </span>{" "}
//           Scalable AI.
//         </h1>
//       </div>

//       <FileUploadDashboard
//         setPopup={setPopup}
//         endpoint="http://127.0.0.1:8000/api/dispatch/"
//         sampleFilePath="./dispatch.csv"
//         setResponse={setDashboardResponse}
//       />
//     </section>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import FileUploadDashboard from "../Components/FileUploadDashboard";
// import Table from "../Components/table";
// import Graph from "../Components/graph";

// const transformData = ({ columns, data }) => {
//   if (!columns || !data) return [];
//   return data.map(row =>
//     Object.fromEntries(columns.map((col, i) => [col, row[i]]))
//   );
// };

// export default function Dashboard({ setPopup }) {

//   const [showOptimized, setShowOptimized] = useState(false);
//   const [backendData, setBackendData] = useState(null);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowOptimized(true), 1400);
//     return () => clearTimeout(timer);
//   }, []);

//   const formattedResult =
//     backendData?.result && backendData.result.columns && backendData.result.data
//       ? transformData(backendData.result)
//       : null;

//   return (
//     <section className="min-h-screen flex flex-col items-center justify-start pt-32 px-4 pb-32 space-y-10">
//       <AnimatePresence mode="wait">
//         {!showOptimized ? (
//           <motion.h1
//             key="broken"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.5 }}
//             className="text-center font-extrabold text-2xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"
//           >
//             who broke your &nbsp;&nbsp;&nbsp;&nbsp; belongings
//           </motion.h1>
//         ) : (
//           <motion.h1
//             key="optimized"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-center font-extrabold"
//           >
//             <span className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
//               Space
//             </span>
//             <span className="inline-block mx-2 md:mx-4"></span>
//             <span className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
//               Optimization
//             </span>
//             <br />
//             <span className="text-xl md:text-3xl text-white dark:text-white mt-2 inline-block">
//               that's, palletfriendly!!
//             </span>
//           </motion.h1>
//         )}
//       </AnimatePresence>


//       {showOptimized && (
//         <motion.div
//           key="uploader"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.5 }}
//           className="w-full"
//         >
//           <FileUploadDashboard
//             setPopup={setPopup}
//             endpoint="http://127.0.0.1:8000/api/dispatch/"
//             sampleFilePath="./dispatch.csv"
//             setResponse={setBackendData}
//           />
//         </motion.div>
//       )}

//       {/* Glass UI Table + Graph */}
//       {formattedResult && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.4 }}
//           className="mt-6 mb-12 w-full max-w-7xl p-4 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 shadow-lg overflow-x-auto"
//         >
//           <Table data={formattedResult} />
//           <Graph data={formattedResult} />
//         </motion.div>
//       )}

//     </section>
//   );
// }

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import FileUploadDashboard from "../Components/FileUploadDashboard";
import Table from "../Components/table";
import Graph from "../Components/graph";

// Transform function for columns/data object
const transformData = ({ columns, data }) => {
  if (!columns || !data) return [];
  return data.map((row) =>
    Object.fromEntries(columns.map((col, i) => [col, row[i]]))
  );
};

const vehiclePoolData = [
  { Vehicle_ID: "SMALL_001", Vehicle_Type: "Small", Vehicle_Property: "General", Capacity_kg: 500, Capacity_L: 1500, Remaining_kg: 500, Remaining_L: 1500, Used: 0 },
  { Vehicle_ID: "SMALL_002", Vehicle_Type: "Small", Vehicle_Property: "General", Capacity_kg: 500, Capacity_L: 1500, Remaining_kg: 500, Remaining_L: 1500, Used: 0 },
  { Vehicle_ID: "MEDIUM_001", Vehicle_Type: "Medium", Vehicle_Property: "General", Capacity_kg: 1000, Capacity_L: 3000, Remaining_kg: 1000, Remaining_L: 3000, Used: 0 },
  { Vehicle_ID: "MEDIUM_002", Vehicle_Type: "Medium", Vehicle_Property: "General", Capacity_kg: 1000, Capacity_L: 3000, Remaining_kg: 1000, Remaining_L: 3000, Used: 0 },
  { Vehicle_ID: "LARGE_001", Vehicle_Type: "Large", Vehicle_Property: "General", Capacity_kg: 2000, Capacity_L: 6000, Remaining_kg: 2000, Remaining_L: 6000, Used: 0 },
  { Vehicle_ID: "LARGE_002", Vehicle_Type: "Large", Vehicle_Property: "General", Capacity_kg: 2000, Capacity_L: 6000, Remaining_kg: 2000, Remaining_L: 6000, Used: 0 },
  { Vehicle_ID: "SPECIAL_SMALL_001", Vehicle_Type: "Special_Small", Vehicle_Property: "Specialised", Capacity_kg: 500, Capacity_L: 1500, Remaining_kg: 500, Remaining_L: 1500, Used: 0 },
  { Vehicle_ID: "SPECIAL_SMALL_002", Vehicle_Type: "Special_Small", Vehicle_Property: "Specialised", Capacity_kg: 500, Capacity_L: 1500, Remaining_kg: 500, Remaining_L: 1500, Used: 0 },
  { Vehicle_ID: "SPECIAL_MEDIUM_001", Vehicle_Type: "Special_Medium", Vehicle_Property: "Specialised", Capacity_kg: 1000, Capacity_L: 3000, Remaining_kg: 1000, Remaining_L: 3000, Used: 0 },
  { Vehicle_ID: "SPECIAL_MEDIUM_002", Vehicle_Type: "Special_Medium", Vehicle_Property: "Specialised", Capacity_kg: 1000, Capacity_L: 3000, Remaining_kg: 1000, Remaining_L: 3000, Used: 0 },
  { Vehicle_ID: "SPECIAL_LARGE_001", Vehicle_Type: "Special_Large", Vehicle_Property: "Specialised", Capacity_kg: 2000, Capacity_L: 6000, Remaining_kg: 2000, Remaining_L: 6000, Used: 0 },
  { Vehicle_ID: "SPECIAL_LARGE_002", Vehicle_Type: "Special_Large", Vehicle_Property: "Specialised", Capacity_kg: 2000, Capacity_L: 6000, Remaining_kg: 2000, Remaining_L: 6000, Used: 0 },
];


export default function Dashboard({ setPopup }) {
  const [dashboardResponse, setDashboardResponse] = useState(null);

  // Memoized transformed data for performance
  const formattedResult = useMemo(() => {
    if (
      dashboardResponse?.columns &&
      dashboardResponse?.data &&
      Array.isArray(dashboardResponse.data)
    ) {
      return transformData(dashboardResponse);
    }
    return null;
  }, [dashboardResponse]);

  // Debugging Logs
  console.log("📥 Raw Backend Response:", dashboardResponse);
  console.log("✅ Transformed Data:", formattedResult);

  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-32 px-4 pb-32 space-y-10">
      <div className="flex justify-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-sky-400 dark:to-emerald-400">
            Simple Drag n Drop
          </span>{" "}
          Scalable AI.
        </h1>
      </div>

      <FileUploadDashboard
        setPopup={setPopup}
        endpoint="https://mlapi-232i.onrender.com/api/dispatch/"
        sampleFilePath="./dispatch.csv"
        setResponse={setDashboardResponse}
      />
{console.log(setDashboardResponse)}
      {/* ✅ Table + Graph Section */}
      {formattedResult?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-6 mb-12 w-full max-w-7xl p-4 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 shadow-lg overflow-x-auto"
        >
          <Table data={formattedResult} />
          <Graph data={formattedResult} />
        </motion.div>
      ) : (
        dashboardResponse && (
          <p className="text-center text-red-500 text-lg font-semibold">
            ❌ No valid data to display
          </p>
        )
      )}

      {formattedResult?.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.4 }}
    className="mt-6 mb-16 w-full max-w-7xl p-4 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 shadow-lg overflow-x-auto"
  >
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
      Available Vehicle Pool Overview 
      This one Gets That How many Vehicles You have Available for Dispatching your Requested Products.
    </h2>
    <Table data={vehiclePoolData} />
  </motion.div>
)}

    </section>
  );
}
