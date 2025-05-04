import React, { useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import UserService from '../services/UserService';

const VerifyEmail = () => {

    const [code, setCode] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    const history = useHistory();

    const location = useLocation();
    const user = location.state?.user;
    console.log(user)

    const handleChange = (e, index) => {
        const value = e.target.value;
        if(!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if(value && index < 5){
            inputRefs.current[index + 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullCode = code.join('');

        try {
            UserService.verifyUser(fullCode).then((res)=> {
                if(res.status === 200){
                   alert("Verification Successfull!");
                   localStorage.setItem('token',res.data);
                   history.push('/employees/_add');
                }  
                else{
                    alert(res.data);
                }
            });
        } catch (error) {
            alert("Something went  wrong!");
        }
    };

    const handleResend = (e) => {
        e.preventDefault();

        try{
            UserService.loginUser(user, "resend").then((res)=> {
                if(res.status === 200){
                    alert(res.data);
                }
            })
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Verify Email</h2>
            <p>We’ve sent a 6-digit code to your email address.</p>
            <p>Please enter the code below to verify your email.</p>

            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center gap-2 mb-3">
                    {code.map((digit, idx)=>(
                        <input 
                           key={idx}
                           type='text'
                           maxLength='1'
                           className='form-control text-center'
                           style={{ width: "50px", height: "50px", fontSize: "24px" }}
                           value={digit}
                           onChange={(e)=> handleChange(e, idx)}
                           ref={(el) => inputRefs.current[idx] = el}
                        />
                    ))}
                </div>
                <button type='submit' className='btn btn-primary'>Verify</button>
                <div className='mt-3'>
                    <span>Didn't get the code?</span>
                    <button className='btn btn-link p-0' onClick={handleResend}>
                        Send again
                    </button>
                </div>
            </form>
        </div>
    )
}

export default VerifyEmail;