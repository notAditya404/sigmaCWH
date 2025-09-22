import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <Navbar />
      <Outlet title="passing" />
      <Footer />
    </>
  )
}

export default App
