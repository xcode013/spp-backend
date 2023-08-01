import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import "./dashboard.css";

// Components
import Header from '../../components/header/Header';
import {CardLandscapeOne} from '../../components/cards/Cards';
import { FaUserGraduate, FaUserShield, FaBuilding} from "react-icons/fa";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector((state) => state.auth);

  useEffect(()=> {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(()=>{
    if(isError) navigate("/");
  }, [isError, navigate])
  return (
    <Layout>
        <div className='dashboard'>
          <Header
            mainTitle={"Dashboard"}
            subTitle={"Wellcome,"}
            mainSubTitle={user && user.name ? user.name : "User on Loading..."}
          />
          <main className='body'>
            <div className='payment-track'>
              <div className='history'>
                <ul className='items'>
                  <li className='item'>Student_Name, Pay_at, Amount/Total_Payment</li>
                  <li className='item'>Student_Name, Pay_at, Amount/Total_Payment</li>
                  <li className='item'>Student_Name, Pay_at, Amount/Total_Payment</li>
                  <li className='item'>Student_Name, Pay_at, Amount/Total_Payment</li>
                  <li className='item'>Student_Name, Pay_at, Amount/Total_Payment</li>
                </ul>
              </div>
              <div className='paid-off'>
                <ul className='items'>
                  <li className='item'>Student_Name - Amount/Total_Payment</li>
                  <li className='item'>Student_Name - Amount/Total_Payment</li>
                  <li className='item'>Student_Name - Amount/Total_Payment</li>
                </ul>
              </div>
            </div>
            <div className='data-items'>
              <div className='item'>
                <CardLandscapeOne
                  titleCard={"Classrooms"}
                  iconCard={<FaBuilding/>}
                  mainContentCard={"Content"}
                  seemorePath={"/class"}
                />
              </div>
              <div className='item'>
                <CardLandscapeOne
                  titleCard={"Officers"}
                  iconCard={<FaUserShield/>}
                  mainContentCard={"Content"}
                  seemorePath={"/officers"}
                />
              </div>
              <div className='item'>
                <CardLandscapeOne
                  titleCard={"Students"}
                  iconCard={<FaUserGraduate/>}
                  mainContentCard={"Content"}
                  seemorePath={"/officers"}
                />
              </div>
            </div>
          </main>
        </div>
    </Layout>
  )
}

export default Dashboard