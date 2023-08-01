import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import { getOfficerbyKey } from '../../api/api';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import Form, {FormField, FormFieldwithOpt, Option} from '../../components/forms/normalform/Form';
import { useShowPass } from '../../utilities/toggler/useToggle';
import axios from 'axios';


function UpdateOfficer() {
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

    // Update Data
    const {key} = useParams();

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [level, setLevel] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getOfficerbyKey(key).then((result) => {
            const {username, name, level} = result;
            setFullname(name);
            setUsername(username);
            setLevel(level);
        })
    }, [])

    const updateHandler = async(e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:5000/officers/${key}`, {
                name: fullname,
                username: username,
                password: password,
                confPass: confirmPassword,
                level: level
            });
            navigate("/officers")
        } catch (error) {
            if(error.response){
                setErrorMsg(error.response.data.msg)
            }
        }
    }
  return (
    <Layout>
        <div className='afficer-update-page'>
            <Header
                title={"Update"}
                mainTitle={"Officer"}
                subTitle={"Change and Updating data Officer"}
            />
            <main className='body'>
                <Form 
                    linkToBack='/officers'
                    formOnSubmit={updateHandler}
                >
                    <FormField
                        label='full name'
                        inputValue={fullname}
                        actionOnChange={(e) => setFullname(e.target.value)}
                    />
                    <FormField
                        label='username'
                        inputValue={username}
                        actionOnChange={(e) => setUsername(e.target.value)}
                    />
                    <FormField 
                        label='password'
                        required={false}
                        inputType={showpass}
                        inputValue={password}
                        actionOnChange={(e) => setPassword(e.target.value)}
                        placeholder={"if you don't need to update password, you can empty this field"}
                    />
                    <FormField
                        label='confirm password'
                        required={false}
                        inputType={showpass}
                        inputValue={confirmPassword}
                        actionOnChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={"if you don't need to update password, you can empty this field"}
                    />
                    <FormField 
                        label='show password ?'
                        inputType='checkbox'
                        actionOnChange={setShowpass}
                        required={false}
                    />
                    <FormFieldwithOpt
                        label='level'
                        inputValue={level}
                        actionOnChange={(e) => setLevel(e.target.value)}
                    >
                        <Option
                            optLabel='admin'
                        />
                        <Option
                            optLabel='petugas'
                        />
                    </FormFieldwithOpt>
                </Form>
            </main>
        </div>
    </Layout>
  )
}

export default UpdateOfficer