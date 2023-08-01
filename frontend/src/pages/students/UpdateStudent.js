import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout'
import Header from '../../components/header/Header'
import Form, {FormField, FormFieldwithOpt, Option} from '../../components/forms/normalform/Form';
import { useShowPass } from '../../utilities/toggler/useToggle';
import axios from 'axios';
import { getSpp, getClassrooms, getStudentbyKey } from '../../api/api';
import currencyConverter from '../../utilities/currencyCoverter/currencyConverter';

function UpdateStudent() {
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
    const {key} = useParams();

    const [nisn, setNisn] = useState("");
    const [nis, setNis] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [datasClass, setDatasClass] = useState([]);
    const [spp, setSpp] = useState("");
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
        getStudentbyKey(key).then((result) => {
            setNisn(result.nisn);
            setNis(result.nis);
            setName(result.name);
            setAddress(result.address);
            setPhoneNumber(result.phoneNumber);
            setStudentClass(result.class.id);
            setSpp(result.spp.id);
        })
    }, [])

    const updateDataHandler = async(e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:5000/students/${key}`, {
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
            navigate("/students");
        } catch (error) {
            if(error.response){
                setErrorMsg(error.response.data.msg);
            }
        }
    }
  return (
    <Layout>
        <div className='student-update-page'>
            <Header
                title={"Update"}
                mainTitle={"Student"}
                subTitle={"Update data for Students"}
            />
            <main className='body'>
            <Form 
                    linkToBack='/students'
                    formOnSubmit={updateDataHandler}
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
                        required={false}
                        placeholder={"if you don't need to update password, you can empty this field"}
                        inputType={showpass}
                        inputValue={password}
                        actionOnChange={(e) => setPassword(e.target.value)}
                    />
                    <FormField
                        label='confirm password'
                        required={false}
                        placeholder={"if you don't need to update password, you can empty this field"}
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
                            datasspp ? datasspp.map((data, index) => {
                                return(
                                    <>
                                        <Option key={data.id} optValue={data.id} optLabel={`${currencyConverter("Id", "IDR", data.amount)} | ${data.year}`} />
                                    </>
                                )
                            }) : ""
                        }
                    </FormFieldwithOpt>
                </Form>
            </main>
        </div>
    </Layout>
  )
}

export default UpdateStudent