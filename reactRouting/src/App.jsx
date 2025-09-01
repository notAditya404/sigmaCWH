import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router'

function App() {

  return (
    <div className="app ">
      <Navbar/>
      <Outlet title="passing"/>
      <Footer/>
    </div>
  )
}

export default App
