import React from 'react'
import Text from '../assets/images/TEXT.png'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='h-full bg-black text-white flex flex-col sm:flex-row'>

        <div className='w-full flex flex-col items-center pb-[50px]'>
            <img src={Text} />
            <div className='text-white flex gap-5 text-[200%]'>
                <a href=''><FaInstagram /></a>
                <a href=''><BsTwitterX /></a>
                <a href=''><FaFacebookF /></a>
            </div>
        </div>

        <div className='w-full flex flex-col items-center pb-[50px] pt-[50px]'>
            <h3 className='text-[200%]'>Menu</h3>
            <div className='flex flex-col text-left'>
            <Link>Home</Link>
            <Link>Product</Link>
            <Link>About</Link>
            <Link>Help</Link>
            <Link>Pricing</Link>
            <Link>Login</Link>
            <Link>Register</Link>
            </div>
        </div>

        <div className='w-full flex flex-col text-center items-center pb-[50px] pt-[50px]'>
        <h3 className='text-[200%]'>Attributors</h3>
        <a href='https://www.flaticon.com/'><h3>flaticon.com</h3></a>
        <ul>
            <li><a href="https://www.flaticon.com/free-icons/keyboard" title="keyboard icons">Keyboard icons created by xnimrodx - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/agile" title="agile icons">Agile icons created by Uniconlabs - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/sound-waves" title="sound-waves icons">Sound-waves icons created by Arkinasi - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/dotted-line" title="dotted-line icons">Dotted-line icons created by See Icons - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/artificial-intelligence" title="artificial intelligence icons">Artificial intelligence icons created by Freepik - Flaticon</a></li>
        </ul>
        </div>
        <div className='w-full flex flex-col items-center pb-[50px] pt-[50px]'>
            <h3 className='text-[200%]'>Contact</h3>
        </div>
    </div>
  )
}

export default Footer