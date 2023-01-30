import React, { useState } from 'react'
import './pages.css'
import {Carousel, Modal }from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({room, fromdate, todate}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row bs'>
            <div className="col-md-4">
                <img src={room.imageurls[0]} alt="Hotel" className="smallImg" />
            </div>
            <div className="col-md-7">
                <h1>{room.name}</h1> 
                <b>
                    <p>Max count: {room.maxcount}</p>
                    <p>Phonenumber: {room.phonenumber}</p>
                    <p>Type: {room.type}</p>
                </b>
                <div>
                    <button className="btn btn-primary float-xl-right m-1" onClick={handleShow}>View Details</button>
                    {(fromdate && todate) &&(
                        <Link to={`book/${room._id}`} state={{fromdate: fromdate, todate: todate}}>
                            <button className="btn btn-primary float-xl-right m-1">Book Now</button>
                        </Link>
                    )}
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header>
                <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageurls.map(image=>{
                            return <Carousel.Item>
                                <img
                                className="d-block w-100 bigImg"
                                src={image}
                                />
                            </Carousel.Item>
                        })
                        }
                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                <button className='btn' onClick={handleClose}>
                    Close
                </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Room
