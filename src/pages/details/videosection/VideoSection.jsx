import React, { useState } from "react";
import ContentWraper from "../../../components/ContentWrapper/ContentWraper";
import Img from "../../../components/LazyLoading/Img";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { PlayBtn } from "../PlayBtn";

import "./style.scss";




const VideosSection = ({ data, loading }) => {
    const [show, setshow] = useState(false);
    const [videoId, setvideoId] = useState(null);
    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWraper>
                
               {data?.results?.length >= 1 ? <div className="sectionHeading">Official Videos</div>:null}
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video )=>{
                             return(
                                <div
                                key={video.id} 
                                className="videoItem"
                                onClick={()=>{
                                    setvideoId(video.key)
                                    setshow(true)
                                }}
                                >
                                   <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                                    
                                    <PlayBtn/>
                                    </div>  
                                    <div className="videoTitle">
                                        {video.name}
                                        </div>    
                                    </div>
                             )
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWraper>
            <VideoPopup
                show={show}
                setshow={setshow}
                videoId={videoId}
                setvideoId={setvideoId}
            />
            
        </div>
    );
};
export default VideosSection;