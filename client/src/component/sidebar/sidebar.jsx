
import React, { useState ,useEffect} from 'react'
import {NavLink,Outlet,useNavigate} from 'react-router-dom'
import '../../App.css';


function Admin() {
    const[open,setOpen]=useState(false)
    const Admintoken =localStorage.getItem('Admintoken')
    const navigate = useNavigate()
    useEffect(()=>{
        if (Admintoken) {
            navigate('/admin/record_track')
        }else{
            navigate('/adminLogin')

        }
    },[])
    
    const menus = [
        { title: "New Record" , path:"/admin/record_track" },
        { title: "Application List", path:"/admin/application_list" },
        { title: "Decline List" , path:"/admin/decline_list" },
        { title: "Progress" , path:"/admin/progress" },
        { title: "Booking Slot" , path:"/admin/booking_slot" },
        // { title: "LogOut" , path:"/admin/LogOut" },
    ]
    return (
        <div>
            <div className='md:flex'>
                <div className={`bg-[#003049] md:w-72 w-full  min-h-screen ${open ? null :'hidden'}  md:block   cursor-pointer`}>
                    <div className='flex relative w-full p-3 bg-[#091d27]'>
                    <p className='text-white  font-semibold tracking-wide text-4xl'>INCUB</p>
                    {/* <div className={`absolute right-0 text-3xl text-white mr-3 `} onClick={() => { setOpen(!open) }}>
                        {open ? <ion-icon name="close"></ion-icon> : <ion-icon name="list"></ion-icon>}
                    </div> */}
                    </div>

                    
                    <div>
                        <ul className=''>
                            <li>
                            {
                                menus.map((menu,index) => (
                                    <NavLink to={menu.path} className='text-whiteNavLinknk py-3'  key={index} activeclassName='active' >
                                       <div className='sidebarNav py-3 p-3 text-white font-semibold text-md'><span><ion-icon name="arrow-dropright"></ion-icon></span>{menu.title}</div>
                                    </NavLink>
                                ))
                            }
                            </li>

                            <li onClick={()=>{localStorage.clear();navigate('/adminLogin')}} className='text-white p-3 absolute bottom-5'><span><ion-icon name="arrow-dropright"></ion-icon></span>LogOut</li>
                        </ul>
                    </div>
                </div>
                <button className={`md:hidden absolute text-2xl ${open && 'text-white'} top-[10px] right-[10px]`} onClick={()=>{setOpen(!open)}}><ion-icon name="list"></ion-icon></button>
                <div className='w-full'>
                     <Outlet></Outlet>     
                </div>
            </div>
        </div>
    )
}

export default Admin