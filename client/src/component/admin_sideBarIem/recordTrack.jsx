import React,{useEffect,useState,useReducer} from 'react'
import axios from "axios";
import Modal from "../modal/modal";

function RecordTrack() {

    const [userDt , setuserDt]=useState({})
    const [details , setDetails]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);


    useEffect(()=>{
        try {
            axios.get('http://localhost:8080/api/admin/getRegistration').then((response)=>{
            setDetails(response.data)
        }).catch((err)=>{
          console.log("err");
          console.log(err.message);
        }) 
        } catch (error) {
            console.log(error.message);
        }
       
       },[reducerValue])
       

       const getUserDetail= (id)=>{
        setIsOpen(true)
        console.log(isOpen);
        try {
            axios.post('http://localhost:8080/api/admin/getDetail',
            {id:id}).then((response)=>{
            setuserDt(response.data)
            forceUpdate();
        }).catch((err)=>{
          console.log(err.message);
        }) 
        }catch (error) {
            console.log(error.message);
        }
        
       }


       const approve= (id)=>{
        try {
            axios.post('http://localhost:8080/api/admin/approved',
            {id:id}).then((response)=>{
                alert("Updated Successfully")
                forceUpdate();
        }).catch((err)=>{
          console.log(err.message);
        }) 
        }catch (error) {
            console.log(error.message);
        }
       }


       const decline= (id)=>{
        try {
            axios.post('http://localhost:8080/api/admin/decline',
            {id:id}).then((response)=>{
                alert("Updated Successfully")
                forceUpdate();
        }).catch((err)=>{
          console.log(err.message);
        }) 
        }catch (error) {
            console.log(error.message);
        }
       }
       

        return (
          <div>
              <div className='py-8 px-8'>
              <h1 className='mb-7 font-bold text-2xl text-stone-600'>New Record</h1>
              <div className='overflow-x-scroll md:overflow-x-hidden'>
                  <table className='w-full text-xs text-left text-white rounded uppercase bg-[#003049]'>
                      <thead>
                          <tr>
                              <th className='py-3 px-6'>S.no</th>
                              <th className='py-3 px-6'>Company Name</th>
                              <th className='py-3 px-6'>Company Details</th>
                              <th className='py-3 px-6'>Status</th>
                              <th className='py-3 px-6'> </th>
                              <th className='py-3 px-6'> </th>
                          </tr>
                      </thead>
                      <tbody>
                        {
                        details.map((item,index)=>{
                        return(
                          <tr className='bg-white text-[#000] border-b dark:bg-gray-800 dark:border-gray-700 ' key={index}>
                              <td className='py-3 px-6'>{index + 1}</td>
                              <td className='py-3 px-6'>{item.company_name}</td>
                              <td className='py-3 px-6'>{item.background}</td>
                              <td className='py-3 px-6 text-orange-700 font-bold'>{item.status}</td>
                              <td className='py-3 px-6'>
                              <button onClick={()=>{getUserDetail(item._id)}} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Open</button>
                              <Modal open={isOpen} onclose={()=>{setIsOpen(false)}}>
                               {
                                <div>
                                    <p ><span  className='w-1/4'>Company Name: </span><span className='font-bold ml-3'>{userDt.company_name}</span></p>,
                                    <p><span className='w-1/4'> Background: </span> <span className='font-bold ml-3'>{userDt.background}</span></p>,
                                    <p><span className='w-1/4'> product: </span> <span className='font-bold ml-3'>{userDt.product}</span></p>,
                                    <p><span className='w-1/4'> Unique: </span> <span className='font-bold ml-3'>{userDt.unique}</span></p>,
                                </div>
                               
                               }
                              </Modal>
                              </td>
                              <td className='py-3 px-6'>
                              <button type="button"onClick={()=>{approve(item._id)}} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
                              <button type="button"onClick={()=>{decline(item._id)}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Decline</button>
                              </td>
                          </tr>
                            )
                          })
                            }
                      </tbody>
                  </table>
                  </div>
              </div>
          </div>
        )
}

export default RecordTrack