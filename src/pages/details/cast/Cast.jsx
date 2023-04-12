import React from "react";
import { useSelector } from "react-redux";

import './style.scss'

import ContentWrapper from "../../../components/ContentWrapper/ContentWraper";
import Img from "../../../components/LazyLoading/Img";

import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                {data?.length >= 1?<div className="sectionHeading">Top Cast</div>:null}
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item)=>{
                            let ImgUrl = item.profile_path ? url.profile + item.profile_path : avatar ;
                            return (
                                <div className="listItem" key={item.id}>
                                     <div className="profileImg">
                                        <Img src={ImgUrl}/>
                                        </div>
                                        <div className="name">
                                            {item.name}
                                        </div>
                                        <div className="character">
                                            {item.character}
                                        </div>

                                    </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;