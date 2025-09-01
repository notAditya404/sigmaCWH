import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'

function App() {

  return (
    <>
      <Navbar/>
      <main className='flex justify-center bg-slate-300 h-[calc(100vh-50px)]'>
        <Card/>
      </main>
    </>
  )
}

export default App
