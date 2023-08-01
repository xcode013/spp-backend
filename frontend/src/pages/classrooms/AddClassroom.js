import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import Form, {FormField} from '../../components/forms/normalform/Form';
import axios from 'axios';

function AddClassroom() {
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


    // Post new Data
    const [classroom, setClassroom] = useState("");
    const [major, setMajor] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const addDataHandler = async (e) => {
      e.preventDefault();

      try {
        await axios.post(`http://localhost:5000/studentclass`, {
          nameClass: classroom,
          major: major
        })
        navigate("/classrooms");
      } catch (error) {
        if(error.response){
          setErrorMsg(error.response.data.msg)
        }
      }
    }

  return (
    <Layout>
        <div className='classroom-add-page'>
            <Header
                title={"Add"}
                mainTitle={"Classroom"}
                subTitle={"Create new data for Classrooms"}
            />
            <main className='body'>
                <Form 
                    linkToBack='/classrooms'
                    formOnSubmit={addDataHandler}
                >
                  <FormField  
                    label='classroom'
                    inputValue={classroom}
                    actionOnChange={(e) => setClassroom(e.target.value)}
                  />
                  <FormField  
                    label='major'
                    inputValue={major}
                    actionOnChange={(e) => setMajor(e.target.value)}
                  />
                </Form>
            </main>
        </div>
    </Layout>
  )
}

export default AddClassroom