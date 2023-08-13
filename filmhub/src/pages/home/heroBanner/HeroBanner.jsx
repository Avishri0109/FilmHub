import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import UseFetch from "../../../hooks/UseFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);

  const { data, loading } = UseFetch("/movie/upcoming");

  useEffect(() => {
    if (
      data &&
      data.results &&
      data.results.length > 0 &&
      url &&
      url.backdrop
    ) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const backdropPath = data.results[randomIndex]?.backdrop_path;
      if (backdropPath && !url.backdrop.endsWith("/")) {
        const bg = url.backdrop + backdropPath;
        setBackground(bg);
      }
    }
  }, [data, loading, url]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer">
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Find Millions of movie, TV show and people to discover. Explore
              now.
            </span>
            <form onSubmit={handleSubmit} className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie, TV show...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
}

export default HeroBanner;
