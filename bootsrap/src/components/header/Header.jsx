import React, { Component } from 'react'

export default class NavbarComp extends Component {
    render() {
        return (
            <>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand active" href="#">Myapp</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Enterprise</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link">Support</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link">Pricing</a>
                        </li>
                    </ul>
                    </div>
                    
                    <ul class="nav navbar-nav navbar-right me-auto mb-2 mb-lg-0r" id='mynav'>
                        <li class="nav-item"><a class="nav-link" href="#">Sign Up</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Login</a></li>
                    </ul>
                </div>
            </nav>
            </>
        )
    }
}