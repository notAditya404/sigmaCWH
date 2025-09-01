import React, { useState, useEffect } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useRef } from 'react';

const Card = () => {

    const newNote = useRef()
    const [Notes, setNotes] = useState(() => {
        return JSON.parse(localStorage.getItem("Notes")) || []
    })

    const [finishedNotes, setfinishedNotes] = useState(() => {
        return JSON.parse(localStorage.getItem("finishedNotes")) || []
    })
    const [showAll, setshowAll] = useState(false)

    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(Notes))
    }, [Notes])

    useEffect(() => {
        localStorage.setItem("finishedNotes", JSON.stringify(finishedNotes))
    }, [finishedNotes])


    const handleDelete = (tArray, index) => {
        let content;
        if (tArray == "Notes") {
            let temp = [...Notes]
            console.log("deleting at index", index, "item = ", temp[index])
            content = temp.splice(index, 1)
            setNotes(temp)
        }
        else {
            let temp = [...finishedNotes]
            console.log("deleting at index", index, "item = ", temp[index])
            content = temp.splice(index, 1)
            setfinishedNotes(temp)
        }
        return content
    }

    const handleEdit = (tArray, index)=>{
        newNote.current.value =  handleDelete(tArray, index)
    }

    const handleMove = (e, index) => {
        let tempNotes = [...Notes]
        let tempfinishedNotes = [...finishedNotes]
        if (e.target.checked) {
            tempfinishedNotes.push(tempNotes.splice(index, 1)[0])
        }
        else {
            tempNotes.push(tempfinishedNotes.splice(index, 1)[0])
        }

        setNotes(tempNotes)
        setfinishedNotes(tempfinishedNotes)
    }

    const addNote = () => {
        if (newNote.current.value != "") {
            let temp = [...Notes]
            temp.push(newNote.current.value)
            newNote.current.value = ""
            setNotes(temp)
        }
    }

    return (
        <div className='mainContent bg-[#b7cadb] h-[90%] w-[600px] mt-4 p-4 flex flex-col gap-6 rounded-xl'>
            <h1 className='heading text-center text-2xl font-bold'>iTask - Manage your Todos at one place</h1>

            <div className="addContainer flex flex-col gap-2">
                <h2 className='text-xl font-bold'>Add a Todo</h2>
                <div className="userInputBox flex gap-1">
                    <input ref={newNote} type="text" placeholder='Your thoughts>>>>' className='w-[90%] rounded-full py-1 px-2' />
                    <button onClick={addNote} className='saveBtn w-[10%] bg-blue-500 text-white rounded-full text-sm font-semibold p-1.5'>Save</button>
                </div>
            </div>

            <div className="noteContainer flex flex-col gap-2">
                <div className="viewBox flex items-center gap-1">
                    <input type="checkbox" name="finished" id="showFinished" onChange={(e) => setshowAll(e.target.checked)} />
                    <label htmlFor="showFinished" className='text-sm'>Show Finished</label>
                </div>

                <div className="ruler border border-gray-600 w-[90%] self-center"></div>

                <h2 className='text-xl font-bold'>Your Todos</h2>

                {showAll && finishedNotes.map((content, index) => {
                    return (
                        <div key={index} className="note flex justify-between items-center">
                            <div className="actualNote flex items-center gap-3">
                                <input type="checkbox" name="finishedNote" id={"finishedNotes" + index} checked={true} onChange={(e) => { handleMove(e, index) }} />
                                <label htmlFor={"finishedNotes" + index} className='text-sm line-through'>{content}</label>
                            </div>

                            <div className="noteOption flex gap-1">
                                <button onClick={() => { handleEdit("finishedNotes", index) }} className='editBtn bg-blue-800 text-white px-2 py-0.5 font-bold rounded-md'>
                                    <FaRegEdit />
                                </button>
                                <button onClick={() => { handleDelete("finishedNotes", index) }} className='deleteBtn bg-blue-800 text-white px-2 py-0.5 font-bold rounded-md'>
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>
                    )
                })}

                {Notes.map((content, index) => {
                    return (
                        <div key={index} className="note flex justify-between items-center">
                            <div className="actualNote flex items-center gap-3">
                                <input type="checkbox" name="note" id={"Notes" + index} checked={false} onChange={(e) => { handleMove(e, index) }} />
                                <label htmlFor={"Notes" + index} className='text-sm'>{content}</label>
                            </div>

                            <div className="noteOption flex gap-1">
                                <button onClick={() => { handleEdit("Notes", index) }} className='editBtn bg-blue-800 text-white px-2 py-0.5 font-bold rounded-md'>
                                    <FaRegEdit />
                                </button>
                                <button onClick={() => { handleDelete("Notes", index) }} className='deleteBtn bg-blue-800 text-white px-2 py-0.5 font-bold rounded-md'>
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Card
