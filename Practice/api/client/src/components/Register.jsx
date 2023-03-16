import React, { useState } from "react";
import Loader from './loader/Loader';
import Error from './error/Error';
import Success from './success/Success'
import axios from "axios";

function Register() {
    const [name, setName]=useState('');
    const [age, setAge]=useState('');
    const [msg, setMsg]=useState('');
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(false);
    const [success, setSuccess]=useState();

    async function submitHandler(){
        if(!name.length){
            setMsg('Name cannot be empty!');
            setError(true);
        }else if(!age.length){
            setMsg('Age cannot be empty!');
            setError(true);
        }else{
                const user={
                    name: name,
                    age: age,
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
                setAge('');
                setMsg('You are successfully registered!');
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
                        User
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
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
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="age"
                              value={age}
                              className="form-control"
                              placeholder="Your Age"
                              onChange={(e)=>setAge(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary" onClick={submitHandler}>
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

    </div>
  )
}

export default Register
