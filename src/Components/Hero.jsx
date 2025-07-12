import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ✅ Animation variant for fade+up motion
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function HeroParallax() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const inView1 = useInView(ref1, { margin: "-100px" });
  const inView2 = useInView(ref2, { margin: "-100px" });

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-40%"]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden  from-white via-gray-100 to-gray-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#1e1b4b] text-gray-900 dark:text-white">
      
      {/* HERO SECTION */}
      <motion.section
        className="relative flex flex-col justify-center items-center min-h-screen px-6 md:px-12 max-w-7xl mx-auto text-center z-10"
        style={{ y: y1 }}
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          Dispatch Planning
          <img
            src="/387b79a937fecaee7f2d3bc8a0e3081e.png"
            alt="&"
            className="inline-block h-8 md:h-10 lg:h-12 mx-2 dark:invert"
          />
          Space Optimization
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg text-gray-900 dark:text-gray-300 max-w-2xl"
        >
          AI that plans, stacks, and dispatches — fast. Cut delays, costs, and chaos from your supply chain.
        </motion.p>

        <div className="absolute bottom-6 animate-bounce z-50">
          <div className="w-5 h-10 border-2 border-gray-500 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          </div>
        </div>
      </motion.section>

      {/* SECTION 1: DISPATCH */}
      <motion.section
        ref={ref1}
  className="relative w-full min-h-screen lg:h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-8 gap-12"
        style={{ y: y2 }}
      >
        <motion.div
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="w-full lg:w-1/2"
        >
          <img
            src="./mainSOP.png"
            alt="Dispatch Mindmap"
            className="w-full h-auto "
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="w-full lg:w-1/2 text-left"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Space Optimization</h2>
          <ul className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>
              <span className="font-semibold text-blue-500 dark:text-blue-400">Step 1:</span> It's Load and Calculate your Plant Warehouse Blueprint accordingly and Divide it into Set of Racks alignment Or Cellular groups as 3*3 and Map accordingly acorss Multiple Racks and Storage Cells 
<br />
              <span className="font-semibold text-orange-500 dark:orange-blue-400">Example:</span> as Having 32 Racks and 7 Horizontal Storage cell assignment so Each Group Crries A : B : C as 10 : 10 : 10 and cells as 1 : 2 : 3 as 3 : 3 : 3 and work across n*n Cell layouts into 9 Gropu of Cells 

            </li>
            <li>
              <span className="font-semibold text-blue-500 dark:text-blue-400">Step 2:</span> In That Group of Cells Its align and Fits The products of N no of Parameters as (Fragility, Urgencey, TempSenstive) and Divide it into an Gradient allotment By Reinforcemtnt Learning with Feedback Pipeline (Based Upon StableBaseline3 Qtable) and packs for Each Product to Being Stored
            </li>
            <li>
              <span className="font-semibold text-green-600 dark:text-green-400">Result:</span> Optimised Group Cell Allotment according to Product's Parameters 
            </li>
          </ul>
        </motion.div>
      </motion.section>

      {/* SECTION 2: SPACE */}
      <motion.section
        ref={ref2}
  className="relative w-full min-h-screen lg:h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-8 gap-12"
        style={{ y: y2 }}
      >
        <motion.div
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="w-full lg:w-1/2"
        >
          <img
            src="./dispatch.png"
            alt="Space Optimization Diagram"
            className="w-full h-auto "
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="w-full lg:w-1/2 text-left"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Dispatch Planning</h2>
          <ul className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <li>
              <span className="font-semibold text-blue-500 dark:text-blue-400">Step 1:</span> Analyse Input Required Fields into Preprocessing and Dataframe allocations and By Splitting into Cluster Based Optimised set of  Pallets By ML 
            </li>
            <li>
              <span className="font-semibold text-blue-500 dark:text-blue-400">Step 2:</span> Loads Required Vehicle Dataset accordingly to Required and Available Vehicles after That Loads The products Pallet Clusters into Hierarchial Decision Tree Based KNN ML model for Dynamic allotment and Matching of Products set into Vehicles
            </li>
            <li>
              <span className="font-semibold text-green-600 dark:text-green-400">Result:</span> Creates The Optimised Dispatch Queue for Given set of Dispatched orders and Suggest Vehicle allotment according to its Cluster Hierarchy.
            </li>
          </ul>
        </motion.div>
      </motion.section>
    </div>
  );
}
