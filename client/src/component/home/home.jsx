import {useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const navigator=useNavigate 
     const [err,setErr]=useState({})  
    const [form,setForm]=useState({
        Name:"",
        address:"",
        city:"",
        state:"",
        email:"",
        phone:"",
        company_name:"",
        company_logo:"",
        background:"",
        product:"",
        problem:"",
        unique:"",
        proposition:"",
        Advantage:"",
        revanue:"",
        Incubation:"",
        Proposal:""
    })

    function onChangeHandler(e) {
        setForm({...form,[e.target.name]:e.target.value})

        {
            const {email,Name,phone}=form
            console.log(email);

            if(email.length <=4){
                setErr({...err,emailerr:"Enter Proper Email And Enter atleast 4 charecter"})
            }else{
                setErr({...form,emailerr:""})
            }
            if(Name.length <=2){
                setErr({...err,nameErr:"Enter proper Name"})
            }else{
                setErr({...form,nameErr:""})
            }

            if(phone.length <9){
                setErr({...err,numberErr:"Enter proper Phone Number"})
            }else{
                setErr({...form,numberErr:""})
            }
        }
       
    }

    const fileSelectedHandler =(e)=>{
        const image = e.target.files[0]
        console.log( e.target.files[0]);
        setForm({...form,company_logo:image})    
    }

    console.log(form);

    async function handleSubmit(e) {
        e.preventDefault()

        const Data = new FormData();
        for (let key in form) {
            Data.append(key,form[key]) 
        }
        console.log("data",Data);
        console.log("form.company_logo");
        console.log(Data);
         console.log(form.company_logo);
        const url ="http://localhost:8080/api/users/register"
        console.log("name");
        // const data={
        // Name:form.Name,
        // address:form.address,
        // city:form.city,
        // state:form.state,
        // email:form.email,
        // phone:form.phone,
        // company_name:form.company_name,
        // company_logo:form.company_logo,
        // background:form.background,
        // product:form.product,
        // problem:form.problem,
        // unique:form.unique,
        // proposition:form.proposition,
        // Advantage:form.Advantage,
        // revanue:form.revanue,
        // Incubation:form.Incubation,
        // Proposal:form.Proposal
        // }

        // console.log("data");
        // console.log(data);
        // console.log("Data");
        // console.log(Data);
        
        await axios.post(url,Data).then((response)=>{
            console.log("response");
            console.log(response);
            alert("Updated Successfully")
            setForm({...form,
                Name:"",
                address:"",
                city:"",
                state:"",
                email:"",
                phone:"",
                company_name:"",
                company_logo:"",
                background:"",
                product:"",
                problem:"",
                unique:"",
                proposition:"",
                Advantage:"",
                revanue:"",
                Incubation:"",
                Proposal:""
            })
        }).catch((err)=>{
            console.log(err);
        })

    }
    

    return (
        <div >
            <div className="container m-auto">
                <h1 className="mt-[160px] underline text-secondary text-[30px] font-bold text-center">Application For Incubation </h1>
                <div className=" mt-[30px]">
                    <form onSubmit={handleSubmit} className="md:grid md:grid-cols-2 gap-4" encType="multipart/form-data">
                    <div className="md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Name
                            </label>
                        </div>
                        <input required onChange={onChangeHandler} value={form.Name} name='Name' type="text" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="Your Name" />
                        <p className='text-red-600'>{err.nameErr}</p>
                    </div>
                    <div className="md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Address
                            </label>
                        </div>
                        <input required name='address' onChange={onChangeHandler} value={form.address} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="Address" />
                    </div>
                    <div className="md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                City
                            </label>
                        </div>
                        <input required name='city' onChange={onChangeHandler} value={form.city} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="City" />
                    </div>
                    <div className="md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                State
                            </label>
                        </div>
                        <input required name='state' onChange={onChangeHandler} value={form.state} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="State" />
                    </div>
                    <div className="md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Email
                            </label>
                        </div>
                        <input required name='email' onChange={onChangeHandler} value={form.email} type="email" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="Email" />
                        <p className='text-red-500'>{err.emailerr}</p>
                    </div>
                    <div className="md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Phone No
                            </label>
                        </div>
                        <input required name='phone' type="tel" onChange={onChangeHandler} value={form.phone} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="Phone No" />
                        <p className='text-red-500'>{err.numberErr}</p>
                    </div>
                    <div className="md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Company Name
                            </label>
                        </div>
                        <input required name='company_name' onChange={onChangeHandler} value={form.company_name} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="Company Name" />
                    </div>
                    <div className="md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Company Logo
                            </label>
                        </div>
                        <input required filename='company_logo' onChange={fileSelectedHandler} value={form.image} type="file" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="" />
                    </div>
                    <div className="col-span-2 md:my-0 my-3 ">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Describe Your Team and Banckground
                            </label>
                        </div>
                        <textarea rows="3" onChange={onChangeHandler} value={form.background} name='background' type="text" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder=" Describe Your Team and Banckground" />
                    </div>
                    <div className="col-span-2 md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Describe Your Company and Product
                            </label>
                        </div>
                        <textarea rows="3" onChange={onChangeHandler} value={form.product} name='product' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="Describe Your Company and Product" />
                    </div>
                    <div className="col-span-2 md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Describe Your Problem Your Trying To Solve
                            </label>
                        </div>
                        <textarea rows="3" onChange={onChangeHandler} value={form.problem} name='problem' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder=" Describe Your Problem Your Trying To Solve" />
                    </div>
                    <div className="col-span-2 md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                What is Unique About Your Solution
                            </label>
                        </div>
                        <textarea rows="3" onChange={onChangeHandler} value={form.unique} name='unique' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder=" What is Unique About Your Solution" />
                    </div>
                    <div className="col-span-2 md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                What is Your Value Proposition For The Customers
                            </label>
                        </div>
                        <textarea rows="3" onChange={onChangeHandler} value={form.proposition} name='proposition' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="What is Your Value Proposition For The Customers" />
                    </div>
                    <div className="col-span-2 md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Who Are Your Competitors And What is Your Competative Advantage
                            </label>
                        </div>
                        <textarea rows="3" onChange={onChangeHandler} value={form.Advantage} name='Advantage' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder=" Who Are Your Competitors And What is Your Competative Advantage" />
                    </div>
                    <div className="col-span-2 md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Explain Your Revanue mode
                            </label>
                        </div>
                        <textarea rows="3" onChange={onChangeHandler} value={form.revanue} name='revanue' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder="  Explain Your Revanue mode" />
                    </div>

                    <div className="col-span-2">
                    <label className="block text-gray-500 font-bold   mb-2 pr-4">
                               Type of incubation needed
                            </label>
                        <div className="flex items-center mb-4">
                            <input required id="default-radio-1" onChange={onChangeHandler} type="radio" value="Physical Incubation" name="Incubation" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Physical Incubation</label>
                        </div>
                        <div className="flex items-center">
                            <input required  id="default-radio-2" onChange={onChangeHandler} type="radio" value="Virtual Incubation" name="Incubation" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Virtual Incubation</label>
                        </div>
                    </div>

                    <div className="col-span-2 md:my-0 my-3">
                        <div className="">
                            <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4">
                                Upload a Detail Business Proposal
                            </label>
                        </div>
                        <textarea rows="3" onChange={onChangeHandler} value={form.Proposal} name='Proposal' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="" placeholder=" Upload a Detail Business Proposal" />
                    </div>
                    <div className="text-center mt-4 mb-[70px] col-span-2">
                    <button type="submit" className='text-white   bg-red-500 hover:text-white hover:bg-red-600  font-bold py-2 px-4 rounded'
              >Submit</button>
              </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home