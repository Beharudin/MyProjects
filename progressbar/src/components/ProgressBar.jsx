import React from 'react'
import { useState} from "react";
import './progressbar.css'
import ProgressControl from './ProgressControl'
import ProgressControl1 from './ProgressControl1'
import ProgressControl2 from './ProgressControl2'
import ProgressControl3 from './ProgressControl3'

function ProgressBar() {
  const [cur, setCur] = useState("0");
  const [bStatus, setbStatus] = useState("Reviewing");
  const [dSatus, setdSatus] = useState("Waiting");
  const [hStatus, sethStatus] = useState("Waiting");
  const [fStatus, setfStatus] = useState("Waiting");

  function setStatus(bs, ds, hs, fs){
    setbStatus(bs);
        setdSatus(ds);
        sethStatus(hs);
        setfStatus(fs);
  }
  function Progress(){
    if (cur==="0") {
      setStatus("Reviewing", "Waiting", "Waiting", "Waiting");
      return <ProgressControl/>;
    }
    else if(cur==="1"){
      setStatus("Approved", "Reviewing", "Waiting", "Waiting");
      return <ProgressControl1/>;
    }
    else if(cur==="2"){
      setStatus("Approved", "Approved", "Reviewing", "Waiting");
      return <ProgressControl2/>;
    }else{
      setStatus("Approved", "Approved", "Approved", "Approved");
      return <ProgressControl3/>;
    }
  }
  
 const handleCurrent=e=>{
    setCur(e.target.value)
 }
  return (
    <>
    <div class="container px-1 px-md-4 py-5 mx-auto">
      <div class="card">
        <div class="row d-flex justify-content-between px-3 top">
          <div class="d-flex">
            <h5>
              ORDER
              <span class="text-primary font-weight-bold">#YWSNWDAAW</span>
            </h5>
          </div>
          <div class="d-flex flex-column text-sm-right">
            choose: <select name="current" onChange={handleCurrent}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
          </div>
        </div>
        <div class="row justify-content-between top">
          <div class="row d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Branch</p>
            </div>
          </div>
          <div class="row d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">District</p>
            </div>
          </div>
          <div class="row d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Head Office</p>
            </div>
          </div>
          <div class="row d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Final</p>
            </div>
          </div>
        </div>
        {/*  Add class "active" to progress  */}
        <div class="row d-flex justify-content-center">
          <div class="col-12">
          <Progress />
          </div>
        </div>
        <div class="row justify-content-between top">
          <div class="row d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Loan <br /> {bStatus}</p>
            </div>
          </div>
          <div class="row d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Loan <br />{dSatus}</p>
            </div>
          </div>
          <div class="row d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Loan <br />{hStatus}</p>
            </div>
          </div>
          <div class="row d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Loan <br />{fStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}


export default ProgressBar
