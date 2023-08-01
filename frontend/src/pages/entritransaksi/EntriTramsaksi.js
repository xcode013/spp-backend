import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import Form, {FormField, FormFieldwithOpt, Option} from '../../components/forms/normalform/Form';
import axios from 'axios';
import Button from '../../components/buttons/Button';
import Table, { RowData, Data } from '../../components/table/Table';
import { getStudents, getStudentbyKey, getSpp } from '../../api/api';
import currencyConverter from '../../utilities/currencyCoverter/currencyConverter';
import "./entritransaksi.css"
import { useToggle } from '../../utilities/toggler/useToggle';
import ModalBox from '../../components/modalbos/ModalBox';


function EntriTramsaksi() {
    // Check Sesssions
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError, user} = useSelector((state) => state.auth);

    const [tog, setTog] = useToggle(false);

    useEffect(()=> {
        dispatch(getMe());
    }, [dispatch]);
    
    useEffect(()=>{
        if(isError) navigate("/");
        if(user && user.level !== "admin") navigate("/dashboard");
        setStaffName(user && user.name ? user.name : "")
        setStaffId(user && user.id ? user.id : "")
    }, [isError, navigate, user])

    // _____
    const [dataStudents, setDataStudents] = useState([])
    const [student, setStudent] = useState([])
    const [staffName, setStaffName] = useState("")
    const [staffId, setStaffId] = useState("")

    const [nisn, setNisn] = useState("");
    const [name, setName] = useState("");
    const [prevPay, setPrevPay] = useState(0);
    const [pay, setPay] = useState(0);
    const [newPay, setNewPay] = useState();
    const [spp, setSpp] = useState("");
    const [sppAmount, setSppAmount] = useState()
    const [datasspp, setDatasSpp] = useState([]);

    const [nis, setNis] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [datasClass, setDatasClass] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const [errMg, setErrMsg] = useState("")

    useEffect(() => {
        getStudents().then((result) => {
            setDataStudents(result);
        })
        getSpp().then((result) => {
            setDatasSpp(result)
        })
    }, [])

    console.log(sppAmount);

    const payHandler = (key) => {
        getStudentbyKey(key).then((result) => {
            setNisn(result.nisn);
            setName(result.name);
            setSpp(result.spp.id);
            setSppAmount(result.spp.amount);
            setPrevPay(result.pay)

            setNis(result.nis);
            setAddress(result.address);
            setPhoneNumber(result.phoneNumber);
            setStudentClass(result.class.id);
        })
    }

    
    
    const submitHandler = useCallback(async (e) => {
        e.preventDefault();


        if(staffId !== "" || staffId !== null){
            try {
                if(pay <= sppAmount) {
                    await axios.post(`http://localhost:5000/payments`, {
                        officerId: staffId,
                        nisn: nisn,
                        payAt: Date(),
                        sppId: spp,
                        payAmount: Number(newPay)
                    })
        
                    await axios.patch(`http://localhost:5000/students/${nisn}`, {
                        pay: pay,
                        nisn: nisn,
                        nis: nis,
                        password: password,
                        confPass: confirmPassword,
                        name: name,
                        address: address,
                        phoneNumber: phoneNumber,
                        sppId: spp,
                        classId: studentClass
                    })
                    setPrevPay(pay);
                } else {
                    setErrMsg(`pembayaran sudah lunas. kembalian: ${pay - sppAmount}`)
                    await axios.post(`http://localhost:5000/payments`, {
                        officerId: staffId,
                        nisn: nisn,
                        payAt: Date(),
                        sppId: spp,
                        payAmount: Number(newPay)
                    }) 

                    await axios.patch(`http://localhost:5000/students/${nisn}`, {
                        pay: sppAmount,
                        nisn: nisn,
                        nis: nis,
                        password: password,
                        confPass: confirmPassword,
                        name: name,
                        address: address,
                        phoneNumber: phoneNumber,
                        sppId: spp,
                        classId: studentClass
                    })
                    setPrevPay(sppAmount);
                }

                setNewPay("");
    
                getStudents().then((result) => {
                    setDataStudents(result);
                })

            } catch (error) {
                console.log(error)
                if(error.response) setErrMsg(error.response.data.msg);
            }
        }
    }, [address, sppAmount, confirmPassword, name, newPay, pay, nis, nisn, password, phoneNumber, spp, staffId, studentClass])

    useEffect(() => {
        setPay(prevPay + newPay);
    }, [prevPay, newPay, submitHandler])
    

  return (
    <Layout>
        <div className='entripays-page'>
            {
                tog ? 
                    <ModalBox active={tog ? 'active' : ""} closeBtnAction={() => setTog()}>
                        <div className='body'>
                            <Table
                                tableHead={["no", "action", "nisn", "nis", "name", "class", "major", "spp", "pay", "phone number", "address"]}
                            >
                                {
                                    dataStudents.map((data, index) => {
                                        return(
                                            <RowData key={data.nisn}>
                                                <Data textAlign={"center"}>{index + 1}</Data>
                                                <Data textAlign={"center"}>
                                                    <Button
                                                        content={"Pay"}
                                                        color={"success"}
                                                        actionOnClick={() => {
                                                            payHandler(data.nisn)
                                                            setTog()
                                                        }}
                                                    />
                                                </Data>
                                                <Data>{data.nisn}</Data>
                                                <Data>{data.nis}</Data>
                                                <Data>{data.name}</Data>
                                                <Data>{data.class.nameClass}</Data>
                                                <Data>{data.class.major}</Data>
                                                <Data>{data.spp.year} - {currencyConverter("Id", "IDR", data.spp.amount)}</Data>
                                                <Data>{currencyConverter("Id", "IDR", data.pay)}</Data>
                                                <Data>{data.phoneNumber}</Data>
                                                <Data>{data.address}</Data>
                                            </RowData>
                                        )
                                    })
                                }
                            </Table>
                        </div>
                    </ModalBox>
                : ""
            }
            <Header
                title={"Entri"}
                mainTitle={"Transaksi"}
                subTitle={errMg ? errMg : ''}
            />
            <main className='body'>
                <header color='head-section'>
                    <Button
                        content={"Entri Payment"}
                        color={"success"}
                        actionOnClick={() => setTog()}
                    />
                </header>
                <main className='content-section'>
                    <Form formOnSubmit={submitHandler}>
                        <FormField
                            label='Student Name'
                            inputValue={name}
                            actionOnChange={(e) => setName(e.target.value)}
                        />
                        <FormField
                            label='Student NISN'
                            inputValue={nisn}
                            actionOnChange={(e) => setNisn(e.target.value)}
                        />
                        <FormFieldwithOpt
                            label='spp'
                            inputValue={spp}
                            actionOnChange={(e) => setSpp(e.target.spp)}
                        >
                            {
                                datasspp ? datasspp.map((data) => {
                                    return(
                                        <>
                                            <Option key={data.id} optValue={data.id} optLabel={`${currencyConverter("Id", "IDR", data.amount)} | ${data.year}`} />
                                        </>
                                    )
                                }) : ""
                            }
                        </FormFieldwithOpt>
                        <FormField 
                            label='staff'
                            inputValue={staffName}
                            actionOnChange={(e) => setStaffName(e.target.value)}
                        />
                        <FormField 
                            label='pay amount'
                            inputType='number'
                            placeholder={currencyConverter("Id", "IDR", prevPay)}
                            inputValue={newPay}
                            actionOnChange={(e) => setNewPay(Number(e.target.value))}
                        />
                    </Form>             
                </main>
            </main>
        </div>
    </Layout>
  )
}

export default EntriTramsaksi