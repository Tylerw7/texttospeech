import React, {useState} from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Header from './Header'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Axios from 'axios'
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
  } from "@nextui-org/modal";

const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token');
    const [error, setError] = useState()
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)

    const navigate = useNavigate()



    const changePassword = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios.post('https://echotext-server-82e5740cb6f6.herokuapp.com/password-change', { token, password }, { headers: { 'Content-Type': 'application/json' }});

            
            onOpen()
          } catch (error) {
            alert('Error resetting password');
          }
    }




  return (
    <>
    <Header />
    
    <div className='h-[100vh] flex justify-center items-center'>
        
        <div className='bg-white h-[15rem] w-[25rem] border-3 border-solid border-red-600 rounded-lg flex flex-col justify-center gap-5'>
        
            <h2 className='text-[1.5rem] font-bold p-2'>ENTER NEW PASSWORD</h2>
            <form onSubmit={changePassword} className='flex flex-col gap-5 justify-center items-center'>
            <Input
            className='w-[90%]'
            type="password"
            name="password"
            variant="bordered"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button 
          className='w-[50%]'
          type='submit'
          color='primary'
          >Submit</Button>
            </form>
        </div>


        
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">PASSWORD RESET</ModalHeader>
              <ModalBody>
                <p>Your password was successfully reset, please log back in to continue.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button as={Link} color="primary" to='/login'>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
    
    </>
  )
}

export default NewPassword