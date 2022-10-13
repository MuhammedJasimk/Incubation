import React ,{useEffect,useState,useReducer} from 'react'
import axios from "axios";
import Modal from "../modal/modal";

function DeclineList() {

    const [details , setDetails]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [userDt , setuserDt]=useState({})


    useEffect(()=>{
        try {
            axios.get('http://localhost:8080/api/admin/decline_list').then((response)=>{
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

       return (
        <div>
            <div className='py-8 px-8'>
            <h1 className='mb-7 font-bold text-2xl text-stone-600'>Decline List</h1>
            <div className='overflow-x-scroll md:overflow-x-hidden'>
                <table className='w-full text-xs text-left text-white rounded uppercase bg-[#003049]'>
                    <thead>
                        <tr>
                            <th className='py-3 px-6'>S.no</th>
                            <th className='py-3 px-6'>Company Name</th>
                            <th className='py-3 px-6'>Company Details</th>
                            <th className='py-3 px-6'>Status</th>
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
                            <td className='py-3 px-6 text-red-700 font-bold'>{item.status}</td>
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

export default DeclineList