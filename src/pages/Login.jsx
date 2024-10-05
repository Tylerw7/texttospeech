import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link } from "@nextui-org/link";
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
    <div className='w-[100vw] h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center text-center p-2' 
        style={{ width: '25rem', height: "25rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <RouterLink to='/' >Home</RouterLink>
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
          <Link href='#' color="danger">Reset Password</Link>
          <RouterLink to='/register'>Register</RouterLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
