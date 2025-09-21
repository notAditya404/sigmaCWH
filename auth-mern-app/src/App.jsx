import './App.css'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router'
import { ToastContainer } from 'react-toastify';

function App() {

  let location = useLocation()

  return (
    <>
      {(location.pathname != "/signup" && location.pathname != "/login") && <Navbar />}
      <div className='flex-1 bg-zinc-500 flex flex-col justify-center items-center p-4'>
          <Outlet />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
