import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import Form, {FormField} from '../../components/forms/normalform/Form';
import axios from 'axios';
import { getClassroombyKey } from '../../api/api';

function UpdateClassroom() {
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

    // Updating data
    const [classroom, setClassroom] = useState("");
    const [major, setMajor] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {key} = useParams();

    useEffect(()=>{
        getClassroombyKey(key).then((result) => {
            setClassroom(result.nameClass);
            setMajor(result.major);
        })
    }, [])

    const updteDataHandler = async (e) => {
        e.preventDefault();
  
        try {
          await axios.patch(`http://localhost:5000/studentclass/${key}`, {
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
        <div className='classroom-update-page'>
            <Header
                title={"Update"}
                mainTitle={"Classroom"}
                subTitle={"Update data for Classrooms"}
            />
            <main className='body'>
                <Form 
                    linkToBack='/classrooms'
                    formOnSubmit={updteDataHandler}
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

export default UpdateClassroom