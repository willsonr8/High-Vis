"use client"
import React from "react";
import NavBar from "@/components/NavBar";
import HomePage from "@/components/HomePage";

const Home: React.FC = () => {
  return (
      <div className={"all-container"}>
          <NavBar/>
          <div className={"all-homepage-container"}>
            <HomePage/>
          </div>
      </div>
  )
}

export default Home;