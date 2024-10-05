import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <>
    <Header />
    <Hero />
    <div className='flex flex-col text-[#271111]'>
        <RouterLink to='/register'>Register</RouterLink>
        <RouterLink to='/login' >Login</RouterLink>
        <RouterLink to='/speechApp' >Speech App</RouterLink>
    </div>
    </>
  )
}

export default Home