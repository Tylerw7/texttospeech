import React, {useState} from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/button";
import {Image} from "@nextui-org/image";
import { ImCheckmark } from "react-icons/im";
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import logo from '../assets/images/ECHOTEXT2.png'

const SubCard = ({price_id, price, plan, contentOne, contentTwo, ContentThree, button}) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    



  const handleCheckOut = async (price_id) => {
    const token = localStorage.getItem('token')
    

    if (!token) {
      navigate('/login')
      return;
    } 

    
    try {
      const response = await Axios.get('http://localhost:5000/validateId', {
          headers: {
              'Authorization': `Bearer ${token}`,
          }
      });

      if (response.data.length === 0) {
          try {
              const info = await Axios.post('http://localhost:5000/stripe-session', { price_id }, {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  }
              });

              console.log(info);
              window.location.href = info.data.url;
          } catch (err) {
              console.error('Error during checkout:', err);
          }
      } else {
          setOpen(true)
      }
  } catch (err) {
      console.error('Error validating subscription status:', err);
  }
};









  return (
    <div className='border-2 border-[#007BFF] rounded-lg h-[20rem] w-[20rem] p-5 mb-[20px]' >
      <h2 className='text-[1.5rem] font-bold p-1'>{plan}</h2>
        <div className='flex gap-2 items-baseline'>
          <h2 className='text-[3rem] font-bold'>${price}</h2>
          <p className='text-[1.2rem]'>/Month</p>
        </div>
        <Divider className="my-4" />
        <div className='flex flex-col justify-center items-center gap-3'>
        <p className='flex items-center gap-2 text-[1.2rem] font-bold text-center'>{contentOne}</p>
        <p className='flex items-center gap-2 text-[1.2rem] font-bold'>{contentTwo}</p>
        <p className='flex items-center gap-2 text-[1.2rem] font-bold'>{ContentThree}</p>
        <Button 
        onClick={() => handleCheckOut(price_id)} 
        className="text-tiny w-[10rem] text-[1.3rem]" 
        color="primary" 
        radius="full" 
        size="lg"
        variant='ghost'
        >
          {button}
        </Button>
        </div>
        <Modal isOpen={open} onOpenChange={setOpen}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>Subscription Notice</ModalHeader>
                            <ModalBody>
                              <div className='h-[50px] flex justify-center items-center'>
                                <img src={logo} className='w-[10rem] object-cover' />
                              </div>
                                <p>You are already subscribed to a plan. If you would like to change or cancel your plan, go to (Account Portal) to cancel your current plan.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
      
    </div>
  )
}

export default SubCard