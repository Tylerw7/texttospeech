import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import HomeSectionTwo from '../components/HomeSectionTwo'
import HomeSectionThree from '../components/HomeSectionThree'
import Footer from '../components/Footer'



//<a href="https://www.flaticon.com/free-icons/keyboard" title="keyboard icons">Keyboard icons created by xnimrodx - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/agile" title="agile icons">Agile icons created by Uniconlabs - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/sound-waves" title="sound-waves icons">Sound-waves icons created by Arkinasi - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/dotted-line" title="dotted-line icons">Dotted-line icons created by See Icons - Flaticon</a>

//animated
//<a href="https://www.flaticon.com/free-animated-icons/system" title="system animated icons">System animated icons created by Freepik - Flaticon</a>


//AI icon  
//<a href="https://www.flaticon.com/free-icons/artificial-intelligence" title="artificial intelligence icons">Artificial intelligence icons created by Freepik - Flaticon</a>

const Home = () => {
  return (
    <>
    <Header />
    <Hero />
    <HomeSectionTwo />
    <HomeSectionThree />
    <Footer />
    </>
  )
}

export default Home