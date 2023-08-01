import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import Table, { RowData, Data } from '../../components/table/Table';
import { getSpp } from '../../api/api';
import Button from '../../components/buttons/Button';
import "./spp.css"
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/searchbar/SearchBar';
import currencyConverter from '../../utilities/currencyCoverter/currencyConverter';
import axios from 'axios';

function Spp() {
    const [datas, setDatas] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state) => state.auth);

    useEffect(()=>{
        getSpp().then((result) => {
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
        await axios.delete(`http://localhost:5000/spp/${key}`);
        getSpp().then((result) => {
            setDatas(result);
        })
    }
  return (
    <Layout>
        <div className='spp-page'>
            <Header
                mainTitle={"Spp"}
                subTitle={"Page of Spp data"}
            />
            <main className='body'>
                <header className='body-head'>
                    <NavLink to={"/spp/add"} className={"add-button"}>
                        <Button
                            content={"New Spp"}
                            color={"success"}
                        />
                    </NavLink>

                    <SearchBar/>
                </header>
                <Table
                    tableHead={["no", "year", "amount", "action"]}
                >
                    {
                        datas.map((data, index) => {
                            return(
                                <RowData key={data.id}>
                                    <Data textAlign={"center"}>{index + 1}</Data>
                                    <Data>{data.year}</Data>
                                    <Data>{currencyConverter("Id", "IDR", data.amount)}</Data>
                                    <Data textAlign={"center"}>
                                        <NavLink to={`/spp/update/${data.id}`}>
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

export default Spp