import React, {useState} from 'react'
import Header from './Header'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Axios from 'axios'

const ResetPassword = () => {
    const [email, setEmail] = useState()
    const [error, setError] = useState()
    const [data, setData] = useState()


    const handleEmail = async (e) => {
        e.preventDefault()

        if (!email) {
            return setError('Please enter a valid email')
        }

        setError('')

        try {
            const response = await Axios.post('http://localhost:5000/request-reset-password', {email})

            alert('Password reset link sent to your email');
            setData(response.data)
            console.log(response)
        } catch (err) {
            console.log(err)
        }



    }




  return (
    <>
    <Header />
    <div className='h-[100vh] flex justify-center items-center'>
        
        <div className='bg-white h-[15rem] w-[25rem] border-3 border-solid border-red-600 rounded-lg flex flex-col justify-center gap-5'>
        {data && <div className='text-red-500'>{data}</div>}
            <h2 className='text-[1.5rem] font-bold p-2'>ENTER EMAIL</h2>
            <form onSubmit={handleEmail} className='flex flex-col gap-5 justify-center items-center'>
            <Input
            className='w-[90%]'
            type="email"
            name="email"
            variant="bordered"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <div className='text-red-500'>{error}</div>}
          <Button 
          className='w-[50%]'
          type='submit'
          color='primary'
          >Submit</Button>
            </form>
        </div>

    </div>
    </>
  )
}

export default ResetPassword