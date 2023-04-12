import React , {useState} from 'react'
import Carousel from '../../../components/carousel/Carousel'
import ContentWraper from '../../../components/ContentWrapper/ContentWraper'
import SwitchTab from '../../../components/SwitchTab/SwitchTab'
import useFetch from '../../../hooks/useFetch'

const Popular = () => {
const [endpoint , setendpoint] = useState("movie")
const { data , loading } =  useFetch(`/${endpoint}/popular`);

 const onTabChange = (tab)=>{
      setendpoint(tab ==="Movies"? "movie":"tv")
 }

  return (
    <div className="carouseSection">
   <ContentWraper>
           <span className="carouseTitle"> What's Popular </span>
            <SwitchTab data={["Movies" , "TV Shows"]} onTabChange = {onTabChange}/>


   </ContentWraper>
   <Carousel data = {data?.results} loading = {loading} endpoint= {endpoint}/>
    </div>
       
  )
}

export default Popular