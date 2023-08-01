import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../../middleware/addSlice';
import Layout from '../layout/Layout';
import Header from '../../components/header/Header';
import Form, {FormField} from '../../components/forms/normalform/Form';
import axios from 'axios';
import { getSppbyKey } from '../../api/api';

function UpdateSpp() {
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

    // Updating new Data
    const [year, setYear] = useState("");
    const [amount, setAmount] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {key} = useParams();

    useEffect(()=>{
        getSppbyKey(key).then((result) => {
            setYear(result.year);
            setAmount(result.amount);
        })
    }, [])

    const updateDataHandler = async (e) => {
      e.preventDefault();

      try {
        await axios.patch(`http://localhost:5000/spp/${key}`, {
          year: year,
          amount: amount
        })
        navigate("/spp");
      } catch (error) {
        if(error.response){
          setErrorMsg(error.response.data.msg)
        }
      }
    }
  return (
    <Layout>
        <div className='spp-update-page'>
            <Header
                title={"Update"}
                mainTitle={"Spp"}
                subTitle={"Update data for Spp"}
            />
            <main className='body'>
                <Form 
                    linkToBack='/spp'
                    formOnSubmit={updateDataHandler}
                >
                  <FormField  
                    label='year'
                    inputValue={year}
                    actionOnChange={(e) => setYear(e.target.value)}
                  />
                  <FormField  
                    label='amount'
                    inputValue={amount}
                    actionOnChange={(e) => setAmount(e.target.value)}
                  />
                </Form>
            </main>
        </div>
    </Layout>
  )
}

export default UpdateSpp