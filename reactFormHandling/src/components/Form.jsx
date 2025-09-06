import React, { useState } from 'react'

const Form = () => {

  const [errors, seterrors] = useState({})


  async function handleSubmit(e) {
    e.preventDefault()
    if(Object.keys(errors).length != 0)
    {
      console.log("Fix your errors first")
      return 0
    }
    
    // get data from form  using FormData Object
    let form = new FormData(e.target)

    let obj = {
      name: form.get("name"),
      dob: form.get("dob"),
      gender: form.get("gender"),
      department: form.get("department"),
      residence: form.getAll("residence"),
      address: form.get("address")
    }
    console.log(obj)

    // connecting to express server
    let r = await fetch("http://localhost:3000/", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(obj)
    })

    let res = await r.text()
    e.target.reset()

    console.log(res)
  }
  
  function handleName(e) {
    seterrors(prevState =>{
      let updated = {...prevState}
      if(e.target.value.length <= 3){
        updated.name = "Name must be longer than 3 letters"
      }
      else{
        delete updated.name
      }
      return updated
    })
  }
  
  function handleAddress(e) {
    seterrors(prevState =>{
      let updated = {...prevState}
      if(e.target.value.length >= 30){
        updated.address = "Address must be samller than 30 letters"
      }
      else{
        delete updated.address
      }
      return updated
    })
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <p>
        <label htmlFor="name"><b>Name:</b></label><br />
        <input type="text" id="name" name="name" onChange={(event)=>{handleName(event)}} /><br />
        {errors.name && <span className='error'>{errors.name}</span>}
      </p>
      <p>
        <label htmlFor="dob"><b>Date of Birth:</b></label><br />
        <input type="date" id="dob" name="dob" />
      </p>
      <p>
        Gender:<br />
        <input type="radio" id="male" name="gender" value="male" defaultChecked />
        <label htmlFor="male" >Male</label><br />
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label><br />
        <input type="radio" id="other" name="gender" value="other" />
        <label htmlFor="other">Others</label><br/>
        {/* {errors.gender && <span className='error'>{errors.gender}</span>} */}
      </p>
      <p>
        <label htmlFor="department"><b>Department:</b></label><br />
        <select name="department" id="department" defaultValue={"UIET"}>
          <option value="" disabled>--select dapertment--</option>
          <option value="IIHS">IIHS</option>
          <option value="UIET">UIET</option>
        </select>
      </p>
      <p>
        <b>Residential Status:</b><br />
        <input type="checkbox" id="rural" name="residence" value="rural" defaultChecked />
        <label htmlFor="rural">Rural</label><br />
        <input type="checkbox" id="urban" name="residence" value="Urban" />
        <label htmlFor="urban">Urban</label><br />
        {/* {errors.residence && <span className='error'>{errors.residence}</span>} */}
      </p>
      <p>
        <label htmlFor="address"><b>Address:</b></label><br />
        <textarea id="address" name="address" rows="5" cols="30" defaultValue={"1697 nai abdai"} onBlur={(event)=>{handleAddress(event)}}></textarea><br/>
        {errors.address && <span className='error'>{errors.address}</span>}
      </p>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
