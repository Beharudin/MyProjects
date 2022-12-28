import React from 'react'

function Upper() {
  return (
    <>
    <div class='container text-center mt-5'>
      <h2>Pricing</h2>
        <p class='text-'>Quickly build an effective pricing table for your potential customers with this Bootstrap example. 
        <p>It’s built with default Bootstrap components and utilities with little customization.</p></p>
    </div>

    <div class='container'>
        <div className="row">
            <div className="col-4">
                <div className="panel panel-default text-center">
                    <div className="panel-heading p-3">Free</div>
                    <div className="panel-body ">
                        <p><strong>$0</strong>/mo</p>
                        <p>10 users included</p>
                        <p>2 GB of storage</p>
                        <p>Email support</p>
                        <p>Help center access</p>
                        <button class='btn text-primary border p-2 w-75'>Sign up for free</button>
                    </div>
                </div>
            </div>
            <div className="col-4">
            <div className="panel panel-default text-center">
                <div className="panel-heading p-3">Pro</div>
                    <div className="panel-body ">
                        <p><strong>$15</strong>/mo</p>
                        <p>20 users included</p>
                        <p>10 GB of storage</p>
                        <p>Priority email support</p>
                        <p>Help center access</p>
                        <button class='btn btn-primary  p-2 w-75'>Get started</button>
                    </div>
                </div>
            </div>
            <div className="col-4">
            <div className="panel panel-primary text-center">
                <div className="panel-heading  bg-primary p-3">Enterprise</div>
                    <div className="panel-body ">
                        <p><strong>$29</strong>/mo</p>
                        <p>30 users included</p>
                        <p>15 GB of storage</p>
                        <p>Phone and email support</p>
                        <p>Help center access</p>
                        <button class='btn btn-primary p-2 w-75'>Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Upper
