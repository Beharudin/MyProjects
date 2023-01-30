import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { LinearProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import './topComponent.css'

function TopComponent() {
    const [progress, setProgress]=useState(70);
  return (
    <div>
       <div className='container'>
        <div className="row">
            <div className="col-md-3 col-xs-6">
                <div className="card m-1">
                    <div className="card-body">
                        <p className="card-title"><small>BUDGET</small></p>
                        <div className="cardSubtitle">
                            <h3 className="card-subtitle mb-2 text-muted">&#36;24K</h3>
                            <img src="./assets/myphoto.png" alt="" className="cardIconImg" />
                        </div>
                        <p className="card-text"><span style={{color: 'red'}}><ArrowDownward fontSize="small"/>12% </span>Since last month</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-xs-6">
                <div className="card m-1">
                    <div className="card-body">
                        <p className="card-title"><small>TOTAL CUSTOMERS</small></p>
                        <div className="cardSubtitle">
                            <h3 className="card-subtitle mb-2 text-muted">16K</h3>
                            <img src="./assets/myphoto.png" alt="" className="cardIconImg" />
                        </div>
                        <p className="card-text"><span style={{color: 'green'}}><ArrowUpward fontSize="small"/>16% </span>Since last month</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-xs-6">
                <div className="card m-1">
                    <div className="card-body">
                        <p className="card-title"><small>TASKS PROGRESS</small></p>
                        <div className="cardSubtitle">
                            <h3 className="card-subtitle mb-2 text-muted">70%</h3>
                            <img src="./assets/myphoto.png" alt="" className="cardIconImg" />
                        </div>
                        <p className='pt-1'><LinearProgress variant="determinate" value={progress} /></p>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-xs-6">
                <div className="card m-1">
                    <div className="card-body">
                        <p className="card-title"><small>TOTAL PROFIT</small></p>
                        <div className="cardSubtitle">
                            <h3 className="card-subtitle mb-2 text-muted">&#36;24K</h3>
                            <img src="./assets/myphoto.png" alt="" className="cardIconImg" />
                        </div>
                        <p className="card-text" style={{visibility: 'hidden'}}>Since last month</p>
                    </div>
                </div>
            </div>
        </div>
       </div>
    </div>
  )
}

export default TopComponent
