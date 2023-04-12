import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from '../../../components/ContentWrapper/ContentWraper';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/LazyLoading/Img';
import PosterFallback from '../../../assets/no-poster.png';
import Geners from "../../../components/geners/Genres";
import CircleRating from "../../../components/circlerating/CircleRating";
import { PlayBtn } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
    const [show , setshow] = useState(false)
    const [videoId, setvideoId] = useState(null)

    const {mediaType , id } = useParams();
    const {data , loading} = useFetch(`/${mediaType}/${id}`)
 
    const {url} = useSelector((state)=> state.home)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const genersName = data?.genres?.map((item)=>{
        return(

            item.id
        )
    })

    const director = crew?.filter((item)=>item.job ==='Director')
    const writer = crew?.filter((item)=> item.job ==='Screenplay' || item.job ==='Story' || item.job ==='Writer')
    


    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                  {!!data && (
                    <>
                      <div className="backdrop-img">
                          <Img src = {url.backdrop + data.backdrop_path}/>
                       </div>
                       <div className="opacity-layer"></div>
                       <ContentWrapper>
                          <div className="content">
                            <div className="left">
                                {data.poster_path ?(<Img className='posterImg' src = {url.backdrop + data.poster_path}/>) :(<Img className='posterImg' src = {PosterFallback}/>) }
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data?.name || data?.title} (${dayjs(data?.release_data).format('YYYY')})`}
                                </div>
                                <div className="subtitle">
                                    {data.tagLine}
                                </div>
                                <Geners data = {genersName}/>
                                <div className="row">
                                    <CircleRating rating={data.vote_average.toFixed(1)} />
                                    <div className="playbtn" onClick={()=>{
                                        setshow(true) 
                                        setvideoId(video.key)}}>
                                        <PlayBtn/>
                                        <span className="text"> Watch Trailer</span>
                                    </div>
                                </div>
                                <div className="overview">
                                    <div className="heading">
                                        Overview
                                    </div>
                                    <div className="description">
                                        {data?.overview}
                                    </div>
                                </div>
                                <div className="info">
                                    {data.status && ( <div className="infoItem">
                                        <span className="text bold">
                                            Status : {" "}
                                        </span>
                                        <span className="text">
                                            {data?.status}
                                        </span>
                                    </div>
                                        )}
                                          {data.release_date && ( <div className="infoItem">
                                        <span className="text bold">
                                            Release Date : {" "}
                                        </span>
                                        <span className="text">
                                            {dayjs(data?.release_date).format('MMM d, YYYY')}
                                            
                                        </span>
                                    </div>
                                        )}
                                           {data.runtime && ( <div className="infoItem">
                                        <span className="text bold">
                                            Runtime : {" "}
                                        </span>
                                        <span className="text">
                                            {toHoursAndMinutes(data.runtime)}
                                            
                                        </span>
                                    </div>
                                        )}
                                </div>
                                {director?.length > 0 &&(
                                      <div className="info">
                                        <span className="text bold">
                                            Director:{''}
                                        </span>
                                        <span className="text">
                                            {director?.map((item , index)=>{
                                                return(
                                                <span key={index}>
                                                    {item.name}
                                                    {director.length - 1 !== index && " , " } 

                                                </span>)
                                            })}
                                        </span>
                                      </div>
                                )}
                                 {writer?.length > 0 &&(
                                      <div className="info">
                                        <span className="text bold">
                                            Writer:{''}
                                        </span>
                                        <span className="text">
                                            {writer?.map((item , index)=>{
                                                return(
                                                <span key={index}>
                                                    {item.name}
                                                    {writer.length - 1 !== index && " , " } 

                                                </span>)
                                            })}
                                        </span>
                                      </div>
                                )}
                                 {data?.created_by?.length > 0 &&(
                                      <div className="info">
                                        <span className="text bold">
                                            Creator:{''}
                                        </span>
                                        <span className="text">
                                            {data?.created_by?.map((item , index)=>{
                                                return(
                                                <span key={index}>
                                                    {item.name}
                                                    {data?.created_by.length - 1 !== index && " , " } 

                                                </span>)
                                            })}
                                        </span>
                                      </div>
                                      
                                )}
                            </div>
                          </div>
                          <VideoPopup show={show}
                          setshow={setshow}
                          videoId={videoId}
                          setvideoId={setvideoId}/>
                       </ContentWrapper>


                    </>
                  )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;