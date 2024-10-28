import React from 'react'
import {Button, ButtonGroup} from "@nextui-org/button";
import logo from '../assets/images/TEXT.png'

const Hero = () => {
  return (
    <div className='flex flex-col bg-[#111827] h-[full] w-[100vw] text-center items-center justify-start '>
      <div className='h-[200px]'>
        <img src={logo} alt="EchoText Logo" className='w-[20rem]' />
        </div>

        <div className='w-[60%]'>
        <h1 className='text-[#F3F4F6] text-[4.5vw] font-bold pb-[50px]'>
            Turn Your Words into Sound with EchoText
          </h1>
          <div className='flex gap-10 justify-center pb-[50px]'>
            <Button 
            variant='ghost'
            color="default"
            className='text-white w-[15rem] h-[3rem]'
            >
              Learn more
              </Button>

            <Button
            className='w-[15rem] h-[3rem] text-[1rem]'
            color='warning'
            >
              Try for FREE
              </Button>
          </div>

          <p className='text-[#F3F4F6] pb-[100px] text-left' >EchoText transforms your written text into natural, lifelike audio with just a click. Powered by OpenAI, our app makes it easy to listen to your words, whether it's for personal use, professional content, or accessibility. Simply input your text, choose a voice, and let EchoText bring your words to life.</p>
      </div>

      
    </div>
  )
}

export default Hero