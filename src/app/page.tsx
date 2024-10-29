import NavBar from "~/components/NavBar";


export default async function Home() {
  return (
      <div className="bg-neutral-800">
        <NavBar />
        <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 py-2">
            <div className="w-full max-w-2xl bg-neutral-900 p-4 rounded-t-lg border border-neutral-700">
              <div>
                <div className="flex justify-around hover:bg-neutral-900/10">
                  <div className="w-full h-full text-center border-r border-neutral-700">
                    <h1 className="text-lg text-white font-bold select-none">For You</h1>
                  </div>
                  <div className="w-full h-full text-center border-l border-neutral-700">
                    <h1 className="text-lg text-white font-bold select-none">Following</h1>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
  );
}
