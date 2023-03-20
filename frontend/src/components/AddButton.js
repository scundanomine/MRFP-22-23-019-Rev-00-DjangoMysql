import React from 'react'
import { Link } from 'react-router-dom'

const AddButton = () => {
  return (
    <Link to="/note/new" className='floating-button'>
        <i class="fa fa-plus" aria-hidden="true"></i>
    </Link>
  )
}

export default AddButton
