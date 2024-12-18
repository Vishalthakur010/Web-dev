import React from 'react'
import Template from '../components/Template'
import loginImg from "../assets/login.png"

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
    title="Welcome back"
    desc1="Build skills for today, Tomorrow, and beyond."
    desc2="Education to future proof your career"
    image={loginImg}
    formtype="login"
    setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login