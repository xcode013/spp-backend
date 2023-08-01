import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import Table, { RowData, Data } from '../../components/table/Table';
import { getClassrooms } from '../../api/api';
import Button from '../../components/buttons/Button';
import "./classrooms.css"
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/searchbar/SearchBar';
import axios from 'axios';

function Classrooms() {
    const [datas, setDatas] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state) => state.auth);

    useEffect(()=>{
        getClassrooms().then((result) => {
            setDatas(result);
        })
    }, []);

    useEffect(()=> {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(()=>{
      if(isError) navigate("/");
      if(user && user.level !== "admin") navigate("/dashboard");
    }, [isError, navigate, user])

    // Deleting Data
    const deleteHandler = async(key) => {
        await axios.delete(`http://localhost:5000/studentclass/${key}`);
        getClassrooms().then((result) => {
            setDatas(result);
        })
    }
  return (
    <Layout>
        <div className='classrooms-page'>
            <Header
                mainTitle={"Classrooms"}
                subTitle={"Page of Classrooms data"}
            />
            <main className='body'>
                <header className='body-head'>
                    <NavLink to={"/classrooms/add"} className={"add-button"}>
                        <Button
                            content={"New Classrooms"}
                            color={"success"}
                        />
                    </NavLink>

                    <SearchBar/>
                </header>
                <Table
                    tableHead={["no", "classroom", "major", "action"]}
                >
                    {
                        datas.map((data, index) => {
                            return(
                                <RowData key={data.id}>
                                    <Data textAlign={"center"}>{index + 1}</Data>
                                    <Data>{data.nameClass}</Data>
                                    <Data>{data.major}</Data>
                                    <Data textAlign={"center"}>
                                        <NavLink to={`/classrooms/update/${data.id}`}>
                                            <Button
                                                content={"Update"}
                                                color={"warning"}
                                            />
                                        </NavLink>
                                        <Button
                                            content={"Delete"}
                                            color={"danger"}
                                            actionOnClick={() => deleteHandler(data.id)}
                                        />
                                    </Data>
                                </RowData>
                            )
                        })
                    }
                </Table>
            </main>
        </div>
    </Layout>
  )
}

export default Classrooms