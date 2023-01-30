import React from 'react'
import BarChart from '../charts/BarChart'
import PieChart from '../charts/PieChart'
import './body.css'
import TopComponent from './TopComponent'

function Body() {
  return (
    <div>
      <TopComponent />
      <div className='container'>
        <div className="row">
          <div className="col-xs-6 col-sm-7 m-1 mt-3">
              <BarChart />
          </div>
          <div className="col-sm-4 m-1 mt-3">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
