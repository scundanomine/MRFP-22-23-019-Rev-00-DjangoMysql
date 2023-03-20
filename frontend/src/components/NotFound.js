import React from 'react'
import '../App.css'
import cat from '../archives/cat.webp'

const NotFound = () => {

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-fluid" src={cat} alt="" />
                    </div>
                    <div className="col-md-6">
                        <h1> 404 Errors </h1>
                        <p class="blue"><b> oh snap! The cat ate your file again</b></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound