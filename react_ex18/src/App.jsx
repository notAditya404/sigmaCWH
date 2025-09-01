import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'

function App() {

  const [data, setdata] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false);


  return (
    <>
      <Navbar />
      <div className="Card-Box p-3 bg-red-50 flex gap-2 flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          data.slice(0, 4).map((card, itemKey) => (
            <Card key={itemKey} title={card.title} body={card.body} />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <button className='border p-1 rounded-lg bg-slate-400 mt-1'
        onClick={() => {
          setLoading(true);
          fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
            return res.json()
          }).then((result) => {
            console.log(result)
            setdata(result)
            setLoading(false );
          })
          setCount(count + 1)
        }}>Genrate Data + {count}</button>
    </>
  )
}

export default App
