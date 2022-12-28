import React from 'react'
import { useState} from "react";
import './status.css'
import Status1 from './Status1'
import Status2 from './Status2'
import Status3 from './Status3'
import Status4 from './Status4'

function StatusBar() {
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
      return <Status1/>;
    }
    else if(cur==="1"){
      setStatus("Approved", "Reviewing", "Waiting", "Waiting");
      return <Status2/>;
    }
    else if(cur==="2"){
      setStatus("Approved", "Approved", "Reviewing", "Waiting");
      return <Status3/>;
    }else{
      setStatus("Approved", "Approved", "Approved", "Approved");
      return <Status4/>;
    }
  }
  
 const handleCurrent=e=>{
    setCur(e.target.value)
 }
  return (
    <div className='body'>
    <div class="container px-md-4 mx-auto py-2 justify-content-center">
       <div class="card" style={{backgroundColor: "#eceff1"}}>
        <div class="d-flex flex-row px-3 justify-content-between top">
           <div class="d-flex">
            <h5>
              LOANID
              <span class="text-primary font-weight-bold">#YWSNWDAAW</span>
            </h5>
          </div>
          <div class="d-flex float-right">
            choose: <select name="current" onChange={handleCurrent}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
          </div>
        </div>
         <div class="d-flex flex-row justify-content-between top">
          <div class="d-flex icon-content">
            <p class="font-weight-bold">Branch</p>
          </div>
          <div class="d-flex icon-content">
              <p class="font-weight-bold">District</p>
          </div>
          <div class="d-flex icon-content"> 
              <p class="font-weight-bold">Head Office</p> 
          </div>
          <div class="fd-flex icon-content"> 
              <p class="font-weight-bold">Final</p> 
          </div>
        </div>
        
        <div class="d-flex flex-row justify-content-center">
          <div class="col-12">
          <Progress />
          </div>
        </div>
        <div class="d-flex flex-row justify-content-between top">
          <div class="d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Loan <br /> {bStatus}</p>
            </div>
          </div>
          <div class="d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Loan <br />{dSatus}</p>
            </div>
          </div>
          <div class="d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Loan <br />{hStatus}</p>
            </div>
          </div>
          <div class="d-flex icon-content">
            <div class="d-flex flex-column">
              <p class="font-weight-bold">Loan <br />{fStatus}</p>
            </div>
          </div>
        </div>
      </div> 
    </div>
    </div>
  )
}


export default StatusBar
