import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Pages
import Dashboard from './pages/dashboard/Dashboard';

// Officer Pages
import Officers from './pages/officers/Officers';
import AddOfficer from './pages/officers/AddOfficer';
import UpdateOfficer from './pages/officers/UpdateOfficer';

// Student Pages
import Students from './pages/students/Students';
import AddStudent from './pages/students/AddStudent';
import UpdateStudent from './pages/students/UpdateStudent';

// Classroom Pages
import Classrooms from './pages/classrooms/Classrooms';
import AddClassroom from './pages/classrooms/AddClassroom';
import UpdateClassroom from './pages/classrooms/UpdateClassroom';

// Spp Pages
import Spp from './pages/spp/Spp';
import AddSpp from './pages/spp/AddSpp';
import UpdateSpp from './pages/spp/UpdateSpp';

import EntriTramsaksi from './pages/entritransaksi/EntriTramsaksi';

import Login from './pages/login/Login';
import HistoryTransaksi from './pages/historytransaksi/HistoryTransaksi';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>

        {/* Officer Routes */}
        <Route path='/officers' element={<Officers/>}/>
        <Route path='/officers/add' element={<AddOfficer/>}/>
        <Route path='/officers/update/:key' element={<UpdateOfficer/>}/>

        {/* Student Routes */}
        <Route path='/students' element={<Students/>}/>
        <Route path='/students/add' element={<AddStudent/>}/>
        <Route path='/students/update/:key' element={<UpdateStudent/>}/>

        {/* Classroom Routes */}
        <Route path='/classrooms' element={<Classrooms/>}/>
        <Route path='/classrooms/add' element={<AddClassroom/>}/>
        <Route path='/classrooms/update/:key' element={<UpdateClassroom/>}/>

        {/* Spp Routes */}
        <Route path='/spp' element={<Spp/>}/>
        <Route path='/spp/add' element={<AddSpp/>}/>
        <Route path='/spp/update/:key' element={<UpdateSpp/>}/>

        <Route path='/entritransaksi' element={<EntriTramsaksi/>}/>
        <Route path='/historypayment' element={<HistoryTransaksi/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App