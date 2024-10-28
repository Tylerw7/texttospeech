import React from 'react'
import keyBoard from '../assets/images/keyboard.png'
import dotLine from '../assets/images/dashed-line.png'
import working from '../assets/images/convert.png'
import wave from '../assets/images/audio-waves.png'
import gear from '../assets/images/gears.mp4'
import {Button, ButtonGroup} from "@nextui-org/button";

//<a href="https://www.flaticon.com/free-icons/keyboard" title="keyboard icons">Keyboard icons created by xnimrodx - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/agile" title="agile icons">Agile icons created by Uniconlabs - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/sound-waves" title="sound-waves icons">Sound-waves icons created by Arkinasi - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/dotted-line" title="dotted-line icons">Dotted-line icons created by See Icons - Flaticon</a>

//animated
//<a href="https://www.flaticon.com/free-animated-icons/system" title="system animated icons">System animated icons created by Freepik - Flaticon</a>


const HomeSectionTwo = () => {
  return (
    <div className='h-full flex flex-col sm:flex-row'>
        <div className='bg-[#60A5FA] h-[100vh] w-full sm:w-[50%] flex flex-col justify-center text-left p-[20px] overflow-hidden sm:gap-10 '>
            <h3 className='pb-[40px] text-[3.5rem] md:text-[3.5rem] font-bold text-[#111827] overflow-hidden'>Content Creation</h3>
            <p className='pb-[100px] text-[1.08rem] text-#111827 overflow-hidden'>EchoText is a web app designed for content creators who need high-quality voiceovers for their videos and other projects. By leveraging OpenAI's advanced text-to-speech technology, EchoText converts written text into natural-sounding audio, making it easy for users to generate professional voiceovers in just a few clicks. Whether you're creating YouTube videos, podcasts, or any other content requiring narration, EchoText provides a fast, efficient way to bring your words to life with realistic, human-like speech, tailored to fit your specific creative needs.</p>
            <Button 
            className='w-[50%] text-[1.2rem] font-bold overflow-hidden'
            color='warning'
            
            >TRY FOR FREE</Button>
        </div>
        <div className='bg-[#F3F4F6] h-[100vh] w-full sm:w-[50%] flex flex-col justify-center items-center gap-7'>
        <img src={keyBoard} className='w-[10rem]' />
        <img src={dotLine} className='w-[5rem] rotate-90' />
        <img src={working} className='w-[10rem]' />
        <img src={dotLine} className='w-[5rem] rotate-90' />
        <img src={wave} className='w-[10rem]' />
        </div>
    </div>
  )
}

export default HomeSectionTwo