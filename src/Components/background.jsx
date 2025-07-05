export default function GlobalBackground() {
  return (
    <>
      {/* Light Mode Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_30%,#dbeafe_100%)] dark:hidden"></div>

      {/* Dark Mode Background */}
      <div className="fixed inset-0 -z-10 h-full w-full hidden dark:block [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    </>
  );
}
