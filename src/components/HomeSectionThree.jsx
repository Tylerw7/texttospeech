import React from 'react'
import AI from '../assets/images/AI.png'
import { Button } from '@nextui-org/react'

const HomeSectionThree = () => {
  return (
    <div className='h-full flex flex-col sm:flex-row'>

        <div className='w-[100%] sm:w-[50%] bg-white flex justify-center items-center pt-[100px] pb-[100px]'>
            <img src={AI} className='w-[60%] h-[]' />
        </div>

        <div className='w-[100%] sm:w-[50%] bg-[#0D9488] text-white flex flex-col justify-center p-[30px] '>
            <h3 className='text-[500%]'>OpenAI (TTS)</h3>
            <p className='text-[120%]'>EchoText is a web application that leverages OpenAI’s advanced text-to-speech (TTS) technology to convert written text into high-quality audio. This feature allows users to create natural-sounding voiceovers that are ideal for video production and content creation. By inputting text, users can quickly generate audio that suits a range of professional and creative needs, such as narrations, explainer videos, or podcast introductions. EchoText's TTS capabilities provide flexibility for content creators to customize voices, tones, and styles, helping enhance audience engagement.</p>
            <Button
            color='primary'
            className='w-[60%] mt-[50px]'
            >TRY FOR FREE</Button>
        </div>

    </div>
  )
}

export default HomeSectionThree