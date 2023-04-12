import React, { useEffect } from 'react'

import { BrowserRouter , Routes , Route } from 'react-router-dom'

import Footer from './components/Footer/Footer'
 import Header from './components/Header/Header'
 import PageNotFound from './pages/404/PageNotFound'
import Details from './pages/details/Details'

import {fetchDataFromAPI} from './utils/api'

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigurations , getGenres } from './store/homeSlice'
import Explore from './pages/explore/Explore'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'

const App = () => {
    const url = useSelector((state)=>state.home.url )
  const dispatch = useDispatch()
const fatch = async()=>{
  const response = await fetchDataFromAPI('/configuration')

  const url = {
    backdrop: response.images.secure_base_url + 'original' ,
    poster: response.images.secure_base_url + 'original' ,
    profile: response.images.secure_base_url + 'original' ,
  }
  dispatch(getApiConfigurations(url))
}

  useEffect(()=>{
 fatch();
 genersCall();
  },[])

 const genersCall = async () =>{
   let promises = [];
   let endPoint = ["tv","movie"]
   let allGeners = {}
   endPoint.forEach((url)=>{
          return(
             promises.push(fetchDataFromAPI(`/genre/${url}/list`))
          )
   })
   const allGenersList = await Promise.all(promises);
   allGenersList.map(({genres})=> genres.map(item=>(allGeners[item.id]) = item))
   dispatch(getGenres(allGeners)) ;
 }

  return (
  <BrowserRouter>
    <Header/>
     <Routes>
         <Route path='/' element = {<Home/>} />
         <Route path='/:mediaType/:id' element = {<Details/>} />
         <Route path='/search/:query' element = {<SearchResult/>} />
         <Route path='/explore/:mediaType' element = {<Explore/>} />
         <Route path='*' element = {<PageNotFound/>} />
     </Routes>
     <Footer/>


</BrowserRouter> 

  )
}

export default App


