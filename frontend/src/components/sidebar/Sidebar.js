import React from 'react';
import "./sidebar.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from "../../middleware/addSlice"

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }
  return (
    <div className={"sidebar"}>
        <header className={"head"}>
          <div className={"content"}>
            <h1 className={"logo-type"}>Anfall.</h1>
            <p className={"sub-logo"}>We are on Fire!</p>
          </div>
        </header>
        <main className={"body"}>
          <nav className={"navigation"}>
            <ul className='items'>
              <li className='item'>
                <NavLink to={"/dashboard"} className={"link"}>Dashboard</NavLink>
              </li>
              {
                user && user.level ?
                <>
                  {
                    user.level === "admin" ? <>
                      <li className='item'>
                        <NavLink to={"/officers"} className={"link"}>Petugas</NavLink>
                      </li>
                      <li className='item'>
                        <NavLink to={"/students"} className={"link"}>Siswa</NavLink>
                      </li>
                      <li className='item'>
                        <NavLink to={"/classrooms"} className={"link"}>Kelas</NavLink>
                      </li>
                      <li className='item'>
                        <NavLink to={"/spp"} className={"link"}>Spp</NavLink>
                      </li>
                    </> : ""
                  }
                  <li className='item'>
                    <NavLink to={"/entritransaksi"} className={"link"}>Entri Transaksi</NavLink>
                  </li>
                </>
                : ""
              }
              <li className='item'>
                <NavLink to={"/historypayment"} className={"link"}>History Transaksi</NavLink>
              </li>
            </ul>
          </nav>
        </main>
        <footer className={"foot"}>
          <NavLink onClick={logoutHandler} className={'logout-link link'} to={"/"} >Logout</NavLink>
        </footer>
    </div>
  )
}

export default Sidebar;