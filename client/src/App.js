import React from 'react';
import {BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom'
import  LoginPages  from "./pages/loginpages";
import  SignupPages  from "./pages/signuppage";
import  AdminPannel  from "./component/sidebar/sidebar";
import Home from "./pages/HomePage";
import './App.css';
import List from "./component/admin_sideBarIem/applicationList";
import Slot from "./component/admin_sideBarIem/bookingSlot";
import Track from "./component/admin_sideBarIem/recordTrack";
import Events from "./component/admin_sideBarIem/scheduleevents";
import Progress from "./component/admin_sideBarIem/progress";

function App() {
  const user =localStorage.getItem("token")
  return (
    <div >
    <BrowserRouter>
    <Routes>
        {user&&<Route path="/" element={<Home />} />}
        <Route path="/login" element={<LoginPages />} />
        <Route path="/signup" element={<SignupPages />} />
        <Route path="/" element={<Navigate replace to="/login"/>} />
        <Route path="/adminLogin" element={<LoginPages admin={true}/>} />
        <Route path='/admin'  element={<AdminPannel />}>
            <Route path="/admin/application_list" element={<List/>} />
            <Route path='/admin/record_track' element={<Track />}></Route>
            <Route path='/admin/booking_slot' element={<Slot />}></Route>
            <Route path='/admin/progress' element={<Progress />}></Route>
            <Route path='/admin/decline_list' element={<Events />}></Route> 
        </Route>
       
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
