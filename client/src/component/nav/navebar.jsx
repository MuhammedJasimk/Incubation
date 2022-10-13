
import { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

function Navebar() {
  let decoded={}
  const navigate = useNavigate()
    const token = localStorage.getItem('token')
    if(token){
        decoded = jwt_decode(token); 
      }
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className='py-2  bg-primary w-full fixed top-0 left-0 w-100 flex items-center'>
        <div className='container mx-auto md:flex md:my-0 my-5  md:px-0 px-3 justify-between'>
          <div className='flex items-center'>
            <h2 className='fw-bold text-white font-semibold text-3xl'>INCUB </h2>
          </div>
          <div onClick={() => {
            setOpen(!open)
          }} className='text-3xl absolute right-8 top-8 cursor-pointer md:hidden'>
            <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
          </div>
          <div className={`md:flex px-9 md:px-0 items-center md:my-0 my-5 absolute md:static bg-primary  py-4 md:z-auto z[-1]
          left-0 w-full md:w-auto transition-all duration-500 ease-in ${open?'top-10 opacity-100':'top-[-300px] opacity-0 md:opacity-100'}`}>
            <p className='text-white mr-5 md:my-0 my-5 '>Welcome :{ decoded.name}<span></span></p>
            <button className='text-red-500  bg-white hover:text-white hover:bg-red-600  font-bold py-2 px-4 rounded'
              onClick={async () => {
                await localStorage.clear();
                navigate('/login')
              }}>LogOut</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navebar