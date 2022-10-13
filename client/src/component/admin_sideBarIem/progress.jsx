import React, { useEffect, useState } from 'react'
import axios from "axios";

function Progress() {

  const [detail, setDetail] = useState([])

  useEffect(() => {
    getProgerss()
  }, [])

  function getProgerss() {
    axios.get('http://localhost:8080/api/admin/progerss').then((response) => {
      console.log(response);
      setDetail(response.data)
    })
  }
  return (
    <div>
      <div className='py-8 px-8'>
      <h1 className='mb-7 font-bold text-2xl text-stone-600'>Progress</h1>
      <div className='overflow-x-scroll md:overflow-x-hidden'>
        <table className='w-full text-xs text-left text-white rounded uppercase bg-[#003049]'>
          <thead>
            <tr >
              <th className='py-3 px-6'>S.no</th>
              <th className='py-3 px-6'>Company Name</th>
              <th className='py-3 px-6'>Company Details</th>
              <th className='py-3 px-6 w-[30%]'>Progress</th>
            </tr>
          </thead>
          <tbody>
            {
              detail.map((item, index) => {
                return (
                  <tr className='bg-white text-[#000] border-b dark:bg-gray-800 dark:border-gray-700 ' key={index}>
                    <td className='py-3 px-6'>{index + 1}</td>
                    <td className='py-3 px-6'>{item.company_name}</td>
                    <td className='py-3 px-6'>{item.background}</td>
                    <td className='py-3 px-6' >
                     {
                      item.status=="Pending" ?
                      <div className="w-full bg-gray-200 rounded-full">
                        <div className="bg-orange-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded w-24">Pending</div>
                      </div> 
                      :item.status=="Decline" ?
                      <div className="w-full bg-gray-200 rounded-full">
                      <div className="bg-red-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded w-[65%]">Declain</div>
                      </div>:
                       <div className="w-full bg-gray-200 rounded-full">
                       <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded w-w-96">Approved</div>
                     </div>
                      }


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

export default Progress