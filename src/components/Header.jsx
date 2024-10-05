import React, {useState, useContext} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import TokenContext from "../context/TokenContext";
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../assets/images/TEXT.png'
import {Avatar} from "@nextui-org/react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [token, setToken] = useState()
const {isAuthenticated, setIsAuthenticated} = useContext(TokenContext)

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];


  const deleteToken = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    localStorage.removeItem('text')
    localStorage.removeItem('audioUrl')
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
          <Link className="text-[#F3F4F6] text-[1.4rem]" href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-[#F3F4F6] text-[1.4rem]" href="#">
            Help
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-[#F3F4F6] text-[1.4rem]" href="#">
            Contact
          </Link>
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
          <Avatar  isBordered color="warning" showFallback size="md" />
          <Button as={RouterLink} color="primary" className=" text-[#F3F4F6] tracking-wide" href="#" onClick={deleteToken}>
            Sign Out
          </Button>
          </div>
        }
        
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    
  );
}

export default Header