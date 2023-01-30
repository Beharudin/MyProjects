import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faLock, faKey, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import Loader from '../loader/Loader';
import Error from '../error/Error';
import Success from '../success/Success'
import axios from "axios";

function Register() {
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [pwd, setPwd]=useState('');
    const [repwd, setRepwd]=useState('');
    const [msg, setMsg]=useState('');
    const [agree, setAgree] = useState(false);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(false);
    const [success, setSuccess]=useState();

    async function submitHandler(){
        if(!name.length){
            setMsg('Name cannot be empty!');
            setError(true);
        }else if(!email.length){
            setMsg('Email cannot be empty!');
            setError(true);
        }else if(!pwd.length){
            setMsg('Password cannot be empty!');
            setError(true);
        }else{
            if(pwd===repwd){
                const user={
                    name: name,
                    email: email,
                    password: pwd,
                }
                try {
                    setLoading(true);
                    const data =(await axios.post('/users/register', user)).data;
                    setLoading(false);
                    setSuccess(true);
                } catch (error) {
                    setLoading(false);
                    setError(true);
                }
                setError(false);
                setName('');
                setEmail('');
                setPwd('');
                setRepwd('');
                setMsg('You are successfully registered!');
            }else{
                setRepwd('');
                setError(true);
                setMsg('Passwords not matched!');
            }
        }
    }
  return (
    <div>
        {loading ? <Loader />:(
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black m-3" style={{borderRadius: "25px"}}>
                {error && <Error message={msg} />}
                {success && <Success message={msg}/>}
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faUser} className="fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              value={name}
                              className="form-control"
                              placeholder="Your Name"
                              onChange={(e)=>setName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faEnvelope} className="fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              value={email}
                              className="form-control"
                              placeholder="Your Email"
                              onChange={(e)=>setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faLock} className="fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              value={pwd}
                              className="form-control"
                              placeholder="Password"
                              onChange={(e)=>setPwd(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon icon={faKey} className="fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="re_password"
                              value={repwd}
                              className="form-control"
                              placeholder="Repeat your password"
                              onChange={(e)=>setRepwd(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-4">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="tos"
                            onClick={(e)=>setAgree(e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="tos">
                            I agree all statements in{" "}
                            <Link to="">Terms of service</Link>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" disabled={!agree} onClick={submitHandler}>
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}

export default Register;
