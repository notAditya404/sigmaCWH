import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home';
import { Outlet, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';

function App() {

  const location = useLocation()
  return (
    <>
      {(location.pathname != "/signup" && location.pathname != "/login") && <Navbar />}
      <Outlet />
      <ToastContainer />
      {(location.pathname != "/signup" && location.pathname != "/login") && <Footer />}
    </>
  )
}

export default App
