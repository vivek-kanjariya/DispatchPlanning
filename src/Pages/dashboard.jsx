import FileUploadDashboard from "../Components/FileUploadDashboard";

export default function Dashboard({ setPopup }) {
  return (
    <section>
      <div className="flex justify-center pt-20">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-sky-400 dark:to-emerald-400">
            Simple Drag n Drop
          </span>{" "}
          Scalable AI.
        </h1>
      </div>

      <FileUploadDashboard setPopup={setPopup} />
    </section>
  );
}
