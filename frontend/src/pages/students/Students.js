import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import Table, { RowData, Data } from '../../components/table/Table';
import { getStudents } from '../../api/api';
import Button from '../../components/buttons/Button';
import "./students.css"
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/searchbar/SearchBar';
import currencyConverter from '../../utilities/currencyCoverter/currencyConverter';
import axios from 'axios';

function Students() {
    const [datas, setDatas] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state) => state.auth);

    useEffect(()=>{
        getStudents().then((result) => {
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

    const deleteHandler = async(key) => {
        await axios.delete(`http://localhost:5000/students/${key}`);
        getStudents().then((result) => {
            setDatas(result);
        })
    }
  return (
    <Layout>
        <div className='student-page'>
            <Header
                mainTitle={"Students"}
                subTitle={"Page of Students data"}
            />
            <main className='body'>
                <header className='body-head'>
                    <NavLink to={"/students/add"} className={"add-button"}>
                        <Button
                            content={"New Students"}
                            color={"success"}
                        />
                    </NavLink>

                    <SearchBar/>
                </header>
                <Table
                    tableHead={["no", "nisn", "nis", "name", "class", "major", "spp", "phone number", "address", "action"]}
                >
                    {
                        datas.map((data, index) => {
                            return(
                                <RowData key={data.nisn}>
                                    <Data textAlign={"center"}>{index + 1}</Data>
                                    <Data>{data.nisn}</Data>
                                    <Data>{data.nis}</Data>
                                    <Data>{data.name}</Data>
                                    <Data>{data.class.nameClass}</Data>
                                    <Data>{data.class.major}</Data>
                                    <Data>{data.spp.year} - {currencyConverter("Id", "IDR", data.spp.amount)}</Data>
                                    <Data>{data.phoneNumber}</Data>
                                    <Data>{data.address}</Data>
                                    <Data textAlign={"center"}>
                                        <NavLink to={`/students/update/${data.nisn}`}>
                                            <Button
                                                content={"Update"}
                                                color={"warning"}
                                            />
                                        </NavLink>
                                        <Button
                                            content={"Delete"}
                                            color={"danger"}
                                            actionOnClick={() => deleteHandler(data.nisn)}
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

export default Students