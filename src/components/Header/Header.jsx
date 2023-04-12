import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss"

import ContentWrapper from "../ContentWrapper/ContentWraper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

useEffect(()=>{
  window.scrollTo(0,0)
},[location])

const controlNavBar = ()=>{
     if(window.scrollY> 200)
     {
                 if(window.scrollY > lastScrollY && !mobileMenu )
                   {
                       setShow("hide")
                     }
                   else{
                  setShow("show");
                   }
     

                  }
                  else{
                    setShow("top");
                  }
                  setLastScrollY(window.scrollY);
}

    useEffect(()=>{
        window.addEventListener("scroll",controlNavBar)
        return (()=>{window.removeEventListener("scroll",controlNavBar)})
    },[lastScrollY])

    const openSearch = ()=>{
      setMobileMenu(false);
      setShowSearch(true);
    }
    
    const openMobileMenu = ()=>{
      setMobileMenu(!mobileMenu);
      setShowSearch(false);
    }

    const searchQuearyHandler = (e)=>{
      if (e.key === 'Enter' && query.length>0) {
       navigate( `/search/${query}`);
         setTimeout(()=>{
             setShowSearch(false)
         },1000)
      }
    }

    const navigatonHandler = (type)=>{
      if(type === 'movie')
      {
        navigate("/explore/movie")
      }
      else{
        navigate("/explore/tv")
      }
      setMobileMenu(false)
    }



    return (
        <header className={`header  ${mobileMenu? "mobileView":""} ${show}`}>
          <ContentWrapper>

            <div className="logo" onClick={()=>{navigate('/')}}>
              <img src={logo} alt="logo" />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={()=>{navigatonHandler('movie')}}>Movies</li>
              <li className="menuItem" onClick={()=>{navigatonHandler('tv')}}>TV Show</li>
              <li className="menuItem"onClick={openSearch}>
                <HiOutlineSearch/>
              </li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              <p onClick={openMobileMenu}>

              {mobileMenu?<VscChromeClose/> : <SlMenu/> }
              </p>
             
            </div>
          </ContentWrapper>
            { showSearch?  

            <div className="searchBar">
              <ContentWrapper>
              <div className="searchInput">
            <input type="text" name="" id="" placeholder='Search for a movie or TV show ....' onChange={(e)=>{setQuery(e.target.value)}} onKeyUp = {searchQuearyHandler} />
            <VscChromeClose onClick={()=>{setShowSearch(false)}}/>
            </div>
             </ContentWrapper>
              </div>:null}
        </header>
    );
};
export default Header


