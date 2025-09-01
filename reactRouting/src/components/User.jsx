import React from 'react'
import { useParams } from 'react-router'

const User = () => {
    const params = useParams()

    return (
        <div className='flex-1 text-center text-white bg-slate-800'>
            <p>hi user {params.username}</p>
        </div>
    )
}

export default User
