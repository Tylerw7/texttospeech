import React, { useState, useRef, useEffect } from 'react';
import {Button, ButtonGroup} from "@nextui-org/button";
import {Link as RouterLink} from 'react-router-dom'
import Header from '../components/Header';
import {Textarea, user} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import logo from '../assets/images/ECHOTEXT2.png'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import Axios from 'axios';

const SpeechPage = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [remainingLetters, setRemainingLetters] = useState(750000);
  const [voice, setVoice] = useState('alloy')
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('output');
  const audioRef = useRef();

  

  useEffect(() => {
    const savedText = localStorage.getItem('text')
    const savedAudioUrl = localStorage.getItem('audioUrl');
    if (savedText) setText(savedText);
    if (savedAudioUrl) setAudioUrl(savedAudioUrl);

    const fetchLimit = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await Axios.get('https://echotext-server-82e5740cb6f6.herokuapp.com/check-sub-limit', {
        headers: { Authorization: `Bearer ${token}` }
    });
    
      setRemainingLetters(750000 - response.data.usedLetters);
    

    } catch (err) {
      console.error('Error fetching usage limit', err);
    }
  }
  fetchLimit()

  }, [])






  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText);
    localStorage.setItem('text', newText)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAudioUrl('');

    if (text.length > remainingLetters) {
      setError('You have exceeded your letter limit for this month. Please upgrade or wait until next month.');
      return;
  }

    try {
      const token = localStorage.getItem('token')
      
      console.log(voice)
      const response = await Axios.post('https://echotext-server-82e5740cb6f6.herokuapp.com/api/text-to-speech', { text, voice }, {
        responseType: 'blob', // Expecting a binary file (mp3)
      });


      await Axios.post('https://echotext-server-82e5740cb6f6.herokuapp.com/update-sub-usage', 
        { lettersUsed: text.length }, 
        { headers: { Authorization: `Bearer ${token}` } }
    );

    





      // Create an audio URL from the response blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setAudioUrl(url);
      localStorage.setItem('audioUrl', url )

      // Update remaining letters after usage
      setRemainingLetters(remainingLetters - text.length);
      setError(''); // Clear any previous errors

    } catch (error) {
      console.error('Error generating speech', error);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const handlePause = () => {
    if (audioRef) {
      audioRef.current.pause()
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration);
    }
  }

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  
  const handleSelectionChange = (e) => {
    setVoice(e.target.value)
  }

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
};



  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }

  }, [audioUrl])



  return (
    <>
    <Header />
    <div className='border-5 border-solid border-[#60A5FA] rounded-[30px] w-[80vw] h-[80vh] m-auto mt-10 p-2'>
    <div className='flex flex-col justify-center items-center w-[100%] text-center '>
      <div className='w-[30rem] h-[15vh] overflow-hidden'>
       <img src={logo} className='w-full h-full object-cover' alt="Logo" />
      </div>

      <div className='flex justify-center items-center gap-3'>
      
          <Button onClick={handlePlay} color="primary"><FaPlay /></Button>
          <Button onClick={handlePause} color="danger"><FaPause /></Button>
        
      <Select
      isRequired
        label="Selecte Voice"
        placeholder="Select a voice"
        className="max-w-xs "
        color='primary'
        variant='bordered'
        onChange={handleSelectionChange}
      >
        <SelectItem key="alloy" >Alloy</SelectItem>
        <SelectItem key="echo" >Echo</SelectItem>
        <SelectItem key="fable" >Fable</SelectItem>
        <SelectItem key="onyx" >Onyx</SelectItem>
        <SelectItem key="nova" >Nova</SelectItem>
        <SelectItem key="shimmer" >Shimmer</SelectItem>
        
      </Select>

      <Input
      isRequired
      type="name"
      label="name"
      color='primary'
      variant='bordered'
      defaultValue="Enter File Name"
      className="max-w-xs"
      value={fileName} 
      onChange={handleFileNameChange} 
    />


      <a href={audioUrl} download={`${fileName}.mp3`}>
            <Button color="secondary"><IoMdDownload /></Button>
          </a>
          
        </div>

        <div className='flex justify-center flex-col w-[25rem] items-center'>
        <audio ref={audioRef} src={audioUrl} type="audio/mp3" />
          <input
            type="range"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            style={{ width: '90%' }}
          />
          <div>
            {currentTime.toFixed(2)} / {duration.toFixed(2)} seconds
          </div>
        </div>


        
      <form onSubmit={handleSubmit}>
        
        
        <Textarea
      label="Description"
      placeholder="Enter text to convert to speech"
      className=" w-[70vw]"
      value={text} 
      onChange={handleTextChange}
      color={"primary"}
    />
    <p>Remaining Letters: {remainingLetters}</p>
    
        <Button className='w-[15rem]' type="submit" color="success" >Convert</Button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      

      
    </div>
    </div>
    </>
  )
}

export default SpeechPage