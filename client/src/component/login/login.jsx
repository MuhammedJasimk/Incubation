import React, { useEffect, useState } from 'react';
import './login.css'
import jwt from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, seterror] = useState('')

  const token =localStorage.getItem('token')
  const Admintoken =localStorage.getItem('Admintoken')
  const navigator = useNavigate()
  console.log(props.admin);
 useEffect(()=>{
  if(props.admin){
  if(Admintoken){
    const admin = jwt(Admintoken);
    console.log(Admintoken);
    navigator('/admin') 
  }else{
    navigator('/adminLogin') 
  } 
}else{
  
  if(token ){
    const user = jwt(token);
    console.log(user);
    navigator('/') 
  }else{
    navigator('/login') 
  }
}

 },[])
  

  let adminUrl ="http://localhost:8080/api/auth/adminLogin"
  let userUrl ="http://localhost:8080/api/auth/login"
  
  let data={}
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    await axios.post(props.admin ? adminUrl : userUrl,
      {
        email,
        password
      }
    ).then((response) => {
      data = response
      seterror("")
    }).catch((err) => {
      console.log(err);
      seterror("Enter Proper Email Id and Password")
    })
    if (props.admin) {
      console.log("props");
      if (data.data.Admintoken) {
        localStorage.setItem("Admintoken","Admintoken "+ data.data.Admintoken);
        navigator('/admin')
      } else {
        alert("Please check your username and password")
      }
    }else{
      if (data.data.token) {
        localStorage.setItem("token","Bearer "+ data.data.token);
        navigator('/')
      } else {
        alert("Please check your username and password")
      }
    }
   
  }

  return (
    <div>
      <div>
        <div className="Auth-form-container">
          <form className="w-full max-w-md Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              {
                
                props.admin ? <h3 className="Auth-form-title">Login To AdminPannel</h3>:<h3 className="Auth-form-title">Login </h3>
              }
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" >
                    Email Id
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    name='email'
                    type="email"
                    value={email}
                    onChange={(e) => {
                      // setEmailerr('')
                      setEmail(e.target.value)
                    }}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" placeholder='Email id' />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input name='password'
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" placeholder="******************" />
                </div>
              </div>
              <p className='text-red-700 mb-4'>{error}</p>
              {
                props.admin ?
                null
              :

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold">
                  <span className="text-sm font-normal">Create a new account?
                    <Link to="/signup" className='font-semibold'>SignUp</Link>
                  </span>
                </label>
              </div>

              }
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login