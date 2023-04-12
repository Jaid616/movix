import React , {useState} from 'react'
import Carousel from '../../../components/carousel/Carousel'
import ContentWraper from '../../../components/ContentWrapper/ContentWraper'
import SwitchTab from '../../../components/SwitchTab/SwitchTab'
import useFetch from '../../../hooks/useFetch'

const Trending = () => {
const [endpoint , setendpoint] = useState("day")
const { data , loading } =  useFetch(`/trending/all/${endpoint}`);

 const onTabChange = (tab)=>{
      setendpoint(tab ==="Day"? "day":"week")
 }

  return (
    <div className="carouseSection">
   <ContentWraper>
           <span className="carouseTitle"> Trending </span>
            <SwitchTab data={["Day" , "Week "]} onTabChange = {onTabChange}/>


   </ContentWraper>
   <Carousel data = {data?.results} loading = {loading}/>
    </div>
       
  )
}

export default Trending
