import React from 'react'
import {Routes, Route, Link, Form } from "react-router-dom";
import Welcome from './Welcome';

function MyLinks() {
  return (
    <div>
      hello
      <Link to="/form"> Form</Link>
      <Link to="/welcome"> Welcome</Link>
    </div>
  )
}

export default MyLinks
