import React from 'react'

function Card(props) {
    
    
  return (
    <div className='card border-2 border-slate-600 w-[500px] p-2 rounded-lg'>
        <p className='text-lg font-bold'>{props.title}</p>
        <p className='italic'>{props.body}</p>
    </div>
  )
}

export default Card
