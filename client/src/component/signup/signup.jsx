import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
function Signup() {
    const [nameerr,setNameerr] = useState('')
    const [emailerr,setEmailerr] = useState('')
    const [passworderr,setPassworderr] = useState('')
    const navigator = useNavigate()
    // const onSubmit =(data)=>console.log(data);
    const handleSubmit = async (e) => {
       
        
        e.preventDefault()

        if(!name){
            setNameerr("Name is required")
            return false
          }
          if(!email){
            setEmailerr("Email is required")
            return false
          }
          if(!password){
            setPassworderr("Password is required")
            return false
          }



        console.log(name);

        try {
            const url = "http://localhost:8080/api/users/signup"
            const registered = {
                name: name,
                email: email,
                password: password
            }
            await axios.post(url, registered).then((response) => {
                setName("")
                setEmail("")
                setPassword("")
            }).then(()=>{
                alert("Account Created Successfully .....")
                navigator('/login')
            }).catch((err) => {
                console.log(err);
            })

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                seterror(error.response.data.message)
            }
        }
    }
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, seterror] = useState('')
    return (
        <div>
            <div>
                <div className="Auth-form-container">
                    <form className="w-full max-w-md Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                    <h3 className="Auth-form-title">SignUp</h3>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"  >
                                    Name
                                </label>

                            </div>

                            <div className="md:w-2/3">
                                <input
                                    name='name'
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setNameerr('')
                                        setName(e.target.value)
                                    }}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"  placeholder='Name'/>
                            </div>
                        </div>
                        <small className='text-red-600'> {nameerr}</small>
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
                                        setEmailerr('')
                                        setEmail(e.target.value)
                                    }}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" placeholder='Email id' />
                            </div>
                        </div>
                        <small className='text-red-600'>{emailerr}</small>
                      
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
                                        setPassworderr('')
                                        setPassword(e.target.value)
                                    }}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" placeholder="******************" />
                            </div>
                        </div>
                        <small className='text-red-600'>{passworderr}</small>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3"></div>
                            <label className="md:w-2/3 block text-gray-500 font-bold">
                                <span className="font-normal">Already a member?
                                <Link to="/login" className='font-semibold'>Login</Link>
                                </span>
                            </label>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                    SignUp
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
export default Signup