import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout'
import Header from '../../components/header/Header'
import Form, {FormField, FormFieldwithOpt, Option} from '../../components/forms/normalform/Form';
import { useShowPass } from '../../utilities/toggler/useToggle';
import axios from 'axios';
import { getSpp, getClassrooms, getSppbyKey } from '../../api/api';
import currencyConverter from '../../utilities/currencyCoverter/currencyConverter';

function AddStudent() {
    const [showpass, setShowpass] = useShowPass();

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

    // Adding Data
    const [nisn, setNisn] = useState("");
    const [nis, setNis] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [pay, setPay] = useState(0);
    const [studentClass, setStudentClass] = useState("1");
    const [datasClass, setDatasClass] = useState([]);
    const [spp, setSpp] = useState("1");
    const [datasspp, setDatasSpp] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(()=>{
        getSpp().then((result) => {
            setDatasSpp(result);
        })
        getClassrooms().then((result) => {
            setDatasClass(result);
        })
    }, [])

    const addDataHandler = async(e) => {
        e.preventDefault();

        console.table({nisn, nis, password, confirmPassword, name, pay, address, phoneNumber, spp, studentClass})

        try {
            await axios.post(`http://localhost:5000/students`, {
                nisn: nisn,
                nis: nis,
                password: password,
                confPass: confirmPassword,
                name: name,
                pay: pay,
                address: address,
                phoneNumber: phoneNumber,
                sppId: spp,
                classId: studentClass
            })
            navigate("/students");
        } catch (error) {
            if(error.response){
                setErrorMsg(error.response.data.msg);
            }
        }
    }


  return (
    <Layout>
        <div className='student-add-page'>
            <Header
                title={"Add"}
                mainTitle={"Student"}
                subTitle={errorMsg}
            />
            <main className='body'>
            <Form 
                    linkToBack='/students'
                    formOnSubmit={addDataHandler}
                >
                    <FormField
                        label='nisn'
                        inputValue={nisn}
                        actionOnChange={(e) => setNisn(e.target.value)}
                    />
                    <FormField
                        label='nis'
                        inputValue={nis}
                        actionOnChange={(e) => setNis(e.target.value)}
                    />
                    <FormField
                        label='name'
                        inputValue={name}
                        actionOnChange={(e) => setName(e.target.value)}
                    />
                    <FormField
                        label='address'
                        inputValue={address}
                        actionOnChange={(e) => setAddress(e.target.value)}
                    />
                    <FormField
                        label='phone number'
                        inputValue={phoneNumber}
                        actionOnChange={(e) => setPhoneNumber(e.target.value)}
                        inputType='number'
                    />
                    <FormField 
                        label='password'
                        inputType={showpass}
                        inputValue={password}
                        actionOnChange={(e) => setPassword(e.target.value)}
                    />
                    <FormField
                        label='confirm password'
                        inputType={showpass}
                        inputValue={confirmPassword}
                        actionOnChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FormField 
                        label='show password ?'
                        inputType='checkbox'
                        actionOnChange={setShowpass}
                        required={false}
                    />
                    <FormFieldwithOpt
                        label='class'
                        inputValue={studentClass}
                        actionOnChange={(e) => setStudentClass(e.target.value)}
                    >
                        {
                            datasClass ? datasClass.map((data) => {
                                return(
                                    <>
                                        <Option key={data.id} optValue={data.id} optLabel={`${data.nameClass} | ${data.major}`} />
                                    </>
                                )
                            }) : ""
                        }
                    </FormFieldwithOpt>
                    <FormFieldwithOpt
                        label='spp'
                        inputValue={spp}
                        actionOnChange={(e) => setSpp(e.target.value)}
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
                    {/* <FormField
                        label='pay'
                        inputType='number'
                        inputValue={pay}
                        actionOnChange={(e) => setPay(e.target.value)}
                    /> */}
                </Form>
            </main>
        </div>
    </Layout>
  )
}

export default AddStudent