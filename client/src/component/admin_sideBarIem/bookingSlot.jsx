import React,{useEffect,useState,useReducer} from 'react'
import axios from "axios";
import SlotModal from "../modal/slot_modal";


function BookingSlot() {
const [applicantsList, setApplicantsList] = useState([])
const [slot, setslot] = useState([])
const [slotModa, setslotModal] = useState(false)
const [selected, setSelected] = useState('')
const [slotId, setSlotId] = useState()
const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

useEffect(()=>{
  getSlote()
  displayApplicant()
},[reducerValue])

let displayApplicant =async()=>{
   console.log("displayApplicant");
   await axios.get('http://localhost:8080/api/admin/applicationList').then((response)=>{
    console.log("app", response.data);
     const record =response.data
     setApplicantsList(record)
  
   })
}

let getSlote =async()=>{
  console.log("getSlote");
  await axios.get('http://localhost:8080/api/admin/getSlot').then((response)=>{
    const slot =response.data
    setslot(slot)
    console.log(slot);
 
  })
}

function slotModal(id) {
  setslotModal(true)
     console.log(id);
     setSlotId(id)
}
function handileSubmit() {
  axios.get(`http://localhost:8080/api/admin/slotUpdate?slotId=${slotId}&company=${selected}`).then((response)=>{
    setslotModal(false)
    console.log("return");
    forceUpdate();
  })
}
console.log("selected ");
console.log(selected);
  return (
    <div>
        
        <div className='py-8 px-8'>

        <h1 className='mb-7 font-bold text-2xl text-stone-600'>Slot Booking</h1>
            <div className='bg-gray-200 p-3 rounded-lg'>
             <div className='grid md:grid-cols-10 xs:grid-cols-1 sm:grid-cols-2  rounded-lg gap-4'>
             {
              slot.map((item,index)=>{
                return(
                <div>
                <div onClick={()=>{return( item.isBooked ? alert("Slot Already Booked") : slotModal(item._id))}} className={`cursor-pointer rounded-lg flex 
                justify-center text-white text-2xl items-center h-20 ${item.isBooked ? 'bg-red-500' :'bg-green-500'}`} key={index}>{item.slot}</div>
                <SlotModal open={slotModa} onclose={()=>{setslotModal(false)}}>
                  <p className='mb-7 text-2xl font-semibold'>Booking Slot</p>
                 <div>
                        <select name="cars" id="cars" onChange={(e)=>{setSelected(e.target.value) }}  className='w-full'>
                          <option hidden >Select</option>
                        {
                          applicantsList.map((list,index)=>{
                            return(
                            <option  value={`${list.company_name}`} key={index}>{list.company_name}</option>
                            )
                          })
                        }
                        </select>
                 </div>
                <div className='text-right mt-8'>
                <button onClick={handileSubmit} type="button" className="focus:outline-none text-white
                 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium 
                 rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
                <button onClick={()=>{setslotModal(false)}} type="button"className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
                font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                </div>
                </SlotModal>
                </div>
                )
              })
            }
                
             </div>
             
            </div>
        </div>
    </div>
  )
}

export default BookingSlot 