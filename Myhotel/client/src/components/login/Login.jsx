import React, { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import Loader from '../loader/Loader';
import Error from '../error/Error';
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(false);
  const [msg, setMsg]=useState('');

  async function loginHandler(){
    if(!email.length){
        setMsg('Email cannot be empty!');
        setError(true);
    }else if(!pwd.length){
        setMsg('Password cannot be empty!');
        setError(true);
    }else{
        setError(false);
        const user={
            email: email,
            password: pwd,
        }
        try {
            setLoading(true);
            const result =(await axios.post('/users/login', user)).data; 
            setLoading(false);
            
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href='/';
        } catch (error) {
             console.log(error);
            setLoading(false);
            setError(true);
        }
    }
}
  return (
    <div>
        {loading ? <Loader />:(
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-black m-5" style={{ borderRadius: "25px" }} >
                {error && <Error message={msg} />}
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="fa-lg me-3 fa-fw"
                        />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            className="form-control"
                            placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="fa-lg me-3 fa-fw"
                        />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="password"
                            value={pwd}
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) => setPwd(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={loginHandler}
                        >
                          Login
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

export default Login;
