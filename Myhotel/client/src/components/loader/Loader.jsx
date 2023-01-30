import React, { useState } from 'react'
import {PuffLoader} from 'react-spinners'
import './loader.css'

function Loader() {
  const [loading, setLoading]=useState(true);

  return (
    <div className='container'>
      <div className="loader d-flex justify-content-center align-items-center">
        <PuffLoader
          color='#12b8e1'
          loading={loading}
          size={80}
      />
      </div>
    </div>
  )
}

export default Loader
