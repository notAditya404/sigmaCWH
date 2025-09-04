import Navbar from "./components/Navbar"
import { Outlet } from "react-router"
function App() {

  return (
    <>
      <Navbar />
      <main className="bg-slate-400 flex-1 p-4">
        <Outlet />
      </main>
    </>
  )
}

export default App
