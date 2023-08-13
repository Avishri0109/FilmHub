import React, { useState, useEffect } from "react";
import fetchDataFromApi from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfigration } from "./store/HomeSlice";
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home"; 

import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/search/SearchResult";

function App() {
  const dispatch = useDispatch();
   const url = useSelector((state) => state.home);
   console.log(url);

  useEffect(() => {
    fetchApiConfiguration();
  }, []);

  const fetchApiConfiguration = () => {
    fetchDataFromApi("/configuration").then((data) => {
      console.log(data);

      const url = {
        backdrop: data?.images?.secure_base_url + "original",
        poster: data?.images?.secure_base_url + "original",
        profile: data?.images?.secure_base_url + "original",
      };
      console.log("URL:", url);
      
      dispatch(getApiConfigration(url));
    });
  };
  return (
    <>
      <BrowserRouter>
       <Header/> 
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:mediaType/:id" element={<Details />}></Route>
          <Route path="/search/:query" element={<SearchResult />}></Route>
          <Route path="/explore/:mediaType" element={<Explore />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
