import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const NotePage = () => {
  const param = useParams()
  let noteId = param.id
  let navigate = useNavigate()

  const [note, setNote] = useState([])

  useEffect(() => {
    getNote()
  }, [])

  let getNote = async () => {
    if(noteId === 'new'){
      return
    }
    let response = await fetch(`/notes/${noteId}`);
    let data = await response.json()
    setNote(data)
  }

  let updateNote = async () => {
    fetch(`/notes/${noteId}/update/`, { 
      method: "PUT", 
      headers:{'Content-Type': "application/json"}, 
      body: JSON.stringify(note) 
    })
  }

  let handleSubmit = () => {
    if(noteId !== 'new' && note.body === ""){
      deleteNote()
    } else if(noteId !== 'new'){
      updateNote()
    } else if(noteId === 'new' && noteId !== null){
      createNote()
    }
    navigate('/')
  }

  let deleteNote = async () => {
    fetch(`/notes/${noteId}/delete/`, { 
      method: "DELETE", 
      headers:{'Content-Type': "application/json"}
    })
    navigate('/')
  }

  let createNote = async () => {
    fetch(`/notes/create/`, { 
      method: "POST", 
      headers:{'Content-Type': "application/json"}, 
      body: JSON.stringify(note) 
    })
  }

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
          <i onClick={handleSubmit} class="fa fa-angle-left fa-5x" aria-hidden="true"></i>
        </h3>
        <br />
        {noteId !== "new" ? 
        <button onClick={deleteNote} className="btn btn-danger my-3">Delete</button> :
        <button onClick={handleSubmit} className="btn btn-success my-3">Done</button> }        
      </div>
      <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})} } defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage
