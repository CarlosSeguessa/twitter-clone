export default function AppLayout ({ children }) {
  return (
    <>
      <div className="grid place-items-center w-full h-screen">
        <main className="bg-white font-roboto rounded-xl shadow-xl w-full h-full overflow-y-auto sm:w-[27rem] sm:h-[90vh] flex flex-col">
          {children}
        </main>
      </div>
    </>
  )
}
