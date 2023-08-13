import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import UseFetch from "../../hooks/UseFetch";
import DetailBanner from "./detailBanner/DetailBanner";
import Cast from "./cast/Cast";
import VideoSection from "./videoSeletion/VideoSelection";
import Similar from "./carousel/Similar";
import Recommendation from "./carousel/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = UseFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = UseFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
