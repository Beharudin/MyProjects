import React from 'react'

function Footer() {
  return (
    <div class='container'>
      <hr class='m-5'/>
      <div class="row">
        <div class="col-3">
            <img src="/bootstrap.png" height='40px' />
            <p>© 2017–2022</p>
        </div>
        <div class="col-3">
            <h4>Features</h4>
            <p>Cool stuff</p>
            <p>Random feature</p>
            <p>Team feature</p>
            <p>Stuff for developers</p>
            <p>Another one</p>
            <p>Last time</p>
        </div>
        <div class="col-3">
            <h4>Resources</h4>
            <p>Resource</p>
            <p>Resource name</p>
            <p>Another resource</p>
            <p>Final resource</p>
        </div>
        <div class="col-3">
        <h4>About</h4>
            <p>Cool stuff</p>
            <p>Team</p>
            <p>Locations</p>
            <p>Privacy</p>
            <p>Terms</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
