import React, {useState, useContext} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import TokenContext from "../context/TokenContext";
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../assets/images/TEXT.png'
import Axios from 'axios'
import {Avatar} from "@nextui-org/react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [token, setToken] = useState()
const {isAuthenticated, setIsAuthenticated} = useContext(TokenContext)

  const menuItems = [
    
    {label: 'Home', path: '/'},
    {label: 'Product', path: '/speechApp'},
    {label: 'Pricing', path: '/pricing'}
  ];


  const deleteToken = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    localStorage.removeItem('text')
    localStorage.removeItem('audioUrl')
  }

  const openPortal = async () => {
    const token = localStorage.getItem('token')

    try {
      const portalSession = await Axios.post('https://echotext-server-82e5740cb6f6.herokuapp.com/customer-portal', {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
      })

      window.location.href = portalSession.data.url
    } catch (err) {
      console.log(err)
    }
  }



  return (
    
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-[#111827] ">
      <NavbarContent >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-[#F3F4F6]"
        />
        <NavbarBrand >
          <img src={Logo}  />
          
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-5 " justify="center">
        <NavbarItem>
          <RouterLink to='/' className="text-[#F3F4F6] text-[1.4rem]"  >
            Home
          </RouterLink>
        </NavbarItem>
        <NavbarItem isActive>
          <RouterLink to='/speechApp' className="text-[#F3F4F6] text-[1.4rem]">
            Product
          </RouterLink>
        </NavbarItem>
        
        
        <NavbarItem>
          <RouterLink to='/pricing' className="text-[#F3F4F6] text-[1.4rem]" >
            Pricing
          </RouterLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
       {!isAuthenticated ? <Button as={RouterLink}  color="primary"  className=" text-[1rem] text-[#F3F4F6] tracking-wide" to='/login' >
            Sign In
          </Button>
          
        :
        <div className="flex gap-4">
          <Button
          color="danger"
          variant='ghost'
          onClick={openPortal}
          >Account Portal</Button>
          <Button as={RouterLink} color="primary" className=" text-[#F3F4F6] tracking-wide" href="#" onClick={deleteToken}>
            Sign Out
          </Button>
          </div>
        }
        
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <RouterLink
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              to={item.path}
              size="lg"
            >
              {item.label}
            </RouterLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    
  );
}

export default Header