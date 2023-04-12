import React , {useState , useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'
import { fetchDataFromAPI } from '../../utils/api'
import "./style.scss"

import ContentWraper from '../../components/ContentWrapper/ContentWraper'
import noResults from "../../assets/no-results.png"
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/moviecard/MovieCard'

const SearchResult = () => {

  const [data , setdata] = useState(null);
  const [pageNum , setpageNum] = useState(1);
  const [loading , setloading] = useState(false);
  const {query} = useParams();

  const fetchData = ()=>{
    setloading(true)
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then((response) =>
    
    {
    
      setdata(response)
      setpageNum((prev)=> prev + 1);
      setloading(false)
    });
  }

  const nextPageData = ()=>{
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then((response) =>
    
    {
     if(data?.results)
     {
      setdata({
        ...data,
        results:[...data?.results,...response.results]
      })
     }
     else{
      setdata(response)
     }
     setpageNum((prev)=> prev + 1);
    })
    
  }
  useEffect(()=>{
    setpageNum(1);
    fetchData();
    
  },[query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {!loading && (
        <ContentWraper>
        {data?.results.length > 0 ? (
          <>
            <div className="pageTitle">
              {`Search ${data.total_results.length > 1 ? "results" : "result"} of '${query}'`}
              
            </div>
            <InfiniteScroll className='content' dataLength={data?.results?.length || []} next = {nextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner/>}>
              {data.results.map((item,index)=>{
                if(item.media_type === 'person') return ;
                
                        return (
                       <MovieCard key={index} data={item} fromSearch={true}/>

                    )
              })}
            </InfiniteScroll>
          </>
        ):(
          <span className="resultNotFound">
            Sorry , Result not found!
          </span>
        )}

        </ContentWraper>
      )}
    </div>
  )
}

export default SearchResult
