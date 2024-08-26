"use client"
import React from "react";
import UserInterface from "@/components/UserInterface";
import NavBar from "@/components/NavBar";
import HomePage from "@/components/HomePage";
import Link from "next/link";

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