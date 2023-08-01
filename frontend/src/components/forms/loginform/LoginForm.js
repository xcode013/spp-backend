import React, { useEffect, useState } from 'react'
import "./loginform.css"
import { useToggle } from '../../../utilities/toggler/useToggle'
import { useDispatch, useSelector } from "react-redux"
import { loginUser, reset } from "../../../middleware/addSlice"
import { useNavigate } from "react-router-dom"
function LoginForm() {
    const [showpass, setShowpass] = useToggle();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isError, isSuccess, isLoading, massage} = useSelector(
        (state) => state.auth
    );

    useEffect(()=> {
        if(user || isSuccess) navigate("/dashboard");
        dispatch(reset());
    }, [user, isSuccess, navigate, dispatch]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(loginUser({username, password}));
    }
  return (
    <div className='loginform-component'>
        <header className='headline'>
            <h1 className='headline-text'>Login</h1>
        </header>
        <form onSubmit={Auth} className='login-form'>
            <div className='field username-field'>
                <label className='label-field label-username'>Username or NISN</label>
                <input 
                    className='input-field input-username'
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder='Enter your Username or NISN here...'
                    autoComplete='false'
                />
            </div>
            <div className='password-field field'>
                <label className='label-field label-password'>Password</label>
                <input 
                    className='input-field input-password'
                    type={showpass ? 'text' : 'password'}
                    placeholder='Enter your Password here...'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete='false'
                />
                <div className='attribute-field'>
                    <input 
                        className='showpass-button'
                        type='checkbox'
                        onChange={setShowpass}
                    />
                    <label className='showpass-label'>Show Password</label>
                </div>
            </div>

            <div className='footer'>
                <button className='submit-button' type='submit'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default LoginForm