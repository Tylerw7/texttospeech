import React, {useState, useRef} from 'react'
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import {Link} from "@nextui-org/link";
import Header from '../components/Header';
import { MdAccountCircle } from "react-icons/md";
import Axios from 'axios'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";
import {Checkbox} from "@nextui-org/checkbox";
import {ScrollShadow} from "@nextui-org/react";
import Content from '../components/Content';



const Register = () => {
  const [username, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const [acceptedTOS, setAcceptedTOS] = useState(false);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
  const [canAcceptTOS, setCanAcceptTOS ] = useState(false)
  const scrollRef = useRef(null)


  const handleScroll = () => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const isBottom = scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight;
      setCanAcceptTOS(isBottom)
    }
  }



  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setError('Password must be at least 5 characters long');
      return;
    }
    setError('');
    onOpen();;
  };



  const registerUser = async () => {
    

    if (!acceptedTOS) {
      setError('Please accept the terms of service to continue.');
      return;
    }
    setOpen(false);

   

      try {
        const response = await Axios.post('https://echotext-server-82e5740cb6f6.herokuapp.com/register', {
        username,
        email,
        password,
        tosAccept: true
      }
      )
        onClose();
        navigate('/login')
        console.log("User Created")
      } catch (err) {
        console.log(err)
        setError('Registration failed. Please try again.')
      }
    
    

  }

  



  return (
    <>
    <Header />
    <div className='w-[100vw] bg-[#0D9488] h-[200vh] sm:h-[100vh] flex flex-col sm:flex-row-reverse justify-center items-center'>

    <div className='w-[100%] sm:w-[60%] h-[100%] flex justify-center items-center'>
      <div className=' bg-white bg-opacity-30 flex flex-col justify-center items-center text-center p-2 w-[65%] h-[75%]' style={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        
        <h2 style={{fontWeight: "bold", fontSize: "2.5rem", paddingBottom: "20px"}}>Register</h2>
        <form onSubmit={handleRegisterClick} className='flex flex-col gap-4' style={{width: "15rem"}}>
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
          Register
        </Button>
      </form>
      <div className='flex gap-1 flex-col justify-center text-center items-center'>
      
      
      </div>
      </div>



       {/* Modal */}
       <Modal isOpen={open} onOpenChange={setOpen} className='mb-[50px]'>
            <ModalContent>
            {onClose => (
          <>
         <ModalHeader className="flex flex-col gap-1 font-bold text-[2rem]">Terms of Service</ModalHeader>
          <ModalBody>
          <p>Please read and accept our Terms of Service to proceed with registration.</p>
          <ScrollShadow
            ref={scrollRef}
            onScroll={handleScroll}
            style={{ overflowY: 'auto' }} // Ensure scrolling is enabled within ScrollShadow
            className="w-[90%] h-[20rem] m-auto"
          >
            <Content />
          </ScrollShadow>
          <Checkbox
            isSelected={acceptedTOS}
            onChange={(e) => setAcceptedTOS(e.target.checked)}
            isDisabled={!canAcceptTOS} // Disables the checkbox until the user has scrolled to the bottom
          >
            I accept the Terms of Service
            {error && <span className="text-red-500">{error}</span>}
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={registerUser}>
            Accept & Register
          </Button>
          </ModalFooter>
            </>
            )}
            </ModalContent>
          </Modal>

    </div>


    <div className='w-[100%] sm:w-[40%] h-full bg-white flex flex-col justify-center items-center'>
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