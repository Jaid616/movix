import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import "./style.scss"
import Img from "../../../components/LazyLoading/Img"
import ContentWraper from '../../../components/ContentWrapper/ContentWraper';
const Hero = () => {
  const {url } =  useSelector((state)=>state.home)
  const {data , loading} = useFetch("/movie/upcoming")
  const navigate = useNavigate();
  const [background , setbackground ] = useState('');
  const [query, setquery ] = useState('');

  useEffect(()=>{
      const bg = url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path ;
      setbackground(bg);
    
  },[data])


  const searchQuearyHandler = (e)=>{
   if (e.key === 'Enter' && query.length>0) {
    navigate( `/search/${query}`);

   }
  }
  return (
    <div className='herobanner'>
      {!loading && <div className="backdrop-img">
        <Img src = {background}/>
      </div>}
     
       <ContentWraper>

           <div className="heroBannerContent">
            <span className='title'> Welcome</span>
            <span className='subtitle'> Millions of movies , TV show and people to discover , Explore now</span>
             <div className="searchInput">
              <input type="text" name="" id="" placeholder='Search for a movie or TV show ....' onChange={(e)=>{setquery(e.target.value)}} onKeyUp = {searchQuearyHandler} />
              <button onClick={()=>{ query.length > 0 ? navigate(`/search/${query}`) : null}}>Search</button>
             </div>
           </div>
       </ContentWraper>

       </div>
      
    
  )
}

export default Hero
