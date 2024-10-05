import React, {useState} from 'react'
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import { Link as RouterLink} from 'react-router-dom';
import {Link} from "@nextui-org/link";
import Axios from 'axios'


const Register = () => {
  const [username, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()


  const registerUser = async (e) => {
    e.preventDefault()

      try {
        const response = await Axios.post('http://localhost:5000/register', {
        username,
        email,
        password}
      )
        console.log("User Created")
      } catch (err) {
        console.log(err)
      }
    
    

  }

  



  return (
    <div className='w-[100vw] h-screen flex justify-center items-center'>
    <div className=' flex flex-col justify-center items-center text-center p-2 ' style={{width: '25rem', height: "25rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <RouterLink to='/' >Home</RouterLink>
        <h2 style={{fontWeight: "bold", fontSize: "2.5rem", paddingBottom: "20px"}}>Register</h2>
        <form onSubmit={registerUser} className='flex flex-col gap-4' style={{width: "15rem"}}>
        <Input 
        type="name" 
        name="username" 
        placeholder="Enter your UserName" 
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        />
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
        <Button 
        color="primary" 
        type='submit'
        >
          Button
        </Button>
    </form>
    <div className='flex gap-1 flex-col justify-center text-center items-center'>
    <Link href='#' color="danger">Reset Password</Link>
    <RouterLink to='/login'>Login</RouterLink>
    </div>
    </div>
    </div>
  )
}

export default Register