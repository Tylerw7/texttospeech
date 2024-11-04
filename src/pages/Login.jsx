import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link } from "@nextui-org/link";
import { TbPointFilled } from "react-icons/tb"
import Header from '../components/Header'
import Axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");  // Set default empty string
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // To display error
  const navigate = useNavigate();  // Use this to navigate to protected page after login

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:5000/login', {
        email,
        password
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("User Logged in");

        // Redirect to the speechApp page after successful login
        navigate('/speechApp');
      } else {
        setErrorMessage("Invalid login attempt");  // If no token, show error
      }
    } catch (err) {
      setErrorMessage("Login failed, please check your credentials.");
      console.log(err);
    }
  };

  return (
    <>
    <Header />
    <div className='bg-[#F59E0B] w-[100vw] h-[200vh] sm:h-[100vh] flex flex-col sm:flex-row'>

      <div className=' w-[100%] sm:w-[60%] h-full flex justify-center items-center '>
      <div className='bg-white bg-opacity-30 flex flex-col justify-center items-center text-center p-2 w-[55%] h-[75%] gap-5 ' 
        style={{  borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        
        <h2 style={{ fontWeight: "bold", fontSize: "2.5rem", paddingBottom: "20px" }}>Login</h2>

        <form onSubmit={loginUser} className='flex flex-col gap-4' style={{ width: "15rem" }}>
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color="primary" type='submit'>Login</Button>
        </form>

        {/* Display error message if login fails */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div className='flex gap-1 flex-col justify-center text-center items-center'>
          <RouterLink to='/reset-password' className='text-red-500 text-[1.1rem]'>Reset Password</RouterLink>
          
        </div>
      </div>
      </div>

      <div className=' w-[100%] sm:w-[40%] h-full bg-[#F3F4F6] flex flex-col justify-center items-center'>
        
        <h2 className='text-[3rem] sm:text-[3vw] font-bold text-[#111827] text-center'>Don't Have an Account?</h2>
          <div className='text-left'>
          <p className='flex items-center text-[6.5vw] sm:text-[1.5vw] text-[#111827]' ><TbPointFilled className='text-[8vw] sm:text-[3vw] text-orange-400' />Register for free!</p>
          <p className='flex items-center text-[6.5vw] sm:text-[1.5vw] text-[#111827]' ><TbPointFilled className='text-[8vw] sm:text-[3vw] text-orange-400' />Pay later</p>
          <p className='flex items-center text-[6.5vw] sm:text-[1.5vw] text-[#111827]' ><TbPointFilled className='text-[8vw] sm:text-[3vw] text-orange-400' />Try 7 min of audio generation</p>
          </div>
            <Button
            color='primary'
            className='font-bold w-[40%] mt-[25px]'
            as={RouterLink}
            to='/register'
            >REGISTER</Button>
      </div>

    </div>
    </>
  );
}

export default Login;
