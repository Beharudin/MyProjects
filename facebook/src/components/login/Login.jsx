import React from 'react'
import './login.css'

function Login() {
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeftItems">
                <div className="loginLeftItem">
                    <img src="../assets/fb.png" alt="" className="loginImg" />
                    <h2 className='loginTitle'>Recent logins</h2>
                    <span className="loginDesc">Click your picture or add an account.</span>
                </div>
                <div className="loginLeftBoxes">
                    <div className="loginLeftBox">
                        <img src="../assets/profile.jfif" alt="" className="recentProfile" />
                        <span className="recentUsername">Beharudin</span>
                    </div>
                    <div className="loginLeftBox">
                    <img src="../assets/add.png" alt="" className="addAcctImg" />
                        <span className="recentUsername">Add Account</span>
                    </div>
                </div>
            </div>
            <div className="loginRightItems">
                <div className="loginRightItem">
                    <input placeholder="Email address or Phone number" className="loginInput" />
                    <input placeholder="Password" className="loginInput" />
                    <button className="loginButton">Login</button>
                    <span className="spanForgotPwd">Forgotten password?</span>
                    <button className="creataAcctButton">Create New Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login


