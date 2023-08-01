import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import "./historytransaksi.css";
import { getPayments } from '../../api/api';
import axios from 'axios';
import Button from '../../components/buttons/Button';
import Table, { RowData, Data } from '../../components/table/Table';
import currencyConverter from '../../utilities/currencyCoverter/currencyConverter';
import { useToggle } from '../../utilities/toggler/useToggle';
import ModalBox from '../../components/modalbos/ModalBox';


function HistoryTransaksi() {
    // Check Sesssions
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state) => state.auth);

    useEffect(()=> {
        dispatch(getMe());
    }, [dispatch]);
    
    useEffect(()=>{
        if(isError) navigate("/");
        if(user && user.level !== "admin") navigate("/dashboard");
    }, [isError, navigate, user])

    // ___,
    const [toggle, setToggle] = useToggle(false);

    // ___.
    const [dataPayments, setDataPayments] = useState([]);

    useState(() => {
        getPayments().then((result) => {
            setDataPayments(result);
        })
    })

  return (
    <Layout>
        <div className='historitransaksi-page'>
            <Header
                title={"History"}
                mainTitle={"Transaksi"}
                // subTitle={errMg ? errMg : ''}
            />
            <main className='body'>
                <header color='head-section'>
                    <Button
                        content={"Entri Payment"}
                        color={"success"}
                        actionOnClick={() => setToggle()}
                    />
                </header>
                <main className='content-section'>
                    <Table tableHead={["no", "nama siswa", "spp", "membayar", "tgl pembayaran"]}>
                        {  console.log({dataPayments}) }
                        {
                            dataPayments ? dataPayments.map((data, index) => {
                                return(
                                    <RowData key={index}>
                                        <Data textAlign={"center"}>{index + 1}</Data>
                                        <Data>{data.student.name}</Data>
                                        <Data>{currencyConverter("Id", "IDR", data.student.spp.amount)}</Data>
                                        <Data>{currencyConverter("Id", "IDR", data.payAmount)}</Data>
                                        <Data>{data.payAt ? data.payAt  : "-"}</Data>
                                    </RowData>
                                )
                            }) 
                            : ""
                        }
                    </Table>
                </main>
            </main>
        </div>
    </Layout>
  )
}

export default HistoryTransaksi