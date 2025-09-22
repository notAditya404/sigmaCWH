import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../utils/AuthContext'

const Home = () => {

  const [fetching, setFetching] = useState(true)
  const [quotes, setQuotes] = useState([])
  const navigate = useNavigate()

  const { setAuthenticated } = useAuth()
  
  useEffect(() => {
  async function fetchData() {
      try {
        const rawResponse = await fetch("http://localhost:3000/quotes", {
          method: "GET",
          credentials: "include"
        });
        const data = await rawResponse.json();
        setAuthenticated(data.success);
        if(!data.success){
          return navigate("/login", {replace: true})
        }
        console.log(data.data)
        setQuotes(data.data)
      } catch (err) {
        console.error(err);
        setAuthenticated(false);
        return navigate("/login", {replace: true})
      } finally {
        setFetching(false);
      }
    }

  
    
    fetchData();
  }, [])
  
  if(fetching){
    return <>Loading</>
  }
  

  return (
    <main>
      <p>I am protected home</p>
      <ul>
        {quotes.map((quote, index) => {
          return <li key={index}>{quote}</li>
        })}
      </ul>
    </main>
  )
}

export default Home
