import React, {useState} from 'react'
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import { Link as RouterLink} from 'react-router-dom';
import {Link} from "@nextui-org/link";
import Header from '../components/Header';
import { MdAccountCircle } from "react-icons/md";
import Axios from 'axios'


const Register = () => {
  const [username, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()


  const registerUser = async (e) => {
    e.preventDefault()

    if (password.length < 5) {
      setError('Password must be at least 5 characters long')
      return;
    }

    setError('')

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
    <>
    <Header />
    <div className='w-[100vw] bg-[#0D9488] h-screen flex flex-row-reverse justify-center items-center'>

    <div className='w-[60%] h-full flex justify-center items-center'>
      <div className=' bg-white bg-opacity-30 flex flex-col justify-center items-center text-center p-2 w-[55%] h-[75%]' style={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        
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
        {error && <div className='text-red-600'>{error}</div>}
        
        <Button 
        color="primary" 
        type='submit'
        >
          Button
        </Button>
      </form>
      <div className='flex gap-1 flex-col justify-center text-center items-center'>
      <Link href='#' color="danger">Reset Password</Link>
      
      </div>
      </div>
    </div>


    <div className='w-[40%] h-full bg-white flex flex-col justify-center items-center'>
      <MdAccountCircle className='text-[15vw] text-[#0d6efd]'/>
      <h2 className='text-[3vw] font-bold pb-[50px] pt-[50px]'>Already have an account?</h2>
      <Button
      color='primary'
      variant='ghost'
      className='w-[45%]'
      as={RouterLink}
      to='/login'
      >Login</Button>
    </div>

    </div>
    </>
  )
}

export default Register